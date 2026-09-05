import { useState, type FormEvent } from 'react'
import { portfolio } from '../data/portfolioData.js'
import { formatPhone, mailtoHref, telHref } from '../utils/links'
import { OptionalLink } from './ui/OptionalLink'
import { Button } from './ui/Button'
import { Section } from './ui/Section'

type FormState = {
  name: string
  email: string
  message: string
}

const emptyForm: FormState = {
  name: '',
  email: '',
  message: '',
}

export function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [status, setStatus] = useState('')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus(
      `Thanks, ${form.name.trim() || 'there'}. The form is ready — email delivery will be connected next. Meanwhile, write to ${portfolio.email}.`,
    )
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
          <p className="contact__label">Direct</p>
          <a href={mailtoHref(portfolio.email)}>{portfolio.email}</a>
          <a href={telHref(portfolio.phone)}>{formatPhone(portfolio.phone)}</a>
          <div className="contact__socials">
            <OptionalLink href={portfolio.socials.github}>GitHub</OptionalLink>
            <OptionalLink href={portfolio.socials.linkedin}>
              LinkedIn
            </OptionalLink>
          </div>
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
              required
            />
          </label>
          <Button type="submit">Send Message</Button>
          {status ? <p className="contact__status">{status}</p> : null}
        </form>
      </div>
    </Section>
  )
}
