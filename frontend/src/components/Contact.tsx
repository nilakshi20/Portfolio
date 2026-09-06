import { useState, type FormEvent } from 'react'
import { portfolio } from '../data/portfolioData.js'
import { submitContact } from '../services/contactApi'
import { mailtoHref } from '../utils/links'
import { OptionalLink } from './ui/OptionalLink'
import { Button } from './ui/Button'
import { Section } from './ui/Section'

type FormState = {
  name: string
  email: string
  message: string
}

type Status =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string }

const emptyForm: FormState = {
  name: '',
  email: '',
  message: '',
}

export function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const isLoading = status.kind === 'loading'

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isLoading) return

    setStatus({ kind: 'loading' })
    try {
      const result = await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      })
      setStatus({ kind: 'success', message: result.detail })
      setForm(emptyForm)
    } catch (error) {
      setStatus({
        kind: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong sending your message.',
      })
    }
  }

  return (
    <Section
      id="contact"
      eyebrow={portfolio.contact.eyebrow}
      title={portfolio.contact.title}
      description={portfolio.contact.note}
    >
      <div className="contact">
        <aside className="glass contact__details">
          <div className="contact__visual">
            <span className="contact__orbit" aria-hidden="true" />
            <span className="contact__orbit contact__orbit--delayed" aria-hidden="true" />
            <img
              className="contact__avatar"
              src={portfolio.profileImage}
              alt={portfolio.name}
              width={128}
              height={128}
            />
          </div>

          <div className="contact__availability">
            <span className="contact__dot" aria-hidden="true" />
            <span>{portfolio.contact.availability}</span>
          </div>

          <div>
            <p className="contact__label">Direct</p>
            <div className="contact__item">
              <span className="contact__item-label">Email</span>
              <a href={mailtoHref(portfolio.email)}>{portfolio.email}</a>
            </div>
            <div className="contact__socials">
              <OptionalLink href={portfolio.socials.github}>GitHub</OptionalLink>
              <OptionalLink href={portfolio.socials.linkedin}>
                LinkedIn
              </OptionalLink>
            </div>
          </div>

          <p className="contact__response">{portfolio.contact.responseNote}</p>
        </aside>

        <form className="glass contact__form" onSubmit={onSubmit}>
          <label>
            Name
            <input
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
              minLength={2}
              maxLength={80}
              disabled={isLoading}
              required
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              disabled={isLoading}
              required
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows={5}
              placeholder="What should we talk about?"
              value={form.message}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  message: event.target.value,
                }))
              }
              minLength={10}
              maxLength={2000}
              disabled={isLoading}
              required
            />
          </label>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="btn__spinner" aria-hidden="true" />
                Sending…
              </>
            ) : (
              'Send Message'
            )}
          </Button>
          <p
            className={`contact__status contact__status--${status.kind}`}
            role="status"
            aria-live="polite"
          >
            {status.kind === 'success' || status.kind === 'error'
              ? status.message
              : ''}
          </p>
        </form>
      </div>
    </Section>
  )
}
