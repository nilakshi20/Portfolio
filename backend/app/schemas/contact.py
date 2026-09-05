"""Request and response models for the contact endpoint."""

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class ContactRequest(BaseModel):
    """A contact-form submission.

    Whitespace is stripped before the length constraints are applied, so a
    message of only spaces is rejected rather than stored blank.
    """

    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=2, max_length=80, examples=["Nilakshi Mishra"])
    email: EmailStr = Field(examples=["someone@example.com"])
    message: str = Field(
        min_length=10,
        max_length=2000,
        examples=["I'd like to talk about an AI/ML engineering role."],
    )

    @field_validator("name")
    @classmethod
    def name_must_contain_letters(cls, value: str) -> str:
        if not any(character.isalpha() for character in value):
            raise ValueError("Name must contain at least one letter.")
        return value


class ContactResponse(BaseModel):
    """Result of a submission. `delivered` is only true once email actually went out."""

    delivered: bool
    detail: str


class HealthResponse(BaseModel):
    status: str
    environment: str
    email_configured: bool


class RootResponse(BaseModel):
    name: str
    version: str
    docs: str
    health: str
