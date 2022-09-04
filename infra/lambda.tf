module "compact_cloudfront_logs" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "compact-cloudfront-logs"
  handler       = "main.lambda_handler"
  runtime       = "python3.9"
  publish       = true
  timeout       = 200

  source_path = "${path.module}/lambdas/compact-cloudfront-logs"

  attach_policy_json = true
  policy_json        = data.aws_iam_policy_document.lambda_permissions.json

  environment_variables = {
    BUCKET = "cloudfront-logs-424518242023"
  }
}

module "calculate_post_views" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "calculate-post-views"
  handler       = "main.lambda_handler"
  runtime       = "python3.9"
  publish       = true
  timeout       = 200

  source_path = "${path.module}/lambdas/calculate-post-views"

  attach_policy_json = true
  policy_json        = data.aws_iam_policy_document.lambda_permissions.json

  environment_variables = {
    TABLE_NAME = aws_dynamodb_table.posts_table.id
  }
}

resource "aws_cloudwatch_event_rule" "calculate_post_views_schedule" {
  name                = "calculate-post-views"
  schedule_expression = "cron(0 */3 * * ? *)" # run every three hours
}

resource "aws_cloudwatch_event_target" "sfn" {
  rule     = aws_cloudwatch_event_rule.calculate_post_views_schedule.name
  arn      = module.step_function.state_machine_arn
  role_arn = aws_iam_role.step_function.arn
}

resource "aws_iam_role" "step_function" {
  inline_policy {
    policy = data.aws_iam_policy_document.step_function.json
  }

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "events.amazonaws.com"
        }
      },
    ]
  })
}

data "aws_iam_policy_document" "step_function" {
  statement {
    effect    = "Allow"
    actions   = ["states:StartExecution"]
    resources = [module.step_function.state_machine_arn]
  }
}

module "step_function" {
  source = "terraform-aws-modules/step-functions/aws"

  name       = "my-step-function"
  definition = <<EOF
{
  "StartAt": "CompactLogs",
  "States": {
    "CompactLogs": {
      "Type": "Task",
      "Resource": "${module.compact_cloudfront_logs.lambda_function_arn}",
      "Next": "CalculateViews"
    },
    "CalculateViews": {
      "Type": "Task",
      "Resource": "${module.calculate_post_views.lambda_function_arn}",
      "End": true
    }
  }
}
EOF

  service_integrations = {
    lambda = {
      lambda = [
        module.compact_cloudfront_logs.lambda_function_arn,
        module.calculate_post_views.lambda_function_arn
      ]
    }
  }
}
