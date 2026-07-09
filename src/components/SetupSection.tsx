import type { CalculatorState } from '../constants'
import { fmtINR } from '../utils/format'
import { RangeSlider } from './RangeSlider'

type SetupSectionProps = {
  state: CalculatorState
  onChange: (key: keyof CalculatorState, value: number) => void
}

export function SetupSection({ state, onChange }: SetupSectionProps) {
  return (
    <section id="setup" className="wrap">
      <div className="step-tag">
        <div className="n">1</div>
        <span>Your team</span>
      </div>
      <h2>Tell us about your agency</h2>
      <p className="sub">
        Three quick inputs. Everything you see next is calculated live for{' '}
        <b>your</b> team.
      </p>
      <div className="setup">
        <RangeSlider
          label="Number of recruiters"
          displayValue={String(state.recruiters)}
          min={1}
          max={200}
          value={state.recruiters}
          minLabel="1"
          maxLabel="200"
          onChange={(v) => onChange('recruiters', v)}
        />
        <RangeSlider
          label="Avg recruiter cost / month"
          displayValue={fmtINR(state.salary)}
          min={15000}
          max={200000}
          step={5000}
          value={state.salary}
          minLabel="₹15,000"
          maxLabel="₹2,00,000"
          onChange={(v) => onChange('salary', v)}
        />
        <RangeSlider
          label="Working days / month"
          displayValue={String(state.days)}
          min={18}
          max={26}
          value={state.days}
          minLabel="18"
          maxLabel="26"
          onChange={(v) => onChange('days', v)}
        />
      </div>
    </section>
  )
}
