import { useEffect, useState } from 'react'
import { sectionIdFromPath } from '../utils/sectionRoutes'
import { syncPathToSection } from './useSectionRouting'

export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(
    () => sectionIdFromPath(window.location.pathname, ids) ?? ids[0] ?? '',
  )

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (sections.length === 0) return

    let primed = false
    const primeTimer = window.setTimeout(() => {
      primed = true
    }, 120)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const nextId = visible[0]?.target.id
        if (!nextId) return

        setActiveId(nextId)
        if (primed) {
          syncPathToSection(nextId)
        }
      },
      {
        rootMargin: '-28% 0px -58% 0px',
        threshold: [0.1, 0.25, 0.5],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => {
      window.clearTimeout(primeTimer)
      observer.disconnect()
    }
  }, [ids])

  return activeId
}
