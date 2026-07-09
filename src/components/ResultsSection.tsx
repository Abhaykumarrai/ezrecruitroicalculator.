import { useCallback } from 'react'
import type { CalculatorState } from '../constants'
import { useCountTo } from '../hooks/useCountTo'
import { fmtINR } from '../utils/format'
import { RangeSlider } from './RangeSlider'

type ResultsSectionProps = {
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
}

export function ResultsSection({
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
}: ResultsSectionProps) {
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
    <section className="wrap" id="results">
      <div className="step-tag">
        <div className="n">3</div>
        <span>The payoff</span>
      </div>
      <h2>Now, the simple math</h2>
      <p className="sub">
        Minutes per recruiter turn into hours per year, and hours turn into
        money. Every number below updates with your inputs and the features you
        switched on.
      </p>

      <div className="reveal">
        <span className="eyebrow">With EzRecruit your team saves</span>
        <div style={{ marginTop: 14 }}>
          <span className="bignum num">{hoursDisplay}</span>
          <small className="bignum" style={{ fontFamily: 'Inter' }}>
            <small>working hours every year</small>
          </small>
        </div>
        <div className="fte num">
          That&apos;s the yearly bandwidth of{' '}
          <b>{fte.toFixed(1)} full-time employees</b> — without hiring anyone.
        </div>

        <div className="receipt" aria-label="Savings calculation">
          <div className="rline">
            <span className="lbl">
              Time saved per recruiter per day
              <small>from the features you switched on</small>
            </span>
            <span className="val num">{mins} min</span>
          </div>
          <div className="rline">
            <span className="lbl">
              × Recruiters × working days × 12 months
              <small>
                {state.recruiters} recruiters × {state.days} days × 12
              </small>
            </span>
            <span className="val num">
              {Math.round(hrsYear).toLocaleString('en-IN')} hrs / year
            </span>
          </div>
          <div className="rline">
            <span className="lbl">
              Value of that time
              <small>at your average recruiter cost</small>
            </span>
            <span className="val num">{savedDisplay}</span>
          </div>
          <div className="rline">
            <span className="lbl">
              Cost of EzRecruit
              <small>₹1,200 per recruiter per month</small>
            </span>
            <span className="val num cost">− {fmtINR(ezCost)}</span>
          </div>
          <div className="rline total">
            <span className="lbl">Net you saved</span>
            <span className="val num">{netDisplay}</span>
          </div>
        </div>

        <div className="rev-grid">
          <div className="rev-inputs">
            <div
              style={{
                fontFamily: 'Bricolage Grotesque',
                fontWeight: 700,
                fontSize: 18,
                marginBottom: 6,
              }}
            >
              And if that time goes into closing?
            </div>
            <p
              style={{
                fontSize: 13,
                color: '#8FBFB3',
                marginBottom: 20,
              }}
            >
              Saved hours aren&apos;t just cost saved — they&apos;re recruiter
              hours you can redeploy into new positions.
            </p>
            <RangeSlider
              label="Avg revenue per closure"
              displayValue={fmtINR(state.fee)}
              min={10000}
              max={300000}
              step={5000}
              value={state.fee}
              minLabel="₹10,000"
              maxLabel="₹3,00,000"
              variant="reveal"
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
              variant="reveal"
              onChange={(v) => onChange('hpc', v)}
            />
          </div>
          <div className="rev-out">
            <span className="k num">
              Redeploying even 25% of saved time ={' '}
              <b style={{ color: 'var(--mint)' }}>
                {closures.toLocaleString('en-IN')} extra closures / year
              </b>
            </span>
            <span className="v num">{revDisplay}</span>
            <span className="k">in potential additional revenue every year</span>
            <span className="note">
              A conservative estimate — we assume only a quarter of the saved
              time converts into net-new closure work.
            </span>
          </div>
        </div>

        <div className="cta-row">
          <a className="btn light" href="#" onClick={(e) => e.preventDefault()}>
            Get started with EzRecruit →
          </a>
          <button className="btn outline" type="button" onClick={onShare}>
            Share on WhatsApp
          </button>
        </div>
      </div>
    </section>
  )
}
