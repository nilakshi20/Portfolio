"""Serve the resume PDF for download."""

from pathlib import Path

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse

router = APIRouter(tags=["resume"])

ASSETS_DIR = Path(__file__).resolve().parents[2] / "assets"
DOWNLOAD_NAME = "Nilakshi-Mishra-AI-ML-Engineer-Resume.pdf"

# Prefer these names in order, then fall back to the newest PDF in assets/.
CANDIDATE_NAMES = (
    "Nilakshi-Mishra-AI-ML-Engineer-Resume.pdf",
    "nilakshi_resume_latest.pdf",
    "resume.pdf",
)

NO_CACHE_HEADERS = {
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    "Pragma": "no-cache",
    "Expires": "0",
}


def resolve_resume_path() -> Path | None:
    for name in CANDIDATE_NAMES:
        candidate = ASSETS_DIR / name
        if candidate.is_file():
            return candidate

    if not ASSETS_DIR.is_dir():
        return None

    pdfs = sorted(
        ASSETS_DIR.glob("*.pdf"),
        key=lambda path: path.stat().st_mtime,
        reverse=True,
    )
    return pdfs[0] if pdfs else None


def _resume_response(resume_path: Path) -> FileResponse:
    # Include mtime in the filename hint so browsers don't reuse an old attachment.
    version = int(resume_path.stat().st_mtime)
    return FileResponse(
        path=resume_path,
        media_type="application/pdf",
        filename=DOWNLOAD_NAME,
        content_disposition_type="attachment",
        headers={
            **NO_CACHE_HEADERS,
            "ETag": f'W/"resume-{version}-{resume_path.stat().st_size}"',
            "X-Resume-Version": str(version),
        },
    )


@router.get(
    "/resume",
    summary="Download resume PDF",
    responses={404: {"description": "Resume file is missing on the server"}},
)
async def download_resume() -> FileResponse:
    resume_path = resolve_resume_path()
    if resume_path is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume file is not available.",
        )
    return _resume_response(resume_path)


# New path so sticky browser caches of the old /resume body are skipped.
@router.get(
    "/v1/resume",
    summary="Download resume PDF (cache-busted path)",
    responses={404: {"description": "Resume file is missing on the server"}},
)
async def download_resume_v1() -> FileResponse:
    return await download_resume()
