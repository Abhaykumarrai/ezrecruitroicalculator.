import { useCallback, useEffect } from 'react'
import { ACTS, type Act } from '../types/storyboard'

export function useActNavigation(
  act: Act,
  setAct: (a: Act) => void,
  onDirection?: (dir: 'forward' | 'back') => void,
) {
  const goTo = useCallback(
    (next: Act, dir: 'forward' | 'back') => {
      onDirection?.(dir)
      setAct(next)
    },
    [setAct, onDirection],
  )

  const goNext = useCallback(() => {
    const idx = ACTS.indexOf(act)
    if (idx < ACTS.length - 1) goTo(ACTS[idx + 1], 'forward')
  }, [act, goTo])

  const goBack = useCallback(() => {
    const idx = ACTS.indexOf(act)
    if (idx > 0) goTo(ACTS[idx - 1], 'back')
  }, [act, goTo])

  const goToAct = useCallback(
    (target: Act) => {
      const from = ACTS.indexOf(act)
      const to = ACTS.indexOf(target)
      if (to === from) return
      goTo(target, to > from ? 'forward' : 'back')
    },
    [act, goTo],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goBack()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goBack])

  return { goNext, goBack, goToAct, canBack: act > 1, canNext: act < 4 }
}
