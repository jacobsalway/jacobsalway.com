resource "aws_apigatewayv2_api" "post_api" {
  name          = "post-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "post_api_stage" {
  api_id = aws_apigatewayv2_api.post_api.id

  name        = "$default"
  auto_deploy = true
}

resource "aws_apigatewayv2_integration" "post_views_integration" {
  api_id = aws_apigatewayv2_api.post_api.id

  integration_uri    = module.get_post_views.lambda_function_invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "post_views_route" {
  api_id = aws_apigatewayv2_api.post_api.id

  route_key = "GET /post-views/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.post_views_integration.id}"
}

resource "aws_apigatewayv2_integration" "top_posts_integration" {
  api_id = aws_apigatewayv2_api.post_api.id

  integration_uri    = module.get_top_posts.lambda_function_invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "top_posts_route" {
  api_id = aws_apigatewayv2_api.post_api.id

  route_key = "GET /top-posts"
  target    = "integrations/${aws_apigatewayv2_integration.top_posts_integration.id}"
}
