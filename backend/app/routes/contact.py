"""Contact-form endpoint."""

import logging

from fastapi import APIRouter, HTTPException, status

from app.dependencies import EmailSenderDep
from app.schemas.contact import ContactRequest, ContactResponse
from app.services.email_service import (
    EmailDeliveryError,
    EmailNotConfiguredError,
)

logger = logging.getLogger(__name__)

router = APIRouter(tags=["contact"])


@router.post(
    "/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_200_OK,
    summary="Submit the contact form",
    responses={
        422: {"description": "Validation failed"},
        502: {"description": "Email provider rejected the message"},
        503: {"description": "Email delivery is not configured"},
    },
)
async def submit_contact(
    submission: ContactRequest,
    sender: EmailSenderDep,
) -> ContactResponse:
    try:
        await sender.send(submission)
    except EmailNotConfiguredError as exc:
        # Surfaced as 503 rather than a success so the client is never told a
        # message was delivered when it was not.
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)
        ) from exc
    except EmailDeliveryError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc)
        ) from exc

    logger.info("Contact submission delivered for %s", submission.email)
    return ContactResponse(
        delivered=True,
        detail="Thanks for reaching out. Your message was sent.",
    )
