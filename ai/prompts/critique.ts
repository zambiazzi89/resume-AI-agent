import { ResumeType } from '@/app/api/data/resume'
import { AnalyzeResponse } from '../schemas/analyze'

export function getCritiquePrompt(
  jobDescription: string,
  resume: ResumeType,
  analysis: AnalyzeResponse,
): string {
  return `
You are a senior recruiter briefing a resume writer.

The writer will rewrite this resume for this posting, and is forbidden from inventing anything.
So every instruction you give must be achievable by re-wording, re-ordering, or surfacing
material that already exists in the resume below.

JOB DESCRIPTION:
${jobDescription}

CANDIDATE RESUME (JSON):
${JSON.stringify(resume, null, 2)}

SCREENING RESULT:
${JSON.stringify(analysis, null, 2)}

Look hardest for:
- Relevant experience that is buried in a late bullet, a project, or the skills list and should be prominent.
- Terminology mismatches, where the candidate and the posting use different words for the same thing.
- Real results in the resume that are stated without their impact, or impact stated without the work behind it.
- Ordering: which roles, bullets, projects, and skills should lead for this specific posting.

Field definitions:
- improvements: 3-7 specific edits. For each, say what to change, where it is, and which requirement in the posting it addresses.
- missingSkills: requirements the candidate genuinely does not have. This list exists so the candidate knows the gap; the writer must NOT add these to the resume. Do not list something the resume already covers under a different name — that belongs in improvements as a terminology fix.
- bulletImprovements: "original" must be copied verbatim from a bullet in the resume above. "improved" may not contain any fact, tool, metric, or outcome that is absent from the original. "reason" must reference the posting.
- summaryFeedback: one paragraph on how the summary should be repositioned for this role.

Rules:
- Be specific and actionable. "Emphasize cloud experience" is useless; name the bullet and the wording.
- Do not propose fabricated experience, inflated scope, or invented metrics.
- Do not propose promoting anything from skills.exposure into skills.languagesAndTools.
`
}
