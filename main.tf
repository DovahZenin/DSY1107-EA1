resource "aws_apigatewayv2_api" "api_manager" {
  name          = "api-mindicador"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["http://localhost:5173"]
    allow_methods = ["GET", "POST", "OPTIONS"]
    allow_headers = ["Authorization", "Content-Type"]
    max_age       = 300
  }
}

resource "aws_apigatewayv2_integration" "backend" {
  api_id                 = aws_apigatewayv2_api.api_manager.id
  integration_type       = "HTTP_PROXY"
  integration_method     = "GET"
  integration_uri        = "https://mindicador.cl/api"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_route" "datos" {
  api_id    = aws_apigatewayv2_api.api_manager.id
  route_key = "GET /datos"
  target    = "integrations/${aws_apigatewayv2_integration.backend.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.api_manager.id
  name        = "$default"
  auto_deploy = true
}
output "cognito_client_id" {
  value       = aws_cognito_user_pool_client.spa.id
  description = "ID del cliente de aplicación para el frontend"
}
