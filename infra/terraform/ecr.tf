resource "aws_ecr_repository" "tracro_api" {
  name                 = "tracro-api"
  image_tag_mutability = "IMMUTABLE"
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_lifecycle_policy" "tracro_api" {
  repository = aws_ecr_repository.tracro_api.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Expire images older than the last 10"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 10
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

output "ecr_repository_url" {
  value = aws_ecr_repository.tracro_api.repository_url
}