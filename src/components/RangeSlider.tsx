import { useMemo, type CSSProperties } from 'react'

type RangeSliderProps = {
  label: string
  displayValue: string
  min: number
  max: number
  step?: number
  value: number
  minLabel: string
  maxLabel: string
  variant?: 'default' | 'reveal'
  readOnly?: boolean
  onChange: (value: number) => void
}

export function RangeSlider({
  label,
  displayValue,
  min,
  max,
  step = 1,
  value,
  minLabel,
  maxLabel,
  variant = 'default',
  readOnly = false,
  onChange,
}: RangeSliderProps) {
  const fillPct = useMemo(
    () => ((value - min) / (max - min)) * 100,
    [value, min, max],
  )

  return (
    <div className={`field${variant === 'reveal' ? ' field-reveal' : ''}`}>
      <label>
        {label} <b className="num">{displayValue}</b>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        readOnly={readOnly}
        tabIndex={readOnly ? -1 : 0}
        className={readOnly ? 'range-readonly' : undefined}
        style={{ '--fill': `${fillPct}%` } as CSSProperties}
        onChange={(e) => !readOnly && onChange(+e.target.value)}
      />
      <div className="range-ends">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  )
}
