import datetime
import glob
import gzip
import os
import zoneinfo

import boto3

BUCKET = os.environ["BUCKET"]


def list_raw_log_keys(s3) -> list[str]:
    response = s3.list_objects_v2(
        Bucket=BUCKET,
        Prefix="jacobsalway.com/raw/"
    )
    return [content["Key"] for content in response["Contents"]]


def get_current_date() -> str:
    return (
        datetime.datetime
        .now(zoneinfo.ZoneInfo("Australia/Sydney"))
        .strftime("%Y-%m-%d")
    )


def lambda_handler(event, context):
    s3 = boto3.client("s3")
    if not os.path.isdir("/tmp/logs/"):
        os.mkdir("/tmp/logs")

    for key in list_raw_log_keys(s3):
        download_path = key.replace("/", "_")
        s3.download_file(
            Bucket=BUCKET,
            Key=key,
            Filename=f"/tmp/logs/{download_path}"
        )

    current_date = get_current_date()
    combined_path = f"/tmp/{current_date}.gz"
    with gzip.open(combined_path, "wt") as f_out:
        for i, file in enumerate(glob.glob("/tmp/logs/*.gz")):
            with gzip.open(file, "rt") as f_in:
                lines = f_in.readlines()
                # skip header after the first file
                if i > 0:
                    lines = lines[2:]
                f_out.writelines(lines)

    s3.upload_file(
        Bucket=BUCKET,
        Key=f"jacobsalway.com/processed/{current_date}.gz",
        Filename=combined_path
    )

    for key in list_raw_log_keys(s3):
        s3.delete_object(Bucket=BUCKET, Key=key)

    return {"message": "success"}
