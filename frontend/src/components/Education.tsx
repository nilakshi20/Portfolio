import { portfolio } from '../data/portfolioData.js'
import { Section } from './ui/Section'

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic foundation">
      <div className="education-list">
        {portfolio.education.map((item) => (
          <article key={item.school} className="glass education-card">
            <p className="education-card__period">{item.period}</p>
            <h3>{item.degree}</h3>
            <p className="education-card__school">{item.school}</p>
            {item.performance ? (
              <p className="education-card__performance">
                <span>Academic Performance</span>
                {item.performance}
              </p>
            ) : null}
            {item.details?.length ? (
              <ul className="education-card__details">
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  )
}
