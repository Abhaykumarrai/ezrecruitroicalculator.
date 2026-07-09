export type Act = 1 | 2 | 3 | 4

export const ACTS: Act[] = [1, 2, 3, 4]

export const ACT_LABELS: Record<Act, string> = {
  1: 'The leak',
  2: 'Your team',
  3: 'Time back',
  4: 'The payoff',
}

export const NARRATORS: Record<Act, string> = {
  1: 'Every day, recruiters lose hours to scattered tools and manual busywork — time that never comes back.',
  2: 'Every number that follows is calculated live for YOUR team — not an average.',
  3: 'Small switches, massive compounding — watch the minutes flow back.',
  4: "You didn't cut a single cost. You just stopped losing time.",
}
