module "api_gateway" {
  source = "terraform-aws-modules/apigateway-v2/aws"

  name                   = "post-api"
  protocol_type          = "HTTP"
  create_api_domain_name = false

  integrations = {
    "GET /post-views/{id}" = {
      lambda_arn = module.get_post_views.lambda_function_invoke_arn
    }
    "GET /top-posts" = {
      lambda_arn = module.get_top_posts.lambda_function_invoke_arn
    }
  }
}

module "get_post_views" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "get-post-views"
  handler       = "main.lambda_handler"
  runtime       = "python3.9"
  publish       = true

  source_path = "${path.module}/lambdas/get-post-views"

  attach_policy_json = true
  policy_json        = data.aws_iam_policy_document.get_post_views.json

  environment_variables = {
    TABLE_NAME = aws_dynamodb_table.posts_table.id
  }

  allowed_triggers = {
    APIGatewayV2 = {
      service    = "apigateway"
      source_arn = "${module.api_gateway.apigatewayv2_api_execution_arn}/*/*"
    }
  }
}

module "get_top_posts" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "get-top-posts"
  handler       = "main.lambda_handler"
  runtime       = "python3.9"
  publish       = true

  source_path = "${path.module}/lambdas/get-top-posts"

  attach_policy_json = true
  policy_json        = data.aws_iam_policy_document.get_post_views.json

  environment_variables = {
    TABLE_NAME = aws_dynamodb_table.posts_table.id
  }

  allowed_triggers = {
    APIGatewayV2 = {
      service    = "apigateway"
      source_arn = "${module.api_gateway.apigatewayv2_api_execution_arn}/*/*"
    }
  }
}
