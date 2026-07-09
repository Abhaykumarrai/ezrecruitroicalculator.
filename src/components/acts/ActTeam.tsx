import type { CalculatorState } from '../../constants'
import { fmtINR } from '../../utils/format'
import { RangeSlider } from '../RangeSlider'

type ActTeamProps = {
  state: CalculatorState
  onChange: (key: keyof CalculatorState, value: number) => void
}

export function ActTeam({ state, onChange }: ActTeamProps) {
  return (
    <div className="act act-team">
      <h1 className="act-headline">First, tell us about your agency.</h1>

      <div className="team-cards">
        <div className="team-card">
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
        </div>
        <div className="team-card">
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
        </div>
        <div className="team-card">
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
      </div>
    </div>
  )
}
