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

resource "aws_lb_target_group" "tracro_api" {
  name                 = "tracro-api"
  port                 = 3000
  protocol             = "HTTP"
  target_type          = "ip"
  vpc_id               = data.aws_lb.shared.vpc_id
  deregistration_delay = 30

  health_check {
    enabled             = true
    path                = "/healthz"
    matcher             = "200"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 3
    port                = "traffic-port"
    protocol            = "HTTP"
  }
}

resource "aws_lb_listener_rule" "tracro_api" {
  listener_arn = data.aws_lb_listener.shared_https.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.tracro_api.arn
  }

  condition {
    host_header {
      values = ["tracro-api.costo.so"]
    }
  }
}

resource "aws_ecs_cluster" "tracro" {
  name = "tracro-cluster"
}

resource "aws_ecs_task_definition" "tracro_api" {
  family                   = "tracro-api"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }

  container_definitions = jsonencode([
    {
      name      = "tracro-api"
      image     = "${aws_ecr_repository.tracro_api.repository_url}:bootstrap"
      essential = true

      portMappings = [
        {
          containerPort = 3000
          protocol      = "tcp"
        }
      ]

      environment = [
        { name = "NODE_ENV", value = "production" },
        { name = "PORT", value = "3000" },
        { name = "LOG_LEVEL", value = "info" },
      ]

      secrets = [
        {
          name      = "DATABASE_URL"
          valueFrom = local.database_url_parameter_arn
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.tracro_api.name
          "awslogs-region"        = data.aws_region.current.region
          "awslogs-stream-prefix" = "api"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "tracro_api" {
  name            = "tracro-api"
  cluster         = aws_ecs_cluster.tracro.id
  task_definition = aws_ecs_task_definition.tracro_api.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_lb.shared.subnets
    security_groups  = [aws_security_group.tracro_api_task.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.tracro_api.arn
    container_name   = "tracro-api"
    container_port   = 3000
  }

  health_check_grace_period_seconds = 60

  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

  depends_on = [aws_lb_listener_rule.tracro_api]

  lifecycle {
    ignore_changes = [task_definition]
  }
}
