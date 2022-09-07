import datetime
import glob
import gzip
import os
import zoneinfo

import boto3
import botocore.exceptions

BUCKET = os.environ["BUCKET"]


def list_raw_log_keys(s3) -> list[str]:
    response = s3.list_objects_v2(
        Bucket=BUCKET,
        Prefix="jacobsalway.com/raw/"
    )
    return [content["Key"] for content in response["Contents"]]


def key_exists(key: str, s3) -> bool:
    try:
        s3.head_object(Bucket=BUCKET, Key=key)
        return True
    except botocore.exceptions.ClientError as e:
        if e.response['ResponseMetadata']['HTTPStatusCode'] == 404:
            return False
        raise e


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

    if not (raw_log_keys := list_raw_log_keys(s3)):
        print("No logs to compact, so exiting early")
        return {"message": "success"}

    for key in raw_log_keys:
        download_path = key.replace("/", "_")
        s3.download_file(
            Bucket=BUCKET,
            Key=key,
            Filename=f"/tmp/logs/{download_path}"
        )

    current_date = get_current_date()
    key = f"jacobsalway.com/processed/{current_date}.gz"
    if key_exists(key, s3):
        s3.download_file(
            Bucket=BUCKET,
            Key=key,
            Filename=f"/tmp/{current_date}.gz"
        )

    combined_path = f"/tmp/{current_date}.gz"
    mode = "at" if os.path.exists(combined_path) else "wt"
    with gzip.open(combined_path, mode) as f_out:
        for i, file in enumerate(glob.glob("/tmp/logs/*.gz")):
            with gzip.open(file, "rt") as f_in:
                lines = f_in.readlines()
                # skip header if appending to existing logs
                # or if not first file
                if i > 0 or mode == "at":
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
