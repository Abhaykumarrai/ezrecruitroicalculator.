import { useEffect, useState } from 'react'

export type ParticleBurst = {
  id: number
  x: number
  y: number
  targetX: number
  targetY: number
}

type TimeParticlesProps = {
  bursts: ParticleBurst[]
  onDone: (id: number) => void
}

export function TimeParticles({ bursts, onDone }: TimeParticlesProps) {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  if (reduced || bursts.length === 0) return null

  return (
    <div className="time-particles" aria-hidden="true">
      {bursts.map((b) => (
        <Particle key={b.id} burst={b} onDone={onDone} />
      ))}
    </div>
  )
}

function Particle({
  burst,
  onDone,
}: {
  burst: ParticleBurst
  onDone: (id: number) => void
}) {
  useEffect(() => {
    const t = setTimeout(() => onDone(burst.id), 700)
    return () => clearTimeout(t)
  }, [burst.id, onDone])

  const dx = burst.targetX - burst.x
  const dy = burst.targetY - burst.y

  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="time-particle"
          style={
            {
              left: burst.x,
              top: burst.y,
              '--dx': `${dx}px`,
              '--dy': `${dy}px`,
              '--delay': `${i * 40}ms`,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  )
}
