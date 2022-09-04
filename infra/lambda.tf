resource "aws_cloudwatch_event_rule" "compact_schedule" {
  # 2pm UTC is midnight AEST
  schedule_expression = "cron(0 14 * * ? *)"
}

resource "aws_cloudwatch_event_target" "compact_schedule_target" {
  rule      = aws_cloudwatch_event_rule.compact_schedule.name
  target_id = "lambda"
  arn       = module.compact_cloudfront_logs.lambda_function_arn
}

resource "aws_lambda_permission" "allow_cloudwatch_to_call_check_foo" {
  action        = "lambda:InvokeFunction"
  function_name = module.compact_cloudfront_logs.lambda_function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.compact_schedule.arn
}

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
  # 3pm UTC is 1am AEST
  schedule_expression = "cron(0 15 * * ? *)"
}

resource "aws_cloudwatch_event_target" "calculate_post_views_target" {
  rule      = aws_cloudwatch_event_rule.calculate_post_views_schedule.name
  target_id = "lambda"
  arn       = module.calculate_post_views.lambda_function_arn
}

resource "aws_lambda_permission" "cloudwatch_calculate_post_views_permission" {
  action        = "lambda:InvokeFunction"
  function_name = module.calculate_post_views.lambda_function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.calculate_post_views_schedule.arn
}
