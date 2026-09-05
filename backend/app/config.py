"""Application settings, loaded from the environment or a local .env file."""

from functools import lru_cache

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "Portfolio API"
    app_version: str = "1.0.0"
    environment: str = "development"

    # Comma-separated so the value stays a plain string in .env and in hosting
    # dashboards, e.g. "http://localhost:5173,https://nilakshi.dev".
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"

    # Where contact-form submissions are delivered.
    contact_recipient: str = ""

    # SMTP credentials come from the environment only; there are no defaults.
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_username: str = ""
    smtp_password: str = ""
    smtp_sender: str = ""
    smtp_use_tls: bool = True
    smtp_timeout: float = 15.0

    @field_validator("smtp_password", mode="before")
    @classmethod
    def strip_app_password_spaces(cls, value: object) -> object:
        # Google App Passwords are often copied with spaces for readability.
        if isinstance(value, str):
            return value.replace(" ", "").strip()
        return value

    @property
    def allowed_origins(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
