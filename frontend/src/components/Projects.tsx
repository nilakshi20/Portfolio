import { portfolio } from '../data/portfolioData.js'
import { OptionalLink } from './ui/OptionalLink'
import { Section } from './ui/Section'
import { Tag } from './ui/Tag'

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected systems"
      description="Production-shaped work across retrieval, events, scraping, and LLM-assisted tooling."
    >
      <div className="project-grid">
        {portfolio.projects.map((project, index) => (
          <article key={project.title} className="glass project-card">
            <div className="project-card__top">
              <span className="project-card__index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="project-card__links">
                <OptionalLink href={project.github}>Code</OptionalLink>
                <OptionalLink href={project.demo}>Live</OptionalLink>
              </div>
            </div>
            <h3>{project.title}</h3>
            <p className="project-card__description">{project.description}</p>
            {project.architecture ? (
              <p className="project-card__architecture">
                <span>Architecture</span>
                {project.architecture}
              </p>
            ) : null}
            <div className="tag-row">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
