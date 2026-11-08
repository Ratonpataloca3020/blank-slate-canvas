import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()


class Settings:
    """Application settings."""
    
    app_name = "Lexflex"
    app_env = os.getenv("APP_ENV", "production")
    debug = os.getenv("DEBUG", "False").lower() == "true"
    
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8080))
    
    site_url = os.getenv("SITE_URL", "https://www.lexflexperu.com")
    
    openai_api_key = os.getenv("OPENAI_API_KEY", "")
    openai_model = os.getenv("OPENAI_MODEL", "gpt-4")


settings = Settings()
