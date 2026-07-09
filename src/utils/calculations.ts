import {
  COST_PER_USER,
  FT_HOURS_DAY,
  REDEPLOY,
  type CalculatorState,
  type FeatureKey,
  FEATURE_MINS,
} from '../constants'

export function activeMins(features: Record<FeatureKey, boolean>) {
  return (Object.keys(FEATURE_MINS) as FeatureKey[]).reduce(
    (sum, key) => sum + (features[key] ? FEATURE_MINS[key] : 0),
    0,
  )
}

export function calculateROI(
  state: CalculatorState,
  mins: number,
) {
  const { recruiters, salary, days, fee, hpc } = state

  const hrsYear = (mins / 60) * days * 12 * recruiters
  const fte = hrsYear / (FT_HOURS_DAY * days * 12)
  const grossSaved = fte * salary * 12
  const ezCost = recruiters * COST_PER_USER * 12
  const net = grossSaved - ezCost
  const closures = Math.floor((hrsYear * REDEPLOY) / hpc)
  const revenue = closures * fee

  return { mins, hrsYear, fte, grossSaved, ezCost, net, closures, revenue }
}
