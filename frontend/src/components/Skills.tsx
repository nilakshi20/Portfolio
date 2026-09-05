import { useMemo, useState } from 'react'
import { portfolio } from '../data/portfolioData.js'
import { Section } from './ui/Section'
import { Tag } from './ui/Tag'

const ALL = 'All'

export function Skills() {
  const [active, setActive] = useState(ALL)

  const filters = useMemo(
    () => [ALL, ...portfolio.skills.map((group) => group.category)],
    [],
  )

  const totalSkills = useMemo(
    () => portfolio.skills.reduce((sum, group) => sum + group.items.length, 0),
    [],
  )

  const groups =
    active === ALL
      ? portfolio.skills
      : portfolio.skills.filter((group) => group.category === active)

  return (
    <Section id="skills" eyebrow="Skills" title="The stack I reach for">
      <div className="skills">
        <div className="skills__bar">
          <div className="skills__filters" role="tablist" aria-label="Skill categories">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={active === filter}
                className={`skills__filter${active === filter ? ' is-active' : ''}`}
                onClick={() => setActive(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <p className="skills__count">
            {totalSkills} tools · {portfolio.skills.length} areas
          </p>
        </div>

        <div
          className={`skill-grid${groups.length === 1 ? ' skill-grid--single' : ''}`}
        >
          {groups.map((group) => (
            <article
              key={group.category}
              className={`glass skill-card${group.featured ? ' skill-card--featured' : ''}`}
            >
              <header className="skill-card__head">
                <div>
                  <h3>{group.category}</h3>
                  <p className="skill-card__note">{group.note}</p>
                </div>
                <span className="skill-card__badge">{group.items.length}</span>
              </header>
              <div className="tag-row">
                {group.items.map((item, index) => (
                  <Tag key={item} style={{ animationDelay: `${index * 40}ms` }}>
                    {item}
                  </Tag>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
