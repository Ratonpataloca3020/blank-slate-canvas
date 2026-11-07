from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings."""
    
    app_name: str = "Lexflex"
    app_env: str = "development"
    debug: bool = True
    
    host: str = "0.0.0.0"
    port: int = 8080
    
    site_url: str = "http://localhost:8080"
    
    openai_api_key: str = ""
    openai_model: str = "gpt-4"
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False
    )


settings = Settings()
