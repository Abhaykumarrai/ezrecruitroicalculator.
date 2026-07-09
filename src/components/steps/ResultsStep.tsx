import { useCallback } from 'react'
import type { CalculatorState } from '../../constants'
import { useCountTo } from '../../hooks/useCountTo'
import { fmtINR } from '../../utils/format'
import { RangeSlider } from '../RangeSlider'

type ResultsStepProps = {
  state: CalculatorState
  mins: number
  hrsYear: number
  fte: number
  grossSaved: number
  ezCost: number
  net: number
  closures: number
  revenue: number
  onChange: (key: keyof CalculatorState, value: number) => void
  onShare: () => void
  onRestart: () => void
}

export function ResultsStep({
  state,
  mins,
  hrsYear,
  fte,
  grossSaved,
  ezCost,
  net,
  closures,
  revenue,
  onChange,
  onShare,
  onRestart,
}: ResultsStepProps) {
  const fmtHours = useCallback(
    (v: number) => Math.round(v).toLocaleString('en-IN'),
    [],
  )
  const fmtCurrency = useCallback((v: number) => fmtINR(v), [])
  const fmtNet = useCallback(
    (v: number) => (v < 0 ? '− ' : '') + fmtINR(Math.abs(v)),
    [],
  )

  const hoursDisplay = useCountTo(hrsYear, fmtHours)
  const savedDisplay = useCountTo(grossSaved, fmtCurrency)
  const netDisplay = useCountTo(net, fmtNet)
  const revDisplay = useCountTo(revenue, fmtCurrency)

  return (
    <div className="journey-page results-page">
      <div className="wrap page-inner">
        <div className="step-tag">
          <div className="n">✓</div>
          <span>The payoff</span>
        </div>
        <h2>Time saved = money earned</h2>
        <p className="sub">
          Those minutes add up. Here&apos;s what EzRecruit is worth for your agency.
        </p>

        <div className="results-light reveal-celebrate">
          <div className="results-story-flow">
            <div className="results-flow-step">
              <span className="flow-icon">⏱</span>
              <span className="flow-label">Time back</span>
              <span className="flow-value num">{mins} min / day</span>
            </div>
            <span className="results-flow-arrow">→</span>
            <div className="results-flow-step">
              <span className="flow-icon">📅</span>
              <span className="flow-label">Per year</span>
              <span className="flow-value num">{hoursDisplay} hrs</span>
            </div>
            <span className="results-flow-arrow">→</span>
            <div className="results-flow-step highlight">
              <span className="flow-icon">₹</span>
              <span className="flow-label">Net saved</span>
              <span className="flow-value num">{netDisplay}</span>
            </div>
          </div>

          <div className="results-hero-card">
            <span className="eyebrow">Your team saves</span>
            <div className="results-hours num">{hoursDisplay} hrs / year</div>
            <p className="results-fte">
              Worth <b>{savedDisplay}</b> — like{' '}
              <b>{fte.toFixed(1)} full-time employees</b> of bandwidth.
            </p>
          </div>

          <div className="results-kpis" aria-label="Savings calculation">
            <div className="kpi-card">
              <span className="kpi-label">Value of saved time</span>
              <span className="kpi-value num">{savedDisplay}</span>
            </div>
            <div className="kpi-card">
              <span className="kpi-label">EzRecruit annual cost</span>
              <span className="kpi-value num">− {fmtINR(ezCost)}</span>
            </div>
          </div>

          <div className="results-revenue">
            <div className="rev-inputs rev-inputs-light">
              <div className="rev-title">Potential revenue uplift</div>
              <RangeSlider
                label="Avg revenue per closure"
                displayValue={fmtINR(state.fee)}
                min={10000}
                max={300000}
                step={5000}
                value={state.fee}
                minLabel="₹10,000"
                maxLabel="₹3,00,000"
                onChange={(v) => onChange('fee', v)}
              />
              <RangeSlider
                label="Recruiter hours per closure"
                displayValue={`${state.hpc} hrs`}
                min={10}
                max={80}
                step={5}
                value={state.hpc}
                minLabel="10"
                maxLabel="80"
                onChange={(v) => onChange('hpc', v)}
              />
            </div>
            <div className="rev-out rev-out-light">
              <span className="k num">
                {closures.toLocaleString('en-IN')} extra closures / year
              </span>
              <span className="v num">{revDisplay}</span>
            </div>
          </div>

          <div className="cta-row cta-row-light">
            <a className="btn" href="#" onClick={(e) => e.preventDefault()}>
              Get started with EzRecruit →
            </a>
            <button className="btn ghost" type="button" onClick={onShare}>
              Share on WhatsApp
            </button>
            <button className="btn ghost" type="button" onClick={onRestart}>
              Replay journey
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
