import type { CSSProperties } from 'react'
import { portfolio } from '../data/portfolioData.js'
import { useReveal } from '../hooks/useReveal'
import { SkillIcon } from './ui/SkillIcon'

const SKILL_ICON_IDS: Record<string, string> = {
  LLM: 'llm',
  RAG: 'rag',
  LangChain: 'langchain',
  LangGraph: 'langgraph',
  'AI Agents': 'agents',
  'Tool Calling': 'tools',
  MCP: 'mcp',
  'Prompt Engineering': 'prompt',
  Python: 'python',
  FastAPI: 'fastapi',
  'REST APIs': 'rest',
  Postman: 'postman',
  'React.js': 'react',
  JavaScript: 'javascript',
  HTML: 'html',
  CSS: 'css',
  PostgreSQL: 'postgres',
  MongoDB: 'mongodb',
  MySQL: 'mysql',
  Redis: 'redis',
  MinIO: 'minio',
  FAISS: 'faiss',
  Pinecone: 'pinecone',
  OpenSearch: 'opensearch',
  AWS: 'aws',
  EC2: 'ec2',
  ECS: 'ecs',
  VPC: 'vpc',
  ALB: 'alb',
  Docker: 'docker',
  NumPy: 'numpy',
  Pandas: 'pandas',
  Matplotlib: 'matplotlib',
  'Scikit-learn': 'sklearn',
  Git: 'git',
  GitHub: 'github',
  Bitbucket: 'bitbucket',
  'VS Code': 'vscode',
  Jupyter: 'jupyter',
}

function skillIconId(label: string) {
  return SKILL_ICON_IDS[label] ?? 'default'
}

export function Skills() {
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <section
      id="skills"
      ref={ref}
      className={`section skills-section${visible ? ' is-visible' : ''}`}
    >
      <div className="container skills-showcase">
        <header className="skills-showcase__header">
          <h2 className="skills-showcase__title">{portfolio.skillsTitle}</h2>
          <p className="skills-showcase__subtitle">{portfolio.skillsSubtitle}</p>
        </header>

        <div className="skills-groups">
          {portfolio.skills.map((group, groupIndex) => (
            <section
              key={group.category}
              className={`skills-group${group.featured ? ' skills-group--featured' : ''}`}
              style={
                {
                  animationDelay: `${groupIndex * 90}ms`,
                  ['--group-delay' as string]: `${groupIndex * 90}ms`,
                } as CSSProperties
              }
            >
              <h3 className="skills-group__title">{group.category}</h3>
              <ul className="skills-showcase__row skills-showcase__row--group">
                {group.items.map((item, index) => {
                  const delayMs = groupIndex * 90 + index * 45
                  return (
                    <li
                      key={`${group.category}-${item}`}
                      className={`skills-showcase__item${
                        item === 'Postman' ? ' skills-showcase__item--accent' : ''
                      }`}
                      style={
                        {
                          animationDelay: `${delayMs}ms`,
                          ['--skill-delay' as string]: `${delayMs}ms`,
                        } as CSSProperties
                      }
                    >
                      <span className="skills-showcase__icon">
                        <SkillIcon id={skillIconId(item)} />
                      </span>
                      <span className="skills-showcase__label">{item}</span>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
