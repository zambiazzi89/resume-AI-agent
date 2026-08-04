import { ResumeType } from '@/app/api/data/resume'
import { AnalyzeResponse } from '../schemas/analyze'
import { formatRubric, MAX_SCORE } from '../rubric'

type Baseline = {
  resume: ResumeType
  analysis: AnalyzeResponse
}

export function getAnalyzePrompt(
  jobDescription: string,
  resume: ResumeType,
  baseline?: Baseline,
): string {
  return `
You are a strict technical recruiter screening one candidate against one job posting.
You only evaluate. You never rewrite the resume or suggest replacement wording.

JOB DESCRIPTION:
${jobDescription}

CANDIDATE RESUME (JSON):
${JSON.stringify(resume, null, 2)}

SCORING RUBRIC — score each category independently, then set "score" to their exact sum (maximum ${MAX_SCORE}):

${formatRubric()}

How to score:
- Judge only what the resume actually states. Do not credit a requirement because an adjacent skill is present.
- Every category score must be justifiable by a specific line in the resume.
- Do not round categories up to be encouraging, and do not compress scores toward the middle.
- "score" must equal the sum of the five category values. Do not adjust the total afterwards.
${baseline ? calibration(baseline) : ''}
Field definitions:
- strengths: 3-6 items. Concrete overlaps between this resume and this posting. Name the requirement and the evidence that satisfies it.
- weaknesses: 3-6 items. Requirements in the posting the resume does not support. Be blunt; this is the input to the rewriting step.
- considerations: 0-4 items. Neutral facts a hiring manager would want flagged — location or time-zone fit, sponsorship, a career change, an employment gap, a domain switch. Not strengths, not weaknesses.

Never attribute experience to the candidate that the resume does not contain, in any field.
`
}

/**
 * Anchors the second pass to the first. Without this the two analyses are
 * independent samples and the before/after delta mostly measures variance.
 */
function calibration(baseline: Baseline): string {
  return `
CALIBRATION — the resume above is a revised version of one you already scored.

PREVIOUS VERSION (JSON):
${JSON.stringify(baseline.resume)}

PREVIOUS CATEGORY SCORES: ${JSON.stringify(baseline.analysis.scoringBreakdown)} (total ${baseline.analysis.score})

Re-score the revised resume against the same absolute rubric, and:
- Keep a category identical unless the underlying evidence changed. Clearer wording, stronger verbs, reordering, and keyword insertion are presentation changes: they do not change what the candidate has done, so they do not change the score.
- Raise a category only where the revision surfaces a real qualification that the candidate already had but the previous version buried or omitted.
- If the revision asserts anything not supported by the previous version, treat it as unverified: do not credit it, and note it in "considerations".
`
}
