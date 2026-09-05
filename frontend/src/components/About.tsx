import { portfolio } from '../data/portfolioData.js'
import { Section } from './ui/Section'

export function About() {
  return (
    <Section
      id="about"
      eyebrow={portfolio.about.eyebrow}
      title={portfolio.about.title}
    >
      <div className="about">
        <div className="about__copy">
          {portfolio.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ul className="about__focus">
          {portfolio.about.focus.map((item) => (
            <li key={item.label} className="glass">
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
