import { useEffect, useMemo, useState } from 'react'
import { portfolio } from '../data/portfolioData.js'
import { useActiveSection } from '../hooks/useActiveSection'
import { isConfiguredUrl } from '../utils/links'
import { Button } from './ui/Button'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const sectionIds = useMemo(
    () => ['home', ...portfolio.nav.map((item) => item.id)],
    [],
  )
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

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__bar">
        <a className="nav__brand" href="#home" onClick={close}>
          <span className="nav__mark">{portfolio.shortName}</span>
          <span className="nav__name">{portfolio.name}</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {portfolio.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeId === item.id ? 'is-active' : ''}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          {isConfiguredUrl(portfolio.resumeUrl) ? (
            <Button
              href={portfolio.resumeUrl}
              variant="ghost"
              className="nav__resume"
              download
            >
              Resume
            </Button>
          ) : null}
          <Button href="#contact" className="nav__talk" onClick={close}>
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
              href={`#${item.id}`}
              className={activeId === item.id ? 'is-active' : ''}
              onClick={close}
            >
              {item.label}
            </a>
          ))}
          <Button href="#contact" onClick={close}>
            Let's Talk
            <span aria-hidden="true"> →</span>
          </Button>
        </nav>
      </div>
    </header>
  )
}
