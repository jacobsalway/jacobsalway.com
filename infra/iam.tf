# S3 actions from here: https://github.com/aws/aws-cdk/blob/main/packages/%40aws-cdk/aws-s3/lib/perms.ts

# only the cloudfront principal is allowed to read from the bucket
data "aws_iam_policy_document" "s3_bucket_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${aws_s3_bucket.s3_bucket.id}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn]
    }
  }
}

data "aws_iam_policy_document" "deployment_policy" {
  # allow ci/cd to get, put and delete any build artifacts in the bucket
  # allow acl access to set headers
  statement {
    actions = [
      "s3:GetObject*",
      "s3:GetBucket*",
      "s3:List*",
      "s3:PutObject",
      "s3:PutObjectLegalHold",
      "s3:PutObjectRetention",
      "s3:PutObjectTagging",
      "s3:PutObjectVersionTagging",
      "s3:Abort*",
      "s3:PutObjectAcl",
      "s3:PutObjectVersionAcl",
      "s3:DeleteObject*",
    ]
    resources = [
      "arn:aws:s3:::${aws_s3_bucket.s3_bucket.id}",
      "arn:aws:s3:::${aws_s3_bucket.s3_bucket.id}/*"
    ]
  }

  # allow ci/cd to sync the post metadata to the dynamodb
  # used in the lambdas for the api and for view counting
  # TODO: refine action permission using cloudtrail
  statement {
    actions   = ["dynamodb:*"]
    resources = ["${aws_dynamodb_table.posts_table.arn}"]
  }
}

data "aws_iam_policy_document" "get_post_views" {
  # TODO: minimally scope these permissions
  statement {
    actions   = ["dynamodb:*"]
    resources = ["*"]
  }
}

data "aws_iam_policy_document" "lambda_permissions" {
  statement {
    # TODO: minimally scope these permissions
    actions = ["s3:*"]
    resources = [
      "arn:aws:s3:::${aws_s3_bucket.cloudfront_logs.id}",
      "arn:aws:s3:::${aws_s3_bucket.cloudfront_logs.id}/*",
      # TODO: import below buckets
      "arn:aws:s3:::athenadump-jacobsalway",
      "arn:aws:s3:::athenadump-jacobsalway/*"
    ]
  }

  # TODO: minimally scope these permissions
  statement {
    actions   = ["athena:*", "glue:*"]
    resources = ["*"]
  }

  # TODO: minimally scope these permissions
  statement {
    actions   = ["dynamodb:*"]
    resources = ["*"]
  }
}
