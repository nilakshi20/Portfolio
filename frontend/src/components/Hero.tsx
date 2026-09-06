import type { MouseEvent } from 'react'
import { portfolio } from '../data/portfolioData.js'
import { downloadResume } from '../utils/downloadResume'
import { isConfiguredUrl } from '../utils/links'
import { onSectionLinkClick, sectionPath } from '../utils/sectionRoutes'
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

export function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__aurora" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__stars" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero__kicker">
            <span className="hero__kicker-dot" />
            {portfolio.hero.eyebrow}
          </p>
          <h1 className="hero__heading">{portfolio.hero.heading}</h1>
          <p className="hero__subtitle">{portfolio.hero.description}</p>
          <p className="hero__support">{portfolio.hero.supporting}</p>
          <div className="hero__actions">
            <Button
              href={sectionPath('projects')}
              onClick={(event: MouseEvent<HTMLAnchorElement>) =>
                onSectionLinkClick(event, 'projects')
              }
            >
              View Projects
              <span aria-hidden="true"> →</span>
            </Button>
            <Button
              href={sectionPath('contact')}
              variant="secondary"
              onClick={(event: MouseEvent<HTMLAnchorElement>) =>
                onSectionLinkClick(event, 'contact')
              }
            >
              Let's Connect
            </Button>
            {isConfiguredUrl(portfolio.resumeUrl) ? (
              <Button
                href={resumeHref()}
                variant="ghost"
                download={portfolio.resumeFileName}
                onClick={onResumeClick}
              >
                Download Resume
              </Button>
            ) : null}
          </div>
        </div>

        <aside className="hero__panel" aria-label="System overview">
          <div className="hero__panel-top">
            <span>system / applied-ai</span>
            <span className="hero__status">
              <span className="hero__status-dot" />
              live
            </span>
          </div>
          <ol className="hero__stack">
            <li>
              <span>01</span>
              <div>
                <strong>Retrieve</strong>
                <p>RAG over private context with FAISS and Pinecone</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Reason</strong>
                <p>LLMs, agents, tool calling, and MCP</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Serve</strong>
                <p>FastAPI services deployed on AWS</p>
              </div>
            </li>
          </ol>
        </aside>
      </div>
    </section>
  )
}
