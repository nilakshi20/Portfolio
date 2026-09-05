from app.main import settings

VALID_PAYLOAD = {
    "name": "Nilakshi Mishra",
    "email": "someone@example.com",
    "message": "I would like to talk about an AI/ML engineering role.",
}


def test_root_returns_metadata(client):
    response = client.get("/")
    assert response.status_code == 200
    body = response.json()
    assert body["name"]
    assert body["docs"] == "/docs"
    assert body["health"] == "/health"


def test_health_reports_delivery_is_unconfigured(client):
    response = client.get("/health")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["environment"] == "test"
    assert body["email_configured"] is False


def test_contact_returns_503_when_delivery_unconfigured(client):
    response = client.post("/contact", json=VALID_PAYLOAD)
    assert response.status_code == 503
    assert "not configured" in response.json()["detail"]


def test_contact_reports_delivery_only_after_sending(sending_client):
    test_client, stub = sending_client
    response = test_client.post("/contact", json=VALID_PAYLOAD)

    assert response.status_code == 200
    assert response.json()["delivered"] is True
    assert len(stub.sent) == 1
    assert stub.sent[0].email == VALID_PAYLOAD["email"]


def test_contact_trims_whitespace_before_sending(sending_client):
    test_client, stub = sending_client
    response = test_client.post(
        "/contact",
        json={**VALID_PAYLOAD, "name": "  Nilakshi Mishra  "},
    )

    assert response.status_code == 200
    assert stub.sent[0].name == "Nilakshi Mishra"


def test_contact_returns_502_when_provider_fails(failing_client):
    response = failing_client.post("/contact", json=VALID_PAYLOAD)
    assert response.status_code == 502
    assert response.json()["detail"] == "Email delivery failed."


def test_contact_rejects_invalid_email(client):
    response = client.post("/contact", json={**VALID_PAYLOAD, "email": "not-an-email"})
    assert response.status_code == 422
    assert response.json()["detail"][0]["loc"][-1] == "email"


def test_contact_rejects_short_name(client):
    response = client.post("/contact", json={**VALID_PAYLOAD, "name": "N"})
    assert response.status_code == 422
    assert response.json()["detail"][0]["loc"][-1] == "name"


def test_contact_rejects_name_without_letters(client):
    response = client.post("/contact", json={**VALID_PAYLOAD, "name": "1234"})
    assert response.status_code == 422
    assert "letter" in response.json()["detail"][0]["msg"]


def test_contact_rejects_short_message(client):
    response = client.post("/contact", json={**VALID_PAYLOAD, "message": "hi"})
    assert response.status_code == 422
    assert response.json()["detail"][0]["loc"][-1] == "message"


def test_contact_rejects_whitespace_only_message(client):
    response = client.post("/contact", json={**VALID_PAYLOAD, "message": "   " * 20})
    assert response.status_code == 422


def test_contact_rejects_overlong_message(client):
    response = client.post("/contact", json={**VALID_PAYLOAD, "message": "a" * 2001})
    assert response.status_code == 422


def test_contact_rejects_missing_fields(client):
    response = client.post("/contact", json={})
    assert response.status_code == 422
    missing = {issue["loc"][-1] for issue in response.json()["detail"]}
    assert missing == {"name", "email", "message"}


def test_cors_allows_the_configured_frontend_origin(client):
    origin = settings.allowed_origins[0]
    response = client.options(
        "/contact",
        headers={
            "Origin": origin,
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type",
        },
    )
    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == origin


def test_cors_rejects_an_unknown_origin(client):
    response = client.options(
        "/contact",
        headers={
            "Origin": "https://not-my-site.example",
            "Access-Control-Request-Method": "POST",
        },
    )
    assert "access-control-allow-origin" not in response.headers


def test_resume_download_returns_pdf(client):
    response = client.get("/resume")
    assert response.status_code == 200
    assert response.headers["content-type"].startswith("application/pdf")
    assert "Nilakshi-Mishra-AI-ML-Engineer-Resume.pdf" in response.headers.get(
        "content-disposition", ""
    )
    assert response.content[:4] == b"%PDF"
