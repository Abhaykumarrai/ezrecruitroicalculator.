import { useEffect, useState } from 'react'
import type { FeatureKey } from '../../constants'
import { PayoffVisual } from '../PayoffVisual'

type ActPayoffProps = {
  features: Record<FeatureKey, boolean>
  mins: number
  hrsYear: number
  fte: number
  grossSaved: number
  ezCost: number
  net: number
}

const STEPS = 6

export function ActPayoff({
  features,
  mins,
  hrsYear,
  fte,
  grossSaved,
  ezCost,
  net,
}: ActPayoffProps) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    setStep(0)
    const timers: number[] = []
    for (let i = 1; i <= STEPS; i++) {
      timers.push(window.setTimeout(() => setStep(i), i * 180))
    }
    return () => timers.forEach(clearTimeout)
  }, [mins, hrsYear, fte, grossSaved, ezCost, net])

  return (
    <div className="act act-payoff">
      <h1 className="act-headline">
        Time is money. <span className="hl">Here&apos;s yours.</span>
      </h1>

      <PayoffVisual
        features={features}
        mins={mins}
        hrsYear={hrsYear}
        fte={fte}
        grossSaved={grossSaved}
        ezCost={ezCost}
        net={net}
        step={step}
      />

      <div className="payoff-ctas">
        <a className="btn btn-primary" href="#" onClick={(e) => e.preventDefault()}>
          Get Started with EzRecruit →
        </a>
      </div>
    </div>
  )
}
