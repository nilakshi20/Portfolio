import pytest
from fastapi.testclient import TestClient

from app.config import Settings, get_settings
from app.dependencies import get_email_sender
from app.main import app
from app.schemas.contact import ContactRequest
from app.services.email_service import EmailDeliveryError


def make_settings(**overrides) -> Settings:
    """Settings built in isolation from the developer's local .env."""
    base = {
        "environment": "test",
        "cors_origins": "http://localhost:5173",
        "contact_recipient": "",
        "smtp_host": "",
        "smtp_port": 587,
        "smtp_username": "",
        "smtp_password": "",
        "smtp_sender": "",
    }
    return Settings(_env_file=None, **{**base, **overrides})


# FastAPI inspects an override's signature, so the callable it gets must take no
# arguments -- passing `make_settings` directly turns `**overrides` into a field.
def settings_override(**overrides):
    return lambda: make_settings(**overrides)


class StubSender:
    """Records what it was asked to send, or fails on demand."""

    def __init__(self, *, configured: bool = True, error: Exception | None = None):
        self._configured = configured
        self._error = error
        self.sent: list[ContactRequest] = []

    @property
    def is_configured(self) -> bool:
        return self._configured

    async def send(self, submission: ContactRequest) -> None:
        if self._error is not None:
            raise self._error
        self.sent.append(submission)


@pytest.fixture
def client():
    """Client with unconfigured SMTP, matching a fresh checkout."""
    app.dependency_overrides[get_settings] = settings_override()
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture
def sending_client():
    """Client whose sender reports a successful delivery."""
    stub = StubSender()
    app.dependency_overrides[get_settings] = settings_override()
    app.dependency_overrides[get_email_sender] = lambda: stub
    with TestClient(app) as test_client:
        yield test_client, stub
    app.dependency_overrides.clear()


@pytest.fixture
def failing_client():
    """Client whose provider is reachable but rejects the message."""
    stub = StubSender(error=EmailDeliveryError("Email delivery failed."))
    app.dependency_overrides[get_settings] = settings_override()
    app.dependency_overrides[get_email_sender] = lambda: stub
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
