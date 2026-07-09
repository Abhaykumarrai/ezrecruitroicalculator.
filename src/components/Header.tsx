import { formatTimeBank } from '../utils/format'

type HeaderProps = {
  mins: number
  bump: boolean
}

export function Header({ mins, bump }: HeaderProps) {
  return (
    <header>
      <div className="header-in">
        <div
          className={`timebank${bump ? ' bump' : ''}`}
          aria-live="polite"
        >
          <span className="tb-label">saved:</span>
          <span className="tb-val num">{formatTimeBank(mins)}</span>
          <span className="tb-suffix">/ day</span>
        </div>
        <div className="header-spacer" aria-hidden="true" />
        <div className="logo">
          <img
            src="https://ezrecruit.in/assets/logo-C4ozb_iM.png"
            alt="EzRecruit"
          />
        </div>
      </div>
    </header>
  )
}
