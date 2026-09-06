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

# Mount at "" for local/dev and "/api" for Vercel (frontend calls /api/contact).
# Vercel may or may not strip the /api prefix before the request reaches FastAPI.
for api_prefix in ("", "/api"):
    app.include_router(contact.router, prefix=api_prefix)
    app.include_router(resume.router, prefix=api_prefix)


async def _root_payload() -> RootResponse:
    return RootResponse(
        name=settings.app_name,
        version=settings.app_version,
        docs="/docs",
        health="/health",
    )


async def _health_payload(
    request_settings: SettingsDep, sender: EmailSenderDep
) -> HealthResponse:
    return HealthResponse(
        status="ok",
        environment=request_settings.environment,
        email_configured=sender.is_configured,
    )


@app.get("/", response_model=RootResponse, tags=["meta"], summary="Service metadata")
async def read_root() -> RootResponse:
    return await _root_payload()


@app.get("/api", response_model=RootResponse, tags=["meta"], summary="Service metadata (API prefix)")
@app.get("/api/", response_model=RootResponse, tags=["meta"], summary="Service metadata (API prefix)", include_in_schema=False)
async def read_root_api() -> RootResponse:
    return await _root_payload()


@app.get("/health", response_model=HealthResponse, tags=["meta"], summary="Liveness check")
async def read_health(
    request_settings: SettingsDep, sender: EmailSenderDep
) -> HealthResponse:
    return await _health_payload(request_settings, sender)


@app.get(
    "/api/health",
    response_model=HealthResponse,
    tags=["meta"],
    summary="Liveness check (API prefix)",
)
async def read_health_api(
    request_settings: SettingsDep, sender: EmailSenderDep
) -> HealthResponse:
    return await _health_payload(request_settings, sender)
