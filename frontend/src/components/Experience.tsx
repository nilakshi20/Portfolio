import { portfolio } from '../data/portfolioData.js'
import { Section } from './ui/Section'

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where the work happens"
    >
      <ol className="timeline">
        {portfolio.experience.map((job) => (
          <li key={`${job.company}-${job.role}`} className="timeline__item">
            <div className="timeline__marker" aria-hidden="true" />
            <article className="glass timeline__card">
              <div className="timeline__meta">
                <p className="timeline__period">{job.period}</p>
                {job.location ? <p>{job.location}</p> : null}
              </div>
              <h3>{job.role}</h3>
              <p className="timeline__company">{job.company}</p>
              <p className="timeline__summary">{job.summary}</p>
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
