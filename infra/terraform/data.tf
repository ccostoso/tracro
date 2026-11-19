data "aws_lb" "shared" {
  name = "pokemoves-alb" # Shared ALB, also used by Pokémoves
}

data "aws_lb_listener" "shared_https" {
  load_balancer_arn = data.aws_lb.shared.arn
  port              = 443
}
