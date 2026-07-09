import { useEffect, useRef, type RefObject } from 'react'
import type { CalculatorState } from '../../constants'
import type { SetupSubStep } from '../../types/journey'
import { fmtINR } from '../../utils/format'
import { RangeSlider } from '../RangeSlider'

type SetupStepProps = {
  state: CalculatorState
  subStep: SetupSubStep
  onChange: (key: keyof CalculatorState, value: number) => void
  onSubStepAdvance: () => void
  fieldRefs: {
    recruiters: RefObject<HTMLDivElement | null>
    salary: RefObject<HTMLDivElement | null>
    days: RefObject<HTMLDivElement | null>
    continue: RefObject<HTMLButtonElement | null>
  }
}

const AUTO_ADVANCE_MS = 1100
const AUTO_ANIM_MS = 750
const DAYS_ADVANCE_MS = 700

const AUTO_ANIM: Record<
  'recruiters' | 'salary',
  {
    key: keyof CalculatorState
    min: number
    max: number
    step: number
    getTarget: (state: CalculatorState) => number
  }
> = {
  recruiters: {
    key: 'recruiters',
    min: 1,
    max: 200,
    step: 1,
    getTarget: (s) => s.recruiters,
  },
  salary: {
    key: 'salary',
    min: 15000,
    max: 200000,
    step: 5000,
    getTarget: (s) => s.salary,
  },
}

function snapToStep(value: number, min: number, step: number) {
  return Math.round((value - min) / step) * step + min
}

export function SetupStep({
  state,
  subStep,
  onChange,
  onSubStepAdvance,
  fieldRefs,
}: SetupStepProps) {
  const interacted = useRef(false)
  const animRef = useRef(0)

  useEffect(() => {
    interacted.current = false

    if (subStep === 'recruiters' || subStep === 'salary') {
      const cfg = AUTO_ANIM[subStep]
      const target = cfg.getTarget(state)
      const t0 = performance.now()

      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / AUTO_ANIM_MS)
        const eased = 1 - Math.pow(1 - p, 3)
        const raw = cfg.min + (target - cfg.min) * eased
        const snapped = snapToStep(raw, cfg.min, cfg.step)
        onChange(cfg.key, Math.min(cfg.max, Math.max(cfg.min, snapped)))
        if (p < 1) animRef.current = requestAnimationFrame(tick)
      }

      animRef.current = requestAnimationFrame(tick)
      const timer = setTimeout(onSubStepAdvance, AUTO_ADVANCE_MS)

      return () => {
        cancelAnimationFrame(animRef.current)
        clearTimeout(timer)
      }
    }

    if (subStep === 'days') {
      return
    }
  }, [subStep, onChange, onSubStepAdvance])

  const handleChange = (key: keyof CalculatorState, value: number) => {
    onChange(key, value)
    if (subStep === 'days' && key === 'days') {
      interacted.current = true
      setTimeout(onSubStepAdvance, DAYS_ADVANCE_MS)
    }
  }

  return (
    <div className="journey-page setup-page">
      <div className="wrap page-inner">
        <div className="step-tag">
          <div className="n">1</div>
          <span>Your team</span>
        </div>
        <h2>Size your team</h2>
        <p className="sub">
          {subStep === 'days'
            ? 'More recruiters × more working days = more money left on the table.'
            : 'Every minute saved scales with your team. We\'ll set the basics.'}
        </p>

        <div className="setup-menu-row" aria-label="Agency summary">
          <div
            className={`setup-menu-card${subStep === 'recruiters' ? ' active' : ''}`}
          >
            <span className="setup-menu-icon" aria-hidden="true">
              👥
            </span>
            <div className="setup-menu-copy">
              <span className="setup-menu-label">Recruiters</span>
              <b className="setup-menu-value num">{state.recruiters}</b>
            </div>
          </div>
          <div
            className={`setup-menu-card${subStep === 'salary' ? ' active' : ''}`}
          >
            <span className="setup-menu-icon" aria-hidden="true">
              ₹
            </span>
            <div className="setup-menu-copy">
              <span className="setup-menu-label">Avg cost / month</span>
              <b className="setup-menu-value num">{fmtINR(state.salary)}</b>
            </div>
          </div>
          <div
            className={`setup-menu-card${subStep === 'days' ? ' active' : ''}`}
          >
            <span className="setup-menu-icon" aria-hidden="true">
              📅
            </span>
            <div className="setup-menu-copy">
              <span className="setup-menu-label">Working days</span>
              <b className="setup-menu-value num">{state.days}</b>
            </div>
          </div>
        </div>

        <div className="setup setup-guided card-panel">
          <div
            ref={fieldRefs.recruiters}
            className={`setup-field${subStep === 'recruiters' ? ' active' : ''}${subStep !== 'recruiters' && subStep !== 'continue' ? ' done' : ''}`}
          >
            <RangeSlider
              label="Number of recruiters"
              displayValue={String(state.recruiters)}
              min={1}
              max={200}
              value={state.recruiters}
              minLabel="1"
              maxLabel="200"
              readOnly={subStep !== 'recruiters'}
              onChange={(v) => handleChange('recruiters', v)}
            />
          </div>
          <div
            ref={fieldRefs.salary}
            className={`setup-field${subStep === 'salary' ? ' active' : ''}${subStep === 'days' || subStep === 'continue' ? ' done' : ''}`}
          >
            <RangeSlider
              label="Avg recruiter cost / month"
              displayValue={fmtINR(state.salary)}
              min={15000}
              max={200000}
              step={5000}
              value={state.salary}
              minLabel="₹15,000"
              maxLabel="₹2,00,000"
              readOnly={subStep !== 'salary'}
              onChange={(v) => handleChange('salary', v)}
            />
          </div>
          <div
            ref={fieldRefs.days}
            className={`setup-field${subStep === 'days' ? ' active active-input' : ''}${subStep === 'continue' ? ' done' : ''}`}
          >
            <RangeSlider
              label="Working days / month"
              displayValue={String(state.days)}
              min={18}
              max={26}
              value={state.days}
              minLabel="18"
              maxLabel="26"
              readOnly={subStep !== 'days'}
              onChange={(v) => handleChange('days', v)}
            />
          </div>
        </div>

        <div className="setup-actions">
          <button
            ref={fieldRefs.continue}
            className={`btn${subStep === 'continue' ? ' btn-pulse' : ''}`}
            type="button"
            onClick={onSubStepAdvance}
            style={{ visibility: subStep === 'continue' ? 'visible' : 'hidden' }}
          >
            Start the feature tour →
          </button>
        </div>
      </div>
    </div>
  )
}
