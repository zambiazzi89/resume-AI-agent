// Type-only so client components can import RUBRIC without pulling in Zod.
import type { ScoringBreakdown } from './schemas/analyze'

type RubricCategory = {
  label: string
  max: number
  anchors: string[]
}

/**
 * Single source of truth for scoring. The prompt text is generated from this,
 * and `satisfies` keeps the keys locked to ScoringBreakdownSchema so the rubric
 * and the schema cannot drift apart.
 */
export const RUBRIC = {
  skills: {
    label: 'Required skills match',
    max: 45,
    anchors: [
      '40-45: every hard requirement in the posting is demonstrated in the resume',
      '25-39: most hard requirements are demonstrated, one or two are missing or only adjacent',
      '10-24: several hard requirements are missing or only inferable',
      '0-9: the core stack of the posting is absent from the resume',
    ],
  },

  experience: {
    label: 'Experience relevance',
    max: 35,
    anchors: [
      '30-35: prior work is in the same domain and at the same scope as the role',
      '18-29: prior work is transferable but differs in domain, scale, or product type',
      '8-17: only loosely related work',
      '0-7: no relevant professional experience',
    ],
  },

  bonus: {
    label: 'Nice-to-have skills',
    max: 10,
    anchors: [
      'Award in proportion to how many of the posting\'s preferred (not required) items the resume supports',
      'Score 0 if the posting lists no nice-to-haves',
    ],
  },

  seniority: {
    label: 'Seniority alignment',
    max: 5,
    anchors: [
      '5: years of experience and scope of ownership match the level in the posting',
      '2-4: within one level of the posting',
      '0-1: more than one level below the posting',
      'Never deduct for overqualification. A candidate above the posted level scores 5',
    ],
  },

  eligibility: {
    label: 'Work eligibility and location',
    max: 5,
    anchors: [
      "5: authorized to work in the role's location without sponsorship, and able to meet the onsite/remote requirement",
      '0-4: deduct only for a concrete conflict stated in the posting (sponsorship, time zone, relocation, required onsite days)',
    ],
  },
} satisfies Record<keyof ScoringBreakdown, RubricCategory>

export const MAX_SCORE = Object.values(RUBRIC).reduce((sum, c) => sum + c.max, 0)

export function formatRubric(): string {
  return Object.entries(RUBRIC)
    .map(([key, category]) => {
      const anchors = category.anchors.map((a) => `  - ${a}`).join('\n')
      return `${category.label} — field "${key}" (0-${category.max})\n${anchors}`
    })
    .join('\n\n')
}
