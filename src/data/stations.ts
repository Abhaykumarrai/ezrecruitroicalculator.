import type { ComponentType } from 'react'
import type { FeatureKey } from '../constants'
import {
  AiVisual,
  SchedulerVisual,
  TrackerVisual,
  WorkflowVisual,
} from '../components/StationVisuals'

export type StationData = {
  key: FeatureKey
  id: string
  chip: string
  title: string
  description: string
  offLabel: string
  painPoints: string[]
  Visual: ComponentType
}

export const STATIONS: StationData[] = [
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
    Visual: WorkflowVisual,
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
    Visual: TrackerVisual,
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
    Visual: AiVisual,
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
    Visual: SchedulerVisual,
  },
]
