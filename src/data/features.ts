import type { FeatureKey } from '../constants'

export type FeatureItem = {
  label: string
  status?: 'included' | 'soon'
  sub?: string[]
}

export type FeatureModule = {
  key: FeatureKey
  name: string
  benefit: string
  mins: number
  items: FeatureItem[]
}

export const FEATURE_MODULES: FeatureModule[] = [
  {
    key: 'workflow',
    name: 'Pipeline & Closures',
    benefit: 'One system from req to placed',
    mins: 25,
    items: [
      {
        label: 'Role-based dashboards',
        sub: ['CEO', 'Head', 'Manager', 'Lead', 'Recruiters'],
      },
      { label: 'Client management' },
      { label: 'Requirement management' },
      { label: 'Candidate management' },
      { label: 'End-to-end workflow' },
      { label: 'Closure management' },
    ],
  },
  {
    key: 'tracker',
    name: 'Team & Access',
    benefit: 'Right people, right permissions',
    mins: 30,
    items: [
      { label: 'Employee management' },
      { label: 'Permission groups' },
      { label: 'Role transfer' },
      { label: 'Collaborator access' },
      { label: 'Dedicated in-app support' },
      { label: 'End-to-end notifications' },
    ],
  },
  {
    key: 'ai',
    name: 'AI & Search',
    benefit: 'Find talent faster, smarter',
    mins: 20,
    items: [
      { label: 'Internal database search' },
      { label: 'Boolean search' },
      { label: 'JD generation' },
      { label: 'AI search' },
      { label: 'Conversational AI', status: 'soon' },
      { label: 'X-ray search', status: 'soon' },
      { label: 'CV parsing' },
    ],
  },
  {
    key: 'sched',
    name: 'Outreach & Scheduling',
    benefit: 'Reach candidates everywhere',
    mins: 15,
    items: [
      { label: 'WhatsApp scheduling' },
      {
        label: 'Job posting',
        sub: ['LinkedIn', 'Email', 'WhatsApp', 'X (Twitter)'],
      },
      { label: 'Bulk email' },
    ],
  },
]

/** @deprecated use FEATURE_MODULES */
export const FEATURE_CARDS = FEATURE_MODULES

export const LEAK_CHIPS = [
  { label: 'Manual tracker updates', mins: 30 },
  { label: 'Status-chasing calls', mins: 25 },
  { label: 'Boolean searching', mins: 20 },
  { label: 'Interview back-and-forth', mins: 15 },
] as const
