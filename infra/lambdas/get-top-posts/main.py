import json
import os

import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["TABLE_NAME"])


def lambda_handler(event, context) -> None:
    posts = table.scan()["Items"]
    for i in range(len(posts)):
        posts[i]["views"] = int(posts[i]["views"])

    top_three = sorted(posts, key=lambda p: p["views"], reverse=True)[:3]

    return {
        "statusCode": 200,
        "headers": {
            "content-type": "application/json",
            "cache-control": "public, max-age=3600"  # 1 hour
        },
        "body": json.dumps(top_three)
    }