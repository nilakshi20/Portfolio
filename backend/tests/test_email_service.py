import asyncio

import pytest

from app.schemas.contact import ContactRequest
from app.services.email_service import (
    EmailNotConfiguredError,
    SmtpEmailSender,
    build_email_sender,
    build_message,
)
from tests.conftest import make_settings

SUBMISSION = ContactRequest(
    name="Nilakshi Mishra",
    email="someone@example.com",
    message="I would like to talk about an AI/ML engineering role.",
)

CONFIGURED = {
    "smtp_host": "smtp.example.com",
    "smtp_username": "mailer@example.com",
    "smtp_password": "secret",
    "smtp_sender": "mailer@example.com",
    "contact_recipient": "inbox@example.com",
}


def test_sender_is_unconfigured_without_credentials():
    sender = SmtpEmailSender(make_settings())
    assert sender.is_configured is False


def test_sender_is_configured_with_full_credentials():
    sender = SmtpEmailSender(make_settings(**CONFIGURED))
    assert sender.is_configured is True


@pytest.mark.parametrize("missing", sorted(CONFIGURED))
def test_sender_needs_every_credential(missing):
    sender = SmtpEmailSender(make_settings(**{**CONFIGURED, missing: ""}))
    assert sender.is_configured is False


def test_send_raises_instead_of_silently_dropping():
    sender = SmtpEmailSender(make_settings())
    with pytest.raises(EmailNotConfiguredError):
        asyncio.run(sender.send(SUBMISSION))


def test_build_message_replies_to_the_visitor():
    message = build_message(
        SUBMISSION, sender="mailer@example.com", recipient="inbox@example.com"
    )

    assert message["From"] == "mailer@example.com"
    assert message["To"] == "inbox@example.com"
    assert message["Reply-To"] == "someone@example.com"
    assert SUBMISSION.name in message["Subject"]
    assert SUBMISSION.message in message.get_content()


def test_build_email_sender_returns_a_usable_sender():
    sender = build_email_sender(make_settings(**CONFIGURED))
    assert hasattr(sender, "send")
    assert sender.is_configured is True
