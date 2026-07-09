import type { ReactNode } from 'react'
import type { FeatureKey } from '../constants'
import { FEATURE_MINS } from '../constants'
import { Station } from './Station'
import {
  AiVisual,
  SchedulerVisual,
  TrackerVisual,
  WorkflowVisual,
} from './StationVisuals'

const STATIONS: {
  key: FeatureKey
  id: string
  chip: string
  title: string
  description: string
  offLabel: string
  painPoints: string[]
  visual: ReactNode
}[] = [
  {
    key: 'workflow',
    id: 'st-workflow',
    chip: '⚙ Streamlined Workflow',
    title: 'One pipeline. Zero duplicate entry.',
    description:
      "Without a system, candidates live in Excel sheets, email threads and memory. With EzRecruit's workflow, every candidate moves through one visual pipeline — sourced to placed.",
    offLabel: 'Turn on Workflow',
    painPoints: [
      'Updating the same candidate in 3 different sheets',
      'Searching old emails to find where a candidate stands',
      'Rebuilding client reports manually every week',
    ],
    visual: <WorkflowVisual />,
  },
  {
    key: 'tracker',
    id: 'st-tracker',
    chip: '📍 Auto Candidate Tracker',
    title: 'Status updates itself. You just act.',
    description:
      'The tracker reads interview mails and updates every candidate\'s stage automatically — no chasing recruiters on calls, no "what\'s the status?" WhatsApp groups.',
    offLabel: 'Turn on Tracker',
    painPoints: [
      'Calling recruiters for status of every candidate',
      'Manually updating tracker sheets after every interview',
      'Missing follow-ups because nothing reminded you',
    ],
    visual: <TrackerVisual />,
  },
  {
    key: 'ai',
    id: 'st-ai',
    chip: '💬 Conversational AI Search',
    title: "Ask for candidates like you'd ask a colleague.",
    description:
      'No Boolean strings, no filter maze. Type what you need in plain language and get ranked matches from your own database in seconds — sourcing time drops before you even open a job portal.',
    offLabel: 'Turn on Conversational AI',
    painPoints: [
      'Re-sourcing candidates you already have in your database',
      'Building complex Boolean searches for every role',
      'Scrolling hundreds of profiles to find 3 good fits',
    ],
    visual: <AiVisual />,
  },
  {
    key: 'sched',
    id: 'st-sched',
    chip: '📅 WhatsApp Scheduler',
    title: 'Interviews book and confirm themselves.',
    description:
      'Slots go out on WhatsApp, candidates confirm with one tap, reminders fire automatically. No back-and-forth calls, and no-shows drop because everyone gets nudged on time.',
    offLabel: 'Turn on Scheduler',
    painPoints: [
      '5 calls to fix one interview slot',
      'Manual reminder calls the night before',
      'Candidates going silent — and you finding out too late',
    ],
    visual: <SchedulerVisual />,
  },
]

type JourneySectionProps = {
  features: Record<FeatureKey, boolean>
  onToggle: (key: FeatureKey, on: boolean) => void
}

export function JourneySection({ features, onToggle }: JourneySectionProps) {
  return (
    <section className="wrap" id="journey">
      <div className="step-tag">
        <div className="n">2</div>
        <span>The journey</span>
      </div>
      <h2>Switch on EzRecruit, one feature at a time</h2>
      <p className="sub">
        Each switch shows what changes in a recruiter&apos;s day — and adds the
        minutes saved to your time bank in the header.
      </p>

      {STATIONS.map((station) => (
        <Station
          key={station.key}
          id={station.id}
          mins={FEATURE_MINS[station.key]}
          on={features[station.key]}
          chip={station.chip}
          title={station.title}
          description={station.description}
          offLabel={station.offLabel}
          painPoints={station.painPoints}
          visual={station.visual}
          onToggle={(on) => onToggle(station.key, on)}
        />
      ))}
    </section>
  )
}
