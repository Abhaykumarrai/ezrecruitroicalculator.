export type JourneyStep =
  | 'welcome'
  | 'setup'
  | 'feature-workflow'
  | 'feature-tracker'
  | 'feature-ai'
  | 'feature-sched'
  | 'results'

export type SetupSubStep = 'recruiters' | 'salary' | 'days' | 'continue'

export const JOURNEY_STEPS: JourneyStep[] = [
  'welcome',
  'setup',
  'feature-workflow',
  'feature-tracker',
  'feature-ai',
  'feature-sched',
  'results',
]

export const STEP_LABELS: Record<JourneyStep, string> = {
  welcome: 'Welcome',
  setup: 'Your team',
  'feature-workflow': 'Workflow',
  'feature-tracker': 'Tracker',
  'feature-ai': 'AI Search',
  'feature-sched': 'Scheduler',
  results: 'Your savings',
}

export function featureStepKey(
  step: JourneyStep,
): 'workflow' | 'tracker' | 'ai' | 'sched' | null {
  if (step === 'feature-workflow') return 'workflow'
  if (step === 'feature-tracker') return 'tracker'
  if (step === 'feature-ai') return 'ai'
  if (step === 'feature-sched') return 'sched'
  return null
}

export function stepIndex(step: JourneyStep) {
  return JOURNEY_STEPS.indexOf(step)
}
