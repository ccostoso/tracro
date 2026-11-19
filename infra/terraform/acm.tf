resource "aws_acm_certificate" "tracro_api" {
  domain_name       = "tracro-api.costo.so"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

output "acm_validation_record_name" {
  value = one(aws_acm_certificate.tracro_api.domain_validation_options).resource_record_name
}

output "acm_validation_record_value" {
  value = one(aws_acm_certificate.tracro_api.domain_validation_options).resource_record_value
}

resource "aws_acm_certificate_validation" "tracro_api" {
  certificate_arn = aws_acm_certificate.tracro_api.arn
}

resource "aws_lb_listener_certificate" "tracro_api" {
  listener_arn    = data.aws_lb_listener.shared_https.arn
  certificate_arn = aws_acm_certificate_validation.tracro_api.certificate_arn
}