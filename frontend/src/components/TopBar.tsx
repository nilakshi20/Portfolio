import { portfolio } from '../data/portfolioData.js'
import { formatPhone, mailtoHref, telHref } from '../utils/links'

export function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__row">
        <p className="topbar__status">
          <span className="topbar__pulse" aria-hidden="true" />
          <span className="topbar__chip">Live</span>
          {portfolio.topbar.status}
        </p>
        <p className="topbar__note">{portfolio.topbar.note}</p>
        <div className="topbar__links">
          <a href={mailtoHref(portfolio.email)}>{portfolio.email}</a>
          <a href={telHref(portfolio.phone)}>{formatPhone(portfolio.phone)}</a>
        </div>
      </div>
    </div>
  )
}
