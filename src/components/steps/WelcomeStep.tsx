import { useEffect, useState } from 'react'

type WelcomeStepProps = {
  onStart: () => void
  startRef: React.RefObject<HTMLButtonElement | null>
}

const STORY_SLIDES = [
  {
    title: 'Hours lost to busywork',
    text: 'CVs in sheets, status in WhatsApp, follow-ups in memory — time drains away.',
    variant: 'scatter',
  },
  {
    title: 'Every minute has a price',
    text: 'Manual updates and back-and-forth calls cost your agency real money.',
    variant: 'clock',
  },
  {
    title: 'EzRecruit gives time back',
    text: 'Pipeline, tracker, AI search, and scheduling — one flow, minutes saved.',
    variant: 'flow',
  },
  {
    title: 'Time becomes money',
    text: 'Watch saved minutes stack up — and see what they\'re worth in rupees.',
    variant: 'roi',
  },
] as const

export function WelcomeStep({ onStart, startRef }: WelcomeStepProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % STORY_SLIDES.length)
    }, 2200)

    return () => window.clearInterval(timer)
  }, [])

  const current = STORY_SLIDES[active]

  return (
    <div className="journey-page welcome-page">
      <div className="hero">
        <span className="eyebrow">Time → Money Story</span>
        <h1>
          Your recruiters lose hours every day.{' '}
          <span className="hl">How EzRecruit turns them into savings.</span>
        </h1>

        <div className="story-carousel" aria-live="polite">
          <div className="story-visual" data-variant={current.variant}>
            <div className="story-illustration">
              {current.variant === 'scatter' && (
                <>
                  <span className="story-card story-card-a" />
                  <span className="story-card story-card-b" />
                  <span className="story-card story-card-c" />
                  <span className="story-chip">CV</span>
                </>
              )}
              {current.variant === 'clock' && (
                <>
                  <span className="story-clock" />
                  <span className="story-line story-line-a" />
                  <span className="story-line story-line-b" />
                  <span className="story-line story-line-c" />
                </>
              )}
              {current.variant === 'flow' && (
                <>
                  <span className="story-node story-node-a">1</span>
                  <span className="story-node story-node-b">2</span>
                  <span className="story-node story-node-c">3</span>
                  <span className="story-path story-path-a" />
                  <span className="story-path story-path-b" />
                </>
              )}
              {current.variant === 'roi' && (
                <>
                  <span className="story-bar story-bar-a" />
                  <span className="story-bar story-bar-b" />
                  <span className="story-bar story-bar-c" />
                  <span className="story-badge">+ROI</span>
                </>
              )}
            </div>
          </div>

          <div className="story-copy">
            <h3>{current.title}</h3>
            <p>{current.text}</p>
            <div className="story-dots" aria-hidden="true">
              {STORY_SLIDES.map((slide, index) => (
                <span
                  key={slide.title}
                  className={`story-dot${index === active ? ' active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          ref={startRef}
          className="btn btn-pulse"
          type="button"
          onClick={onStart}
        >
          Start calculating ↓
        </button>
      </div>
    </div>
  )
}
