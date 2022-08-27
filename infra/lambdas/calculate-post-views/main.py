import csv
import io
import os
import re
import time

import boto3

DATABASE = "default"
QUERY = """
SELECT 
    uri, 
    COUNT(
        DISTINCT MD5(TO_UTF8(
            CONCAT(CAST(date AS VARCHAR), request_ip))
        ) 
    ) AS num_views
FROM cloudfront_logs
WHERE uri LIKE '/blog/%/'
AND status = 200
GROUP BY 1
"""
OUTPUT_LOCATION = "s3://athenadump-jacobsalway"
PATTERN = re.compile(r"^\/blog\/([a-z1-9\-]+)")

athena = boto3.client("athena")
s3 = boto3.client("s3")
dynamo = boto3.resource("dynamodb")
table = dynamo.Table(os.environ["TABLE_NAME"])


def wait_for_query(
    query_execution_id: str, 
    num_iterations: int = 30
) -> str:
    """Continuously poll for Athena query status
    and return the output location on success. The Athena client
    doesn't have a get_waiter method like other boto3 clients do."""

    iterations = num_iterations
    while iterations > 0:
        iterations -= 1

        query_details = athena.get_query_execution(QueryExecutionId=query_execution_id)
        status = query_details["QueryExecution"]["Status"]["State"]

        if status in ("FAILED", "CANCELLED"):
            raise Exception(
                query_details['QueryExecution']['Status']['StateChangeReason']
            )
        elif status == "SUCCEEDED":
            return query_details['QueryExecution']['ResultConfiguration']['OutputLocation']
        else:
            time.sleep(5)

    raise Exception(
        f"Athena query {query_execution_id} timed out after {num_iterations} iterations"
    )


def get_s3_csv(s3_uri: str) -> str:
    bucket, key = s3_uri[5:].split('/', 1)
    response = s3.get_object(Bucket=bucket, Key=key)
    return response["Body"].read().decode("utf-8")


def csv_to_dict(csv_string) -> list[dict[str, int]]:
    reader, data = csv.DictReader(io.StringIO(csv_string)), []

    for row in reader:
        match = PATTERN.match(row["uri"])
        if match:
            data.append({"id": match.group(1), "views": int(row["num_views"])})

    return data


def lambda_handler(event, context):
    response = athena.start_query_execution(
        QueryString=QUERY,
        QueryExecutionContext={'Database': DATABASE},
        ResultConfiguration={'OutputLocation': OUTPUT_LOCATION}
    )

    output_path = wait_for_query(query_execution_id=response['QueryExecutionId'])
    csv_string = get_s3_csv(output_path)

    for item in csv_to_dict(csv_string):
        table.update_item(
            Key={"id": item["id"]},
            UpdateExpression="set #views=:v",
            ExpressionAttributeNames={"#views": "views"},
            ExpressionAttributeValues={":v": item["views"]},
            ConditionExpression="attribute_exists(id)",
            ReturnValues="UPDATED_NEW"
        )

    return {"message": "success"}
