import { useEffect, useRef } from 'react'
import type { FeatureKey } from '../../constants'
import { FEATURE_MODULES } from '../../data/features'

type ActTimeBackProps = {
  features: Record<FeatureKey, boolean>
  onEnable: (key: FeatureKey, el: HTMLElement) => void
  autoPlay: boolean
  onSequenceComplete: () => void
}

const STAGGER_MS = 850
const START_MS = 500

export function ActTimeBack({
  features,
  onEnable,
  autoPlay,
  onSequenceComplete,
}: ActTimeBackProps) {
  const onEnableRef = useRef(onEnable)
  const onSequenceCompleteRef = useRef(onSequenceComplete)
  onEnableRef.current = onEnable
  onSequenceCompleteRef.current = onSequenceComplete

  useEffect(() => {
    if (!autoPlay) return

    let cancelled = false
    const timers: number[] = []
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const stagger = reduced ? 0 : STAGGER_MS
    const start = reduced ? 0 : START_MS

    const schedule = (fn: () => void, ms: number) => {
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) fn()
        }, ms),
      )
    }

    let delay = start
    FEATURE_MODULES.forEach((f) => {
      schedule(() => {
        const el = document.querySelector(`[data-feature="${f.key}"]`)
        if (el) onEnableRef.current(f.key, el as HTMLElement)
      }, delay)
      delay += stagger
    })

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [autoPlay])

  const allOn = FEATURE_MODULES.every((f) => features[f.key])
  const completedRef = useRef(false)

  useEffect(() => {
    if (!allOn || completedRef.current) return
    completedRef.current = true
    onSequenceCompleteRef.current()
  }, [allOn])

  return (
    <div className="act act-timeback">
      <h1 className="act-headline">
        See how EzRecruit is <span className="hl">saving time.</span>
      </h1>

      <div className="feature-grid">
        {FEATURE_MODULES.map((mod) => {
          const on = features[mod.key]
          return (
            <div
              key={mod.key}
              className={`feature-card${on ? ' on' : ''}`}
              data-feature={mod.key}
            >
              <div className="fc-header">
                <div className="fc-title-row">
                  <span className="fc-name">{mod.name}</span>
                  <span className={`fc-badge num${on ? ' solid' : ''}`}>
                    +{mod.mins} min/day
                  </span>
                </div>
                <span className="fc-benefit">{mod.benefit}</span>
              </div>

              <ul className="fc-list">
                {mod.items.map((item) => (
                  <li
                    key={item.label}
                    className={`fc-item${item.status === 'soon' ? ' soon' : ''}`}
                  >
                    <span className="fc-check" aria-hidden="true">
                      {item.status === 'soon' ? '–' : '✓'}
                    </span>
                    <span className="fc-item-label">
                      {item.label}
                      {item.status === 'soon' && (
                        <span className="fc-soon"> Soon</span>
                      )}
                    </span>
                    {item.sub && (
                      <span className="fc-sub">
                        {item.sub.join(' · ')}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="fc-footer">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={on}
                    readOnly
                    aria-label={`Toggle ${mod.name}`}
                  />
                  <span className="track" />
                  <span className="knob" />
                </label>
                <span className="fc-toggle-label">
                  {on ? 'Module on' : 'Switch on'}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
