import { portfolio } from '../data/portfolioData.js'
import { Section } from './ui/Section'
import { Tag } from './ui/Tag'

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="The stack I reach for">
      <div className="skill-grid">
        {portfolio.skills.map((group) => (
          <article key={group.category} className="glass skill-card">
            <h3>{group.category}</h3>
            <div className="tag-row">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
