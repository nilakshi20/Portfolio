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
        <div className="about__intro">
          <figure className="about__photo">
            <img
              src={portfolio.profileImage}
              alt={`${portfolio.name}, ${portfolio.title}`}
              width={320}
              height={400}
              loading="lazy"
            />
          </figure>
          <div className="about__copy">
            {portfolio.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
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
