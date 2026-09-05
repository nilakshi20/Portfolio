"""Delivery of contact-form messages.

`EmailSender` is the integration seam: a future provider (Resend, SES, SendGrid)
only has to satisfy `is_configured` and `send`, and `build_email_sender` picks it
up without touching the route.

`SmtpEmailSender` is the only implementation today. When SMTP credentials are
absent it sends nothing and raises `EmailNotConfiguredError`, so the API never
reports a delivery that did not happen.
"""

from __future__ import annotations

import asyncio
import logging
import smtplib
from email.message import EmailMessage
from typing import Protocol, runtime_checkable

from app.config import Settings
from app.schemas.contact import ContactRequest

logger = logging.getLogger(__name__)


class EmailServiceError(RuntimeError):
    """Base class for delivery problems."""


class EmailNotConfiguredError(EmailServiceError):
    """Raised when no delivery credentials are present."""


class EmailDeliveryError(EmailServiceError):
    """Raised when a configured provider was reached but the send failed."""


@runtime_checkable
class EmailSender(Protocol):
    @property
    def is_configured(self) -> bool:
        """Whether this sender has everything it needs to deliver mail."""

    async def send(self, submission: ContactRequest) -> None:
        """Deliver one contact submission, or raise an `EmailServiceError`."""


def build_message(submission: ContactRequest, sender: str, recipient: str) -> EmailMessage:
    """Compose the notification email for a submission.

    Reply-To carries the submitter's address so replying from the inbox reaches
    them directly, while the envelope sender stays a domain we are allowed to
    send as.
    """
    message = EmailMessage()
    message["Subject"] = f"Portfolio contact from {submission.name}"
    message["From"] = sender
    message["To"] = recipient
    message["Reply-To"] = str(submission.email)
    message.set_content(
        f"Name: {submission.name}\n"
        f"Email: {submission.email}\n"
        "\n"
        f"{submission.message}\n"
    )
    return message


class SmtpEmailSender:
    """Sends mail over SMTP using the standard library."""

    def __init__(self, settings: Settings) -> None:
        self._settings = settings

    @property
    def is_configured(self) -> bool:
        settings = self._settings
        return bool(
            settings.smtp_host
            and settings.smtp_username
            and settings.smtp_password
            and settings.smtp_sender
            and settings.contact_recipient
        )

    async def send(self, submission: ContactRequest) -> None:
        if not self.is_configured:
            raise EmailNotConfiguredError(
                "Email delivery is not configured on the server."
            )

        message = build_message(
            submission,
            sender=self._settings.smtp_sender,
            recipient=self._settings.contact_recipient,
        )
        # smtplib is blocking, so keep it off the event loop.
        await asyncio.to_thread(self._deliver, message)

    def _deliver(self, message: EmailMessage) -> None:
        settings = self._settings
        try:
            with smtplib.SMTP(
                settings.smtp_host, settings.smtp_port, timeout=settings.smtp_timeout
            ) as client:
                if settings.smtp_use_tls:
                    client.starttls()
                client.login(settings.smtp_username, settings.smtp_password)
                client.send_message(message)
        except (smtplib.SMTPException, OSError) as exc:
            # Log the cause server-side; the client gets a generic failure.
            logger.exception("SMTP delivery failed")
            raise EmailDeliveryError("Email delivery failed.") from exc


def build_email_sender(settings: Settings) -> EmailSender:
    """Return the configured sender. Swap in another provider here."""
    return SmtpEmailSender(settings)
