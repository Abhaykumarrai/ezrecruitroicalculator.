import { useEffect, useRef, useState } from 'react'

export function useCountTo(target: number, format: (v: number) => string) {
  const [display, setDisplay] = useState(() => format(0))
  const fromRef = useRef(0)
  const rafRef = useRef(0)

  useEffect(() => {
    const from = fromRef.current
    fromRef.current = target
    const t0 = performance.now()
    const dur = 500

    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur)
      const e = 1 - Math.pow(1 - p, 3)
      setDisplay(format(from + (target - from) * e))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, format])

  return display
}
