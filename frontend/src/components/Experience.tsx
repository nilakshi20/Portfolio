import { portfolio } from '../data/portfolioData.js'
import { Section } from './ui/Section'

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Professional Experience"
    >
      <ol className="timeline">
        {portfolio.experience.map((job) => (
          <li key={`${job.company}-${job.role}`} className="timeline__item">
            <div className="timeline__marker" aria-hidden="true" />
            <article className="glass timeline__card">
              <header className="timeline__header">
                <div className="timeline__heading">
                  <h3>{job.role}</h3>
                  <p className="timeline__company">{job.company}</p>
                </div>
                <p className="timeline__period">{job.period}</p>
              </header>
              <p className="timeline__summary">{job.summary}</p>
              <p className="timeline__label">Key responsibilities</p>
              <ul>
                {job.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
