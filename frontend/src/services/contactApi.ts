import { portfolio } from '../data/portfolioData.js'

// Prefer VITE_API_URL. In production on Vercel, default to same-origin /api.
const API_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? '/api' : '')
).replace(/\/+$/, '')

export type ContactPayload = {
  name: string
  email: string
  message: string
}

export type ContactResult = {
  delivered: boolean
  detail: string
}

/**
 * Turn a FastAPI error body into one sentence a visitor can act on.
 * `detail` is a string for HTTPException and a list of issues for 422.
 */
function readErrorDetail(body: unknown, status: number): string {
  const detail = (body as { detail?: unknown } | null)?.detail

  if (typeof detail === 'string' && detail.trim()) {
    return detail
  }

  if (Array.isArray(detail)) {
    const issues = detail
      .map((item) => {
        const raw = (item as { msg?: unknown })?.msg
        if (typeof raw !== 'string') return ''
        const loc = (item as { loc?: unknown[] })?.loc ?? []
        const field = loc[loc.length - 1]
        const msg = raw.replace(/^Value error, /, '')
        return typeof field === 'string' ? `${field}: ${msg}` : msg
      })
      .filter(Boolean)
    if (issues.length) return issues.join(' ')
  }

  if (status >= 500) {
    return 'The server could not send your message right now.'
  }
  return 'Something went wrong sending your message.'
}

export async function submitContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  if (!API_URL) {
    throw new Error(
      `The contact API is not configured. Set VITE_API_URL, or email ${portfolio.email} directly.`,
    )
  }

  let response: Response
  try {
    response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error(
      `Could not reach the server. Please try again, or email ${portfolio.email} directly.`,
    )
  }

  const body = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(readErrorDetail(body, response.status))
  }

  return body as ContactResult
}
