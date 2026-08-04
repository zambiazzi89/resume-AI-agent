import { z } from 'zod'

export const CritiqueSchema = z.object({
  improvements: z.array(z.string()),

  missingSkills: z.array(z.string()),

  bulletImprovements: z.array(
    z.object({
      original: z.string(),
      improved: z.string(),
      reason: z.string(),
    }),
  ),

  summaryFeedback: z.string(),
})

export type CritiqueResponse = z.infer<typeof CritiqueSchema>
