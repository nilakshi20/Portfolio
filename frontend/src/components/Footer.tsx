import { portfolio } from '../data/portfolioData.js'
import { isConfiguredUrl } from '../utils/links'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 7.5c.85 0 1.71.12 2.51.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .26.18.59.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22 2H2v20h20V2Z"
      />
    </svg>
  )
}

export function Footer() {
  const github = portfolio.socials.github
  const linkedin = portfolio.socials.linkedin

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

        <div className="footer__socials" aria-label="Social profiles">
          {isConfiguredUrl(github) ? (
            <a
              className="footer__social"
              href={github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              title="GitHub"
            >
              <GitHubIcon />
            </a>
          ) : null}
          {isConfiguredUrl(linkedin) ? (
            <a
              className="footer__social"
              href={linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
