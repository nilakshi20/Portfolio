import { useEffect } from 'react'
import {
  navigateToSection,
  sectionIdFromPath,
  sectionPath,
  scrollToSection,
} from '../utils/sectionRoutes'

/** Keeps clean paths like /projects in sync with on-page sections (no #hash). */
export function useSectionRouting(sectionIds: string[]) {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '')
    if (hash && sectionIds.includes(hash)) {
      navigateToSection(hash, { replace: true, behavior: 'auto' })
    } else {
      const fromPath = sectionIdFromPath(window.location.pathname, sectionIds)
      if (fromPath && fromPath !== 'home') {
        // Wait a tick so layout/fonts settle before jumping.
        requestAnimationFrame(() => {
          scrollToSection(fromPath, 'auto')
        })
      } else if (fromPath === 'home' && window.location.pathname !== '/') {
        window.history.replaceState({ section: 'home' }, '', '/')
      }
    }

    const onPopState = () => {
      const id = sectionIdFromPath(window.location.pathname, sectionIds) ?? 'home'
      scrollToSection(id, 'smooth')
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [sectionIds])
}

export function syncPathToSection(activeId: string) {
  if (!activeId) return
  const path = sectionPath(activeId)
  if (window.location.pathname === path) return
  window.history.replaceState({ section: activeId }, '', path)
}
