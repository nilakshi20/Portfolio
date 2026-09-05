import { isConfiguredUrl } from '../../utils/links'

type OptionalLinkProps = {
  href?: string
  children: string
}

export function OptionalLink({ href, children }: OptionalLinkProps) {
  if (!isConfiguredUrl(href)) return null

  return (
    <a
      className="text-link"
      href={href}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  )
}
