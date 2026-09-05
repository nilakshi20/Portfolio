"""FastAPI application for the portfolio backend."""

import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.dependencies import EmailSenderDep, SettingsDep
from app.routes import contact, resume
from app.schemas.contact import HealthResponse, RootResponse

logging.basicConfig(level=logging.INFO)

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Backend for the Nilakshi Mishra portfolio site.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

app.include_router(contact.router)
app.include_router(resume.router)


@app.get("/", response_model=RootResponse, tags=["meta"], summary="Service metadata")
async def read_root() -> RootResponse:
    return RootResponse(
        name=settings.app_name,
        version=settings.app_version,
        docs="/docs",
        health="/health",
    )


@app.get("/health", response_model=HealthResponse, tags=["meta"], summary="Liveness check")
async def read_health(
    request_settings: SettingsDep, sender: EmailSenderDep
) -> HealthResponse:
    return HealthResponse(
        status="ok",
        environment=request_settings.environment,
        email_configured=sender.is_configured,
    )
