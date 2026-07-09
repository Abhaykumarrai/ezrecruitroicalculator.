import { useEffect, useRef, useState } from 'react'
import { FEATURE_MINS } from '../../constants'
import type { StationData } from '../../data/stations'

type FeatureStepProps = {
  station: StationData
  stationIndex: number
  totalStations: number
  enabled: boolean
  onEnable: () => void
  onComplete: () => void
  toggleRef: React.RefObject<HTMLLabelElement | null>
}

export function FeatureStep({
  station,
  stationIndex,
  totalStations,
  enabled,
  onEnable,
  onComplete,
  toggleRef,
}: FeatureStepProps) {
  const { Visual } = station
  const mins = FEATURE_MINS[station.key]
  const [showUnlock, setShowUnlock] = useState(false)
  const [phase, setPhase] = useState<'intro' | 'toggle' | 'done'>('intro')
  const completed = useRef(false)

  useEffect(() => {
    completed.current = false
    setPhase('intro')
    setShowUnlock(false)

    const introTimer = setTimeout(() => setPhase('toggle'), 900)
    return () => clearTimeout(introTimer)
  }, [station.key])

  useEffect(() => {
    if (phase !== 'toggle' || enabled) return

    const clickTimer = setTimeout(() => {
      onEnable()
      setShowUnlock(true)
      setPhase('done')
    }, 1100)

    return () => clearTimeout(clickTimer)
  }, [phase, enabled, onEnable])

  useEffect(() => {
    if (phase !== 'done' || completed.current) return

    const nextTimer = setTimeout(() => {
      completed.current = true
      onComplete()
    }, 1500)

    return () => clearTimeout(nextTimer)
  }, [phase, onComplete])

  return (
    <div className="journey-page feature-page">
      <div className="wrap page-inner">
        <div className="step-tag">
          <div className="n">{stationIndex + 2}</div>
          <span>
            Feature {stationIndex + 1} of {totalStations}
          </span>
        </div>
        <h2>Win back minutes</h2>
        <p className="sub">
          Turn on each feature — every minute saved is money your team can place, bill, or grow with.
        </p>

        <div className={`station station-solo card-panel${enabled ? ' on' : ''}`}>
          <div className="visual">
            <Visual />
          </div>
          <div className="content">
            <span className="feat-chip">{station.chip}</span>
            <h3>{station.title}</h3>
            <p>{station.description}</p>
            <div className="toggle-row">
              <label ref={toggleRef} className="switch">
                <input
                  type="checkbox"
                  className="feat-toggle"
                  checked={enabled}
                  readOnly
                  aria-label={station.offLabel}
                />
                <span className="track" />
                <span className="knob" />
              </label>
              <span className="toggle-label">
                {enabled ? 'EzRecruit is on ✓' : station.offLabel}
              </span>
              <span className={`saved-pill num${enabled ? ' unlocked' : ''}`}>
                +{mins} min / day
              </span>
            </div>
            <ul className="pain-list">
              {station.painPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>

        {showUnlock && (
          <div className="unlock-toast" key={station.key}>
            <span className="unlock-icon">⚡</span>
            <span className="unlock-text">
              +{mins} min back — that&apos;s money in the bank
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
