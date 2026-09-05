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
            <p>{item.school}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
