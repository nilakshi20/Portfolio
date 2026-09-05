"""Shared FastAPI dependencies."""

from typing import Annotated

from fastapi import Depends

from app.config import Settings, get_settings
from app.services.email_service import EmailSender, build_email_sender

SettingsDep = Annotated[Settings, Depends(get_settings)]


def get_email_sender(settings: SettingsDep) -> EmailSender:
    return build_email_sender(settings)


EmailSenderDep = Annotated[EmailSender, Depends(get_email_sender)]
