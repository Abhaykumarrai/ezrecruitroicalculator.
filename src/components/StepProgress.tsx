import { stepIndex, JOURNEY_STEPS, type JourneyStep } from '../types/journey'

type StepProgressProps = {
  current: JourneyStep
  hidden?: boolean
}

export function StepProgress({ current, hidden }: StepProgressProps) {
  if (hidden || current === 'welcome') return null

  const idx = stepIndex(current)
  const total = JOURNEY_STEPS.length - 1
  const pct = (idx / total) * 100

  return (
    <div className="step-progress">
      <div className="step-progress-track">
        <div className="step-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="step-progress-label num">
        Step {idx} of {total}
      </div>
    </div>
  )
}
