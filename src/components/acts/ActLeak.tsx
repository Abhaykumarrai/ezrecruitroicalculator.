import { LEAK_CHIPS } from '../../data/features'
import { LeakingClock } from '../LeakingClock'

type ActLeakProps = {
  onStart: () => void
}

export function ActLeak({ onStart }: ActLeakProps) {
  return (
    <div className="act act-leak">
      <img
        className="act-logo"
        src="https://ezrecruit.in/assets/logo-C4ozb_iM.png"
        alt="EzRecruit"
        width={160}
        height={40}
      />
      <span className="act-pill">Time → Money Story</span>
      <h1 className="act-headline">
        Your recruiters lose hours every day.{' '}
        <span className="hl">How EzRecruit turns them into savings.</span>
      </h1>

      <div className="leak-stage">
        <LeakingClock />
        <div className="leak-chips">
          {LEAK_CHIPS.map((chip) => (
            <div key={chip.label} className="leak-chip" tabIndex={0}>
              <span className="leak-chip-label">{chip.label}</span>
              <span className="leak-chip-tip">~{chip.mins} min/day</span>
            </div>
          ))}
        </div>
      </div>

      <button className="btn btn-primary" type="button" onClick={onStart}>
        Start calculating →
      </button>
    </div>
  )
}
