import { portfolio } from '../data/portfolioData.js'
import { useTypedText } from '../hooks/useTypedText'
import { isConfiguredUrl } from '../utils/links'
import { Button } from './ui/Button'

export function Hero() {
  const typedRole = useTypedText(portfolio.hero.rotatingTitles)

  return (
    <section id="home" className="hero">
      <div className="hero__aurora" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__stars" aria-hidden="true" />
      <div className="hero__orbits" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero__kicker">
            <span className="hero__kicker-dot" />
            Applied AI · Production systems
          </p>
          <h1>
            <span className="hero__lead">{portfolio.hero.greetingLead}</span>
            <span className="hero__name">{portfolio.hero.greetingName}</span>
          </h1>
          <p className="hero__role">
            <span>{typedRole}</span>
            <span className="hero__caret" aria-hidden="true" />
          </p>
          <p className="hero__subtitle">{portfolio.hero.subtitle}</p>
          <div className="hero__actions">
            <Button href="#projects">
              View Projects
              <span aria-hidden="true"> →</span>
            </Button>
            <Button href="#contact" variant="secondary">
              Let's Connect
            </Button>
            {isConfiguredUrl(portfolio.resumeUrl) ? (
              <Button href={portfolio.resumeUrl} variant="ghost" download>
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
