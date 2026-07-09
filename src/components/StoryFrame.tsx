import type { ReactNode } from 'react'
import type { JourneyStep } from '../types/journey'
import { fmtINR } from '../utils/format'
import { formatTimeBank } from '../utils/format'

export type StoryChapter = 1 | 2 | 3 | 4

const CHAPTERS = [
  { n: 1, label: 'The leak' },
  { n: 2, label: 'Your team' },
  { n: 3, label: 'Time back' },
  { n: 4, label: 'The payoff' },
] as const

const NARRATIVES: Record<StoryChapter, string> = {
  1: 'Every day, recruiters lose hours to scattered tools and manual busywork — time that never comes back.',
  2: 'The bigger your team, the more minutes leak out. Let\'s size the problem for your agency.',
  3: 'Each EzRecruit feature gives minutes back. Watch them stack — every minute saved is money earned.',
  4: 'Saved time becomes real rupees. Here\'s what EzRecruit is worth for your team.',
}

function chapterForStep(step: JourneyStep): StoryChapter {
  if (step === 'welcome') return 1
  if (step === 'setup') return 2
  if (step === 'results') return 4
  return 3
}

type StoryFrameProps = {
  step: JourneyStep
  mins: number
  grossSaved: number
  bump?: boolean
  children: ReactNode
}

export function StoryFrame({
  step,
  mins,
  grossSaved,
  bump,
  children,
}: StoryFrameProps) {
  const chapter = chapterForStep(step)

  return (
    <div className="story-frame">
      <header className="story-header">
        <div className="story-counters">
          <div className={`story-counter time${bump ? ' bump' : ''}`} aria-live="polite">
            <span className="sc-label">Time saved</span>
            <span className="sc-value num">{formatTimeBank(mins)}</span>
            <span className="sc-suffix">/ day</span>
          </div>
          <div className="story-counter-arrow" aria-hidden="true">
            →
          </div>
          <div className={`story-counter money${bump ? ' bump' : ''}`} aria-live="polite">
            <span className="sc-label">Worth</span>
            <span className="sc-value num">{fmtINR(grossSaved)}</span>
            <span className="sc-suffix">/ year</span>
          </div>
        </div>

        <nav className="story-rail" aria-label="Story chapters">
          {CHAPTERS.map((c) => (
            <div
              key={c.n}
              className={`story-chapter${c.n === chapter ? ' active' : ''}${c.n < chapter ? ' done' : ''}`}
            >
              <span className="story-chapter-dot" />
              <span className="story-chapter-label">{c.label}</span>
            </div>
          ))}
        </nav>
      </header>

      <main className="story-stage">{children}</main>

      <footer className="story-narrative" aria-live="polite">
        <p>{NARRATIVES[chapter]}</p>
      </footer>
    </div>
  )
}
