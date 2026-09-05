const HOME_ALIASES = new Set(['', '/', '/home'])

export function sectionPath(id: string) {
  return id === 'home' ? '/' : `/${id}`
}

export function sectionIdFromPath(pathname: string, knownIds: string[]) {
  const clean = pathname.replace(/\/+$/, '') || '/'
  if (HOME_ALIASES.has(clean)) return 'home'

  const id = clean.startsWith('/') ? clean.slice(1) : clean
  return knownIds.includes(id) ? id : null
}

export function scrollToSection(
  id: string,
  behavior: ScrollBehavior = 'smooth',
) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior, block: 'start' })
}

export function navigateToSection(
  id: string,
  options?: { replace?: boolean; behavior?: ScrollBehavior },
) {
  const path = sectionPath(id)
  const method = options?.replace ? 'replaceState' : 'pushState'
  window.history[method]({ section: id }, '', path)
  scrollToSection(id, options?.behavior ?? 'smooth')
}

export function onSectionLinkClick(
  event: { preventDefault: () => void },
  id: string,
) {
  event.preventDefault()
  navigateToSection(id)
}
