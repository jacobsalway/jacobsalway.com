resource "aws_route53_zone" "hosted_zone" {
  name = "jacobsalway.com"
}

resource "aws_route53_record" "a_record" {
  zone_id = aws_route53_zone.hosted_zone.zone_id
  name    = "jacobsalway.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "cname_record" {
  zone_id = aws_route53_zone.hosted_zone.zone_id
  name    = "www"
  type    = "CNAME"
  ttl     = 5
  records = ["jacobsalway.com"]
}

resource "aws_acm_certificate" "certificate" {
  provider          = aws.us_east_1
  domain_name       = "jacobsalway.com"
  validation_method = "DNS"

  subject_alternative_names = ["*.jacobsalway.com"]
}

resource "aws_route53_record" "certificate_validation_record" {
  for_each = {
    for dvo in aws_acm_certificate.certificate.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.hosted_zone.zone_id
}

resource "aws_acm_certificate_validation" "validation" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.certificate.arn
  validation_record_fqdns = [for record in aws_route53_record.certificate_validation_record : record.fqdn]
}
