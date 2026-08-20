resource "aws_cognito_user_pool" "pool" {
  name                = "dsy1107-grupo007" # <--- Reemplaza XX por tu número de grupo
  username_attributes = ["email"]
  auto_verified_attributes = ["email"]

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_uppercase = true
    require_numbers   = true
    require_symbols   = false
  }

  # Solo un administrador crea usuarios
  admin_create_user_config {
    allow_admin_create_user_only = true
  }
}

resource "aws_cognito_user_pool_domain" "hosted_ui" {
  domain       = "dsy1107-grupo007" # <--- Debe ser un nombre único
  user_pool_id = aws_cognito_user_pool.pool.id

  # Hosted UI clásica para evitar pantallas en blanco sin branding style
  managed_login_version = 1
}

resource "aws_cognito_user_pool_client" "spa" {
  name         = "spa-react"
  user_pool_id = aws_cognito_user_pool.pool.id

  # Al ser una SPA (React), es un cliente público que no guarda secretos
  generate_secret = false

  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code"]
  supported_identity_providers          = ["COGNITO"]
  allowed_oauth_scopes                 = ["openid", "email", "profile"]

  # ¡Atención! Debe coincidir exactamente con la URL de tu app, incluyendo la diagonal final /
  callback_urls = ["http://localhost:5173/"]
  logout_urls   = ["http://localhost:5173/"]

  # Se habilita ALLOW_USER_PASSWORD_AUTH de forma temporal para pruebas iniciales
  explicit_auth_flows = ["ALLOW_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"]

  # Expiración corta para probar vencimiento de tokens en clase (60 minutos)
  access_token_validity = 60
  id_token_validity     = 60

  token_validity_units {
    access_token = "minutes"
    id_token     = "minutes"
  }
}

resource "aws_cognito_user" "demo"{
  user_pool_id = aws_cognito_user_pool.pool.id
  username = "DovahZenin@gmail.com"
  password = "Dovahzenin123456789"
  
  attributes = {
    email = "DovahZenin@gmail.com"
    email_verified = true
    name = "DovahZenin"
  }
  message_action = "SUPPRESS"
}