resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.s3_bucket.bucket_regional_domain_name
    origin_id   = "s3-cloudfront"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  origin {
    domain_name = replace(aws_apigatewayv2_stage.post_api_stage.invoke_url, "/^https?://([^/]*).*/", "$1")
    origin_id   = "api_gateway"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled         = true
  is_ipv6_enabled = true
  aliases         = ["jacobsalway.com", "www.jacobsalway.com"]

  logging_config {
    bucket = aws_s3_bucket.cloudfront_logs.bucket_domain_name
    prefix = "jacobsalway.com/raw/"
  }

  default_cache_behavior {
    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    target_origin_id       = "s3-cloudfront"
    viewer_protocol_policy = "redirect-to-https"

    compress = true

    # this reflects 'use origin cache headers' on the web portal
    default_ttl = 86400
    min_ttl     = 0
    max_ttl     = 31536000

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.rewrite_add_index_html.arn
    }
  }

  ordered_cache_behavior {
    path_pattern     = "/api/*"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "api_gateway"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"

    # strip /api/... prefix to enable use of default stage in api gateway
    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.rewrite_remove_api_prefix.arn
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.certificate.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "access-identity-jacobsalway.com.s3.amazonaws.com"
}

resource "aws_cloudfront_function" "rewrite_add_index_html" {
  name    = "rewrite-add-index-html"
  runtime = "cloudfront-js-1.0"
  code    = <<EOF
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    } else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }

    return request;
};
EOF
}

resource "aws_cloudfront_function" "rewrite_remove_api_prefix" {
  name    = "rewrite-remove-api-prefix"
  runtime = "cloudfront-js-1.0"
  code    = <<EOF
function handler(event) {
	var request = event.request;
	request.uri = request.uri.replace(/^\/[^/]*\//, "/");
	return request;
}
EOF
}

resource "aws_s3_bucket" "cloudfront_logs" {
  bucket = "cloudfront-logs-424518242023"
}
