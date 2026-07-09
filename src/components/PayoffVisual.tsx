import { useCallback, type CSSProperties } from 'react'
import type { FeatureKey } from '../constants'
import { FEATURE_MODULES } from '../data/features'
import { useCountTo } from '../hooks/useCountTo'
import { fmtINR } from '../utils/format'

const MAX_MINS = 90

type PayoffVisualProps = {
  features: Record<FeatureKey, boolean>
  mins: number
  hrsYear: number
  fte: number
  grossSaved: number
  ezCost: number
  net: number
  step: number
}

export function PayoffVisual({
  features,
  mins,
  hrsYear,
  fte,
  grossSaved,
  ezCost,
  net,
  step,
}: PayoffVisualProps) {
  const fmtNet = useCallback((v: number) => fmtINR(Math.round(v)), [])
  const netDisplay = useCountTo(step >= 6 ? net : 0, fmtNet)

  const enabledModules = FEATURE_MODULES.filter((m) => features[m.key])

  const timePct = Math.min(100, (mins / MAX_MINS) * 100)
  const maxHrs = 3960
  const hrsPct = Math.min(100, (hrsYear / maxHrs) * 100)
  const maxVal = Math.max(grossSaved, 1)
  const grossPct = 100
  const costPct = Math.min(100, (ezCost / maxVal) * 100)
  const netPct = Math.min(100, (net / maxVal) * 100)
  const fteFull = Math.floor(fte)
  const ftePart = fte - fteFull

  return (
    <div className="payoff-board">
      {enabledModules.length > 0 && (
        <div className="payoff-modules">
          {enabledModules.map((mod) => (
            <span key={mod.key} className="payoff-module-chip">
              {mod.name} · +{mod.mins} min
            </span>
          ))}
        </div>
      )}

      <div className="payoff-story">
        <div className={`pv-step${step >= 1 ? ' show' : ''}`}>
          <div className="pv-icon pv-icon-time">
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="rgba(20,20,20,0.1)"
                strokeWidth="4"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="var(--amber)"
                strokeWidth="4"
                strokeDasharray={`${(timePct / 100) * 126} 126`}
                strokeLinecap="round"
                transform="rotate(-90 24 24)"
              />
              <text x="24" y="28" textAnchor="middle" className="pv-ring-text">
                {mins}
              </text>
            </svg>
          </div>
          <div className="pv-copy">
            <span className="pv-label">Per recruiter / day</span>
            <span className="pv-value num">{mins} min saved</span>
          </div>
        </div>

        <div className={`pv-connector${step >= 2 ? ' show' : ''}`} aria-hidden="true" />

        <div className={`pv-step${step >= 2 ? ' show' : ''}`}>
          <div className="pv-icon pv-icon-bars">
            <div className="pv-bar-chart">
              {[0.35, 0.55, 0.75, 1].map((h, i) => (
                <span
                  key={i}
                  className="pv-bar"
                  style={{
                    height: `${h * hrsPct}%`,
                    animationDelay: `${i * 80}ms`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="pv-copy">
            <span className="pv-label">Scaled across your team</span>
            <span className="pv-value num">
              {Math.round(hrsYear).toLocaleString('en-IN')} hrs / year
            </span>
          </div>
        </div>

        <div className={`pv-connector${step >= 3 ? ' show' : ''}`} aria-hidden="true" />

        <div className={`pv-step${step >= 3 ? ' show' : ''}`}>
          <div className="pv-icon pv-icon-fte">
            <div className="pv-people">
              {Array.from({ length: Math.min(fteFull + 1, 4) }).map((_, i) => (
                <span
                  key={i}
                  className={`pv-person${i < fteFull ? ' full' : ftePart > 0 ? ' partial' : ''}`}
                  style={
                    i === fteFull && ftePart > 0
                      ? ({ '--fill': `${ftePart * 100}%` } as CSSProperties)
                      : undefined
                  }
                >
                  👤
                </span>
              ))}
            </div>
          </div>
          <div className="pv-copy">
            <span className="pv-label">Bandwidth unlocked</span>
            <span className="pv-value num">{fte.toFixed(1)} FTE</span>
          </div>
        </div>
      </div>

      <div className={`payoff-chart${step >= 4 ? ' show' : ''}`}>
        <span className="chart-title">Time → Money breakdown</span>

        <div className={`chart-row${step >= 4 ? ' show' : ''}`}>
          <span className="chart-label">Value of saved time</span>
          <div className="chart-track">
            <div
              className="chart-fill chart-fill-gross"
              style={{ width: `${step >= 4 ? grossPct : 0}%` }}
            />
          </div>
          <span className="chart-val num">{fmtINR(grossSaved)}</span>
        </div>

        <div className={`chart-row${step >= 5 ? ' show' : ''}`}>
          <span className="chart-label">EzRecruit cost</span>
          <div className="chart-track">
            <div
              className="chart-fill chart-fill-cost"
              style={{ width: `${step >= 5 ? costPct : 0}%` }}
            />
          </div>
          <span className="chart-val num">− {fmtINR(ezCost)}</span>
        </div>

        <div className={`chart-row chart-row-net${step >= 6 ? ' show' : ''}`}>
          <span className="chart-label">Net you saved</span>
          <div className="chart-track">
            <div
              className="chart-fill chart-fill-net"
              style={{ width: `${step >= 6 ? netPct : 0}%` }}
            />
          </div>
          <span className="chart-val chart-val-net num">{netDisplay}</span>
        </div>

        <div className={`chart-waterfall${step >= 6 ? ' show' : ''}`} aria-hidden="true">
          <div className="wf-col">
            <div className="wf-bar wf-gross" style={{ height: '100%' }} />
            <span>Gross</span>
          </div>
          <div className="wf-col">
            <div
              className="wf-bar wf-cost"
              style={{ height: `${costPct}%` }}
            />
            <span>Cost</span>
          </div>
          <div className="wf-col">
            <div
              className="wf-bar wf-net"
              style={{ height: `${netPct}%` }}
            />
            <span>Net</span>
          </div>
        </div>
      </div>
    </div>
  )
}
