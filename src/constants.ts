export const REDEPLOY = 0.25
export const COST_PER_USER = 1200
export const FT_HOURS_DAY = 8

export const DEFAULT_STATE = {
  recruiters: 10,
  salary: 40000,
  days: 22,
  fee: 50000,
  hpc: 30,
} as const

export type CalculatorState = {
  recruiters: number
  salary: number
  days: number
  fee: number
  hpc: number
}

export type FeatureKey = 'workflow' | 'tracker' | 'ai' | 'sched'

export const FEATURE_MINS: Record<FeatureKey, number> = {
  workflow: 25,
  tracker: 30,
  ai: 20,
  sched: 15,
}
