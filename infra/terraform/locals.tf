locals {
  database_url_parameter_arn = "arn:aws:ssm:${data.aws_region.current.region}:${data.aws_caller_identity.current.account_id}:parameter/tracro/DATABASE_URL"
}
