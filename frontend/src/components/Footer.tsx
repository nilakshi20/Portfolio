import { portfolio } from '../data/portfolioData.js'
import { OptionalLink } from './ui/OptionalLink'
import { mailtoHref } from '../utils/links'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__row">
        <p>
          © {year} {portfolio.name}. {portfolio.title}.
        </p>
        <div className="footer__links">
          <a href={mailtoHref(portfolio.email)}>{portfolio.email}</a>
          <OptionalLink href={portfolio.socials.github}>GitHub</OptionalLink>
          <OptionalLink href={portfolio.socials.linkedin}>LinkedIn</OptionalLink>
        </div>
      </div>
    </footer>
  )
}
