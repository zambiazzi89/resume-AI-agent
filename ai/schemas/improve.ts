import { z } from 'zod'
import { ResumeSchema } from '../../app/api/data/resume'

export const ImproveSchema = z.object({
  tailoredResume: ResumeSchema,

  coverLetter: z
    .string()
    .describe('Three short paragraphs, plain text, separated by blank lines.'),
})

export type ImproveResponse = z.infer<typeof ImproveSchema>
