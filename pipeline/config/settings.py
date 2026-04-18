from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    supabase_url: str
    supabase_service_role_key: str  # Service role — write access
    groq_api_key: str
    pipeline_run_type: str = "incremental"  # 'full' | 'incremental'
    max_concurrent_scrapers: int = 3
    request_delay_seconds: float = 2.0  # Be polite to servers
    playwright_timeout_ms: int = 30000

    class Config:
        env_file = ".env"


settings = Settings()
