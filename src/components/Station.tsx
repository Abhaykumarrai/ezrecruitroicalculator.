import type { ReactNode } from 'react'

type StationProps = {
  id: string
  mins: number
  on: boolean
  chip: string
  title: string
  description: string
  offLabel: string
  painPoints: string[]
  visual: ReactNode
  onToggle: (on: boolean) => void
}

export function Station({
  id,
  mins,
  on,
  chip,
  title,
  description,
  offLabel,
  painPoints,
  visual,
  onToggle,
}: StationProps) {
  return (
    <div className={`station${on ? ' on' : ''}`} id={id} data-mins={mins}>
      <div className="visual">{visual}</div>
      <div className="content">
        <span className="feat-chip">{chip}</span>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="toggle-row">
          <label className="switch">
            <input
              type="checkbox"
              className="feat-toggle"
              checked={on}
              aria-label={offLabel}
              onChange={(e) => onToggle(e.target.checked)}
            />
            <span className="track" />
            <span className="knob" />
          </label>
          <span className="toggle-label">
            {on ? 'EzRecruit is on ✓' : offLabel}
          </span>
          <span className="saved-pill num">+{mins} min / day</span>
        </div>
        <ul className="pain-list">
          {painPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
