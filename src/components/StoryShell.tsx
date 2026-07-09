import { useRef, type ReactNode } from 'react'
import { useCountTo } from '../hooks/useCountTo'
import { ACT_LABELS, ACTS, type Act } from '../types/storyboard'
import { fmtINR, formatTimeBank } from '../utils/format'

type StoryShellProps = {
  act: Act
  direction: 'forward' | 'back'
  mins: number
  grossSaved: number
  bump?: boolean
  onActClick: (act: Act) => void
  onBack: () => void
  onNext: () => void
  canBack: boolean
  canNext: boolean
  children: ReactNode
}

export function StoryShell({
  act,
  direction,
  mins,
  grossSaved,
  bump,
  onActClick,
  onBack,
  onNext,
  canBack,
  canNext,
  children,
}: StoryShellProps) {
  const timeRef = useRef<HTMLDivElement>(null)
  const timeDisplay = useCountTo(mins, (v) => formatTimeBank(Math.round(v)))
  const worthDisplay = useCountTo(grossSaved, fmtINR)

  return (
    <div className="storyboard">
      <aside className="sb-sidebar">
        <div className="sb-scores">
          <div
            ref={timeRef}
            id="time-saved-pill"
            className={`sb-score-box sb-score-time${bump ? ' bump' : ''}`}
            aria-live="polite"
          >
            <span className="sb-score-label">Time saved</span>
            <span className="sb-score-value num">{timeDisplay}</span>
            <span className="sb-score-unit">/ recruiter / day</span>
          </div>
          <span className="sb-score-arrow" aria-hidden="true">↓</span>
          <div
            className={`sb-score-box sb-score-worth${bump ? ' bump' : ''}`}
            aria-live="polite"
          >
            <span className="sb-score-label">Worth</span>
            <span className="sb-score-value num">{worthDisplay}</span>
            <span className="sb-score-unit">/ year</span>
          </div>
        </div>

        <div className="sb-rail-wrap">
          <span className="sb-rail-title">Story acts</span>
          <nav className="sb-rail" aria-label="Story acts">
            {ACTS.map((a) => (
              <button
                key={a}
                type="button"
                className={`sb-step${a === act ? ' active' : ''}${a < act ? ' done' : ''}`}
                onClick={() => onActClick(a)}
                aria-current={a === act ? 'step' : undefined}
              >
                <span className="sb-step-marker">
                  <span className="sb-step-dot" />
                  <span className="sb-step-line" />
                </span>
                <span className="sb-step-copy">
                  <span className="sb-step-num num">0{a}</span>
                  <span className="sb-step-label">{ACT_LABELS[a]}</span>
                </span>
              </button>
            ))}
          </nav>
        </div>

        {(canBack || act !== 1) && (
          <div className="sb-sidebar-nav">
            {canBack && (
              <button
                className="sb-nav-btn"
                type="button"
                onClick={onBack}
                aria-label="Previous act"
              >
                ← Back
              </button>
            )}
            {act !== 1 && (
              <button
                className="sb-nav-btn sb-nav-btn-primary"
                type="button"
                onClick={onNext}
                disabled={!canNext}
                aria-label="Next act"
              >
                Next →
              </button>
            )}
          </div>
        )}
      </aside>

      <div className="sb-main">
        <div className="sb-stage">
          <div className={`sb-slide sb-slide-${direction}`} key={act}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export function getTimePillRect(): DOMRect | null {
  const el = document.getElementById('time-saved-pill')
  return el?.getBoundingClientRect() ?? null
}
