import { portfolio } from '../data/portfolioData.js'
import { OptionalLink } from './ui/OptionalLink'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__row">
        <div className="footer__copy">
          <p className="footer__name">Nilakshi Mishra</p>
          <p className="footer__role">
            AI/ML Engineer · GenAI · Backend Engineering
          </p>
          <p className="footer__tagline">
            Building practical AI systems, intelligent applications, and
            scalable backend solutions.
          </p>
          <p className="footer__legal">
            © 2026 Nilakshi Mishra. All rights reserved.
          </p>
        </div>
        <div className="footer__links">
          <OptionalLink href={portfolio.socials.github}>GitHub</OptionalLink>
          <OptionalLink href={portfolio.socials.linkedin}>LinkedIn</OptionalLink>
        </div>
      </div>
    </footer>
  )
}
