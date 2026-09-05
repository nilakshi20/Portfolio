import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

type SectionProps = {
  id: string
  eyebrow: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionProps) {
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <section
      id={id}
      ref={ref}
      className={['section', visible ? 'is-visible' : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="container">
        <header className="section__header">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section__title">{title}</h2>
          {description ? (
            <p className="section__description">{description}</p>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  )
}
