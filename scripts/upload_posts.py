import glob
import os

import boto3
import frontmatter


def main() -> None:
    posts = []
    for filename in glob.glob("content/posts/*.md"):
        id = filename.split("/")[-1].rstrip(".md")
        with open(filename) as f:
            header = frontmatter.load(f)
            posts.append({
                "id": id,
                "title": header["title"],
                "date": header["date"]
            })

    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(os.environ["TABLE_NAME"])

    scan = table.scan(
        ProjectionExpression='#k',
        ExpressionAttributeNames={
            '#k': 'id'
        }
    )

    post_ids = set(post["id"] for post in posts)
    with table.batch_writer() as batch:
        for key in scan['Items']:
            if key["id"] not in post_ids:
                batch.delete_item(Key=key)

    for post in posts:
        table.update_item(
            Key={"id": post["id"]},
            UpdateExpression="set #title=:t, #date=:d",
            ExpressionAttributeNames={"#title": "title", "#date": "date"},
            ExpressionAttributeValues={":t": post["title"], ":d": post["date"]},
            ReturnValues="UPDATED_NEW"
        )


if __name__ == "__main__":
    main()
