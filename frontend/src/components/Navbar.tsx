import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import { portfolio } from '../data/portfolioData.js'
import { useActiveSection } from '../hooks/useActiveSection'
import { useSectionRouting } from '../hooks/useSectionRouting'
import { downloadResume } from '../utils/downloadResume'
import { isConfiguredUrl } from '../utils/links'
import {
  onSectionLinkClick,
  sectionPath,
} from '../utils/sectionRoutes'
import { Button } from './ui/Button'

function resumeHref() {
  return `${portfolio.resumeUrl}?v=${portfolio.resumeVersion}`
}

async function onResumeClick(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault()
  try {
    await downloadResume(resumeHref(), portfolio.resumeFileName)
  } catch {
    window.location.assign(resumeHref())
  }
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const sectionIds = useMemo(
    () => ['home', ...portfolio.nav.map((item) => item.id)],
    [],
  )
  useSectionRouting(sectionIds)
  const activeId = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  const goTo = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    onSectionLinkClick(event, id)
    close()
  }

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__bar">
        <a className="nav__brand" href={sectionPath('home')} onClick={goTo('home')}>
          <span className="nav__mark">{portfolio.shortName}</span>
          <span className="nav__name">{portfolio.name}</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {portfolio.nav.map((item) => (
            <a
              key={item.id}
              href={sectionPath(item.id)}
              className={activeId === item.id ? 'is-active' : ''}
              onClick={goTo(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          {isConfiguredUrl(portfolio.resumeUrl) ? (
            <Button
              href={resumeHref()}
              variant="ghost"
              className="nav__resume"
              download={portfolio.resumeFileName}
              onClick={onResumeClick}
            >
              Resume
            </Button>
          ) : null}
          <Button
            href={sectionPath('contact')}
            className="nav__talk"
            onClick={goTo('contact')}
          >
            Let's Talk
            <span aria-hidden="true"> →</span>
          </Button>
          <button
            type="button"
            className={`nav__toggle ${open ? 'is-open' : ''}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`nav__drawer ${open ? 'is-open' : ''}`}
        hidden={!open}
      >
        <nav aria-label="Mobile">
          {portfolio.nav.map((item) => (
            <a
              key={item.id}
              href={sectionPath(item.id)}
              className={activeId === item.id ? 'is-active' : ''}
              onClick={goTo(item.id)}
            >
              {item.label}
            </a>
          ))}
          <Button href={sectionPath('contact')} onClick={goTo('contact')}>
            Let's Talk
            <span aria-hidden="true"> →</span>
          </Button>
        </nav>
      </div>
    </header>
  )
}
