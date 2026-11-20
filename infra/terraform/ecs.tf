resource "aws_cloudwatch_log_group" "tracro_api" {
  name              = "/ecs/tracro-api"
  retention_in_days = 14
}

resource "aws_security_group" "tracro_api_task" {
  name        = "tracro-api-task"
  description = "tracro API task: inbound from the shared ALB only"
  vpc_id      = data.aws_lb.shared.vpc_id
}

resource "aws_vpc_security_group_ingress_rule" "tracro_api_task_http" {
  security_group_id            = aws_security_group.tracro_api_task.id
  referenced_security_group_id = one(data.aws_lb.shared.security_groups)
  ip_protocol                  = "tcp"
  from_port                    = 3000
  to_port                      = 3000
}

resource "aws_vpc_security_group_egress_rule" "tracro_api_task_all" {
  security_group_id = aws_security_group.tracro_api_task.id
  ip_protocol       = "-1"
  cidr_ipv4         = "0.0.0.0/0"
}
