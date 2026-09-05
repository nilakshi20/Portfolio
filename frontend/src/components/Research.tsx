import { portfolio } from '../data/portfolioData.js'
import { OptionalLink } from './ui/OptionalLink'
import { Section } from './ui/Section'
import { Tag } from './ui/Tag'

export function Research() {
  return (
    <Section
      id="research"
      eyebrow="Research"
      title="Published work"
    >
      <div className="research-list">
        {portfolio.research.map((paper) => (
          <article key={paper.title} className="glass research-card">
            <p className="research-card__venue">
              {paper.venue}
              {paper.publisher ? ` · ${paper.publisher}` : ''}
            </p>
            <h3>{paper.title}</h3>
            <p>{paper.summary}</p>
            <div className="tag-row">
              {paper.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <OptionalLink href={paper.url}>Read publication</OptionalLink>
          </article>
        ))}
      </div>
    </Section>
  )
}
