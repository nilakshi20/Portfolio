"""Exercises SmtpEmailSender against a throwaway in-process SMTP server.

This covers the parts a mock would hide: the ESMTP dialogue, authentication,
envelope addresses, and the bytes that actually reach the server.
"""

import asyncio
import socketserver
import threading

import pytest

from app.schemas.contact import ContactRequest
from app.services.email_service import EmailDeliveryError, SmtpEmailSender
from tests.conftest import make_settings

SUBMISSION = ContactRequest(
    name="Priya Sharma",
    email="priya@example.com",
    message="Hi Nilakshi, I would like to discuss an AI/ML engineering role.",
)


class _Sink(socketserver.StreamRequestHandler):
    """Accepts one message and records the transcript on the server."""

    def reply(self, code: int, text: str) -> None:
        self.wfile.write(f"{code} {text}\r\n".encode())

    def handle(self) -> None:
        self.reply(220, "test-sink ESMTP")
        while True:
            raw = self.rfile.readline()
            if not raw:
                return
            command = raw.decode().strip()
            upper = command.upper()

            if upper.startswith(("EHLO", "HELO")):
                self.wfile.write(b"250-test-sink\r\n250 AUTH PLAIN\r\n")
            elif upper.startswith("AUTH"):
                self.server.authenticated = True
                self.reply(235, "Authentication successful")
            elif upper.startswith("MAIL FROM"):
                self.server.mail_from = command
                self.reply(250, "OK")
            elif upper.startswith("RCPT TO"):
                self.server.rcpt_to.append(command)
                self.reply(250, "OK")
            elif upper == "DATA":
                self.reply(354, "End data")
                lines = []
                while True:
                    chunk = self.rfile.readline()
                    if not chunk or chunk.strip() == b".":
                        break
                    lines.append(chunk)
                self.server.data = b"".join(lines).decode()
                self.reply(250, "Queued")
            elif upper == "QUIT":
                self.reply(221, "Bye")
                return
            else:
                self.reply(250, "OK")


class _SinkServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.authenticated = False
        self.mail_from = ""
        self.rcpt_to: list[str] = []
        self.data = ""


@pytest.fixture
def sink():
    server = _SinkServer(("127.0.0.1", 0), _Sink)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    yield server
    server.shutdown()
    server.server_close()


def sink_settings(sink, **overrides):
    return make_settings(
        smtp_host="127.0.0.1",
        smtp_port=sink.server_address[1],
        smtp_username="mailer@example.test",
        smtp_password="not-a-real-secret",
        smtp_sender="mailer@example.test",
        contact_recipient="inbox@example.test",
        smtp_use_tls=False,
        **overrides,
    )


def test_submission_reaches_the_smtp_server(sink):
    sender = SmtpEmailSender(sink_settings(sink))
    assert sender.is_configured is True

    asyncio.run(sender.send(SUBMISSION))

    assert sink.authenticated is True
    assert "mailer@example.test" in sink.mail_from
    assert any("inbox@example.test" in rcpt for rcpt in sink.rcpt_to)


def test_delivered_message_carries_every_form_field(sink):
    sender = SmtpEmailSender(sink_settings(sink))
    asyncio.run(sender.send(SUBMISSION))

    assert "Priya Sharma" in sink.data
    assert "priya@example.com" in sink.data
    assert "AI/ML engineering role" in sink.data
    assert "Reply-To: priya@example.com" in sink.data


def test_unreachable_server_raises_delivery_error():
    # Port 1 is not listening, so the connection attempt fails immediately.
    sender = SmtpEmailSender(
        make_settings(
            smtp_host="127.0.0.1",
            smtp_port=1,
            smtp_username="mailer@example.test",
            smtp_password="not-a-real-secret",
            smtp_sender="mailer@example.test",
            contact_recipient="inbox@example.test",
            smtp_use_tls=False,
            smtp_timeout=2.0,
        )
    )

    with pytest.raises(EmailDeliveryError):
        asyncio.run(sender.send(SUBMISSION))
