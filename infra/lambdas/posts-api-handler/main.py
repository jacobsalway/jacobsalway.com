import json
import os

import boto3

TABLE_NAME = os.environ["TABLE_NAME"]
client = boto3.client("dynamodb")


def lambda_handler(event, context) -> None:
    post_id = event["pathParameters"]["id"]
    data = client.get_item(
        TableName=TABLE_NAME,
        Key={"id": {"S": post_id}}
    )

    # check if key in table
    if "Item" not in data:
        return {
            "statusCode": 404,
            "headers": {"content-type": "application/json"},
            "body": json.dumps({"message": "Not Found"})
        }

    views = int(data["Item"]["views"]["N"])
    return {
        "statusCode": 200,
        "headers": {
            "content-type": "application/json",
            "cache-control": "public, max-age=3600"  # 1 hour
        },
        "body": json.dumps({"views": views})
    }
