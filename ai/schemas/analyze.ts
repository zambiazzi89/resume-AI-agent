import { z } from 'zod'

export const ScoringBreakdownSchema = z.object({
  skills: z.number(),
  experience: z.number(),
  bonus: z.number(),
  seniority: z.number(),
  eligibility: z.number(),
})

export type ScoringBreakdown = z.infer<typeof ScoringBreakdownSchema>

export const AnalyzeSchema = z.object({
  score: z.number().describe('Exact sum of the five scoringBreakdown values.'),

  scoringBreakdown: ScoringBreakdownSchema,

  strengths: z
    .array(z.string())
    .describe('Requirements in the posting that the resume clearly supports.'),

  weaknesses: z
    .array(z.string())
    .describe('Requirements in the posting that the resume does not support.'),

  considerations: z
    .array(z.string())
    .describe(
      'Neutral facts a hiring manager would want flagged: location, sponsorship, gaps, domain switch. Neither strengths nor weaknesses.',
    ),
})

export type AnalyzeResponse = z.infer<typeof AnalyzeSchema>
