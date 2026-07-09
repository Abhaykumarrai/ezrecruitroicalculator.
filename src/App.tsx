import { useCallback, useMemo, useRef, useState } from 'react'
import {
  DEFAULT_STATE,
  type CalculatorState,
  type FeatureKey,
} from './constants'
import { ActLeak } from './components/acts/ActLeak'
import { ActTeam } from './components/acts/ActTeam'
import { ActTimeBack } from './components/acts/ActTimeBack'
import { ActPayoff } from './components/acts/ActPayoff'
import { StoryShell } from './components/StoryShell'
import { TimeParticles, type ParticleBurst } from './components/TimeParticles'
import { useActNavigation } from './hooks/useActNavigation'
import type { Act } from './types/storyboard'
import { activeMins, calculateROI } from './utils/calculations'

const INITIAL_FEATURES: Record<FeatureKey, boolean> = {
  workflow: false,
  tracker: false,
  ai: false,
  sched: false,
}

export default function App() {
  const [act, setAct] = useState<Act>(1)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [state, setState] = useState<CalculatorState>({ ...DEFAULT_STATE })
  const [features, setFeatures] = useState(INITIAL_FEATURES)
  const [act3SequenceDone, setAct3SequenceDone] = useState(false)
  const [bump, setBump] = useState(false)
  const [bursts, setBursts] = useState<ParticleBurst[]>([])
  const particleId = useRef(0)

  const mins = useMemo(() => activeMins(features), [features])
  const roi = useMemo(() => calculateROI(state, mins), [state, mins])
  const allFeaturesOn = useMemo(
    () => (Object.values(features) as boolean[]).every(Boolean),
    [features],
  )

  const { goNext, goBack, goToAct, canBack } = useActNavigation(
    act,
    setAct,
    setDirection,
  )
  const canNext = act === 3 ? allFeaturesOn : act < 4

  const bumpCounters = useCallback(() => {
    setBump(false)
    requestAnimationFrame(() => setBump(true))
  }, [])

  const spawnParticles = useCallback((fromEl: HTMLElement) => {
    const rect = fromEl.getBoundingClientRect()
    const pill = document.getElementById('time-saved-pill')?.getBoundingClientRect()
    if (!pill) return
    const id = ++particleId.current
    setBursts((prev) => [
      ...prev,
      {
        id,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        targetX: pill.left + pill.width / 2,
        targetY: pill.top + pill.height / 2,
      },
    ])
  }, [])

  const removeBurst = useCallback((id: number) => {
    setBursts((prev) => prev.filter((b) => b.id !== id))
  }, [])

  const updateState = useCallback(
    (key: keyof CalculatorState, value: number) => {
      setState((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  const enableFeature = useCallback(
    (key: FeatureKey, el: HTMLElement) => {
      setFeatures((prev) => {
        if (prev[key]) return prev
        spawnParticles(el)
        bumpCounters()
        return { ...prev, [key]: true }
      })
    },
    [spawnParticles, bumpCounters],
  )

  const completeTimeBackSequence = useCallback(() => {
    setAct3SequenceDone(true)
  }, [])

  const startJourney = useCallback(() => {
    setDirection('forward')
    setAct(2)
  }, [])

  const handleActClick = useCallback(
    (target: Act) => {
      if (target === 4 && !allFeaturesOn) return
      goToAct(target)
    },
    [goToAct, allFeaturesOn],
  )

  return (
    <>
      <StoryShell
        act={act}
        direction={direction}
        mins={roi.mins}
        grossSaved={roi.grossSaved}
        bump={bump}
        onActClick={handleActClick}
        onBack={goBack}
        onNext={goNext}
        canBack={canBack}
        canNext={canNext}
      >
        {act === 1 && <ActLeak onStart={startJourney} />}
        {act === 2 && <ActTeam state={state} onChange={updateState} />}
        {act === 3 && (
          <ActTimeBack
            features={features}
            onEnable={enableFeature}
            autoPlay={!act3SequenceDone}
            onSequenceComplete={completeTimeBackSequence}
          />
        )}
        {act === 4 && (
          <ActPayoff
            features={features}
            mins={roi.mins}
            hrsYear={roi.hrsYear}
            fte={roi.fte}
            grossSaved={roi.grossSaved}
            ezCost={roi.ezCost}
            net={roi.net}
          />
        )}
      </StoryShell>
      <TimeParticles bursts={bursts} onDone={removeBurst} />
    </>
  )
}
