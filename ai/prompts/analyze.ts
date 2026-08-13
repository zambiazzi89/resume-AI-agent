import { ResumeType } from '@/app/api/data/resume'
import type { CareerProfile } from '@/app/api/data/careerProfile'
import { AnalyzeResponse } from '../schemas/analyze'
import { formatEvidenceIndex } from '../profile'
import { formatRubric, MAX_SCORE } from '../rubric'

type Baseline = {
  resume: ResumeType
  analysis: AnalyzeResponse
}

export function getAnalyzePrompt(
  jobDescription: string,
  resume: ResumeType,
  profile: CareerProfile,
  baseline?: Baseline,
): string {
  return `
You are a strict technical recruiter screening one candidate against one job posting.
You only evaluate. You never rewrite the resume or suggest replacement wording.

JOB DESCRIPTION:
${jobDescription}

RESUME AS CURRENTLY WRITTEN (JSON):
${JSON.stringify(resume, null, 2)}

CAREER PROFILE — the candidate's verified background. This is broader than the
resume: it is the record of what they have actually done, including work the
resume does not currently mention.
${formatEvidenceIndex(profile)}

SCORING RUBRIC — score each category independently, then set "score" to their exact sum (maximum ${MAX_SCORE}):

${formatRubric()}

How to score:
- Score the RESUME AS WRITTEN, not the career profile. A recruiter screens the resume, so a qualification the resume does not convey earns no points yet — that is the gap this tool exists to close.
- Every category score must be justifiable by a specific line in the resume.
- Do not round categories up to be encouraging, and do not compress scores toward the middle.
- "score" must equal the sum of the five category values. Do not adjust the total afterwards.

Separating candidate gaps from resume gaps — this distinction is the most
important judgment you make here:
- Before calling a requirement missing, check the career profile. If the profile shows the candidate has it, it is NOT a weakness. It belongs in "undersoldStrengths", because the failure is the resume's, not the candidate's.
- Only list something as a weakness when NEITHER the resume nor the profile supports it. Those are real gaps.
- The profile is a supplement and is not exhaustive. Where the resume claims something the profile does not mention, the resume is still credited in full — the profile's silence is not evidence against it.
- Respect the recorded experienceLevel. "exposure" or "working-knowledge" does not satisfy a requirement asking for depth — say so plainly rather than treating it as either a clean match or a total absence.
- A technology the profile records under a parent service counts. If the profile lists EC2, ECS, or Lambda individually, the candidate has that specific service, not merely generic "AWS".
${baseline ? calibration(baseline) : ''}
Field definitions:
- strengths: 3-6 items. Requirements the resume as written already demonstrates. Name the requirement and the resume line that satisfies it.
- weaknesses: 2-5 items. Requirements neither the resume nor the career profile supports. Be blunt; these cannot be fixed by rewriting.
- undersoldStrengths: 0-6 items. Requirements the profile supports but the resume does not convey. Name the requirement and the profile evidence that covers it.
- considerations: 0-4 items. Neutral facts a hiring manager would want flagged — location or time-zone fit, sponsorship, a career change, an employment gap, a domain switch.

Never credit the candidate with anything absent from BOTH the resume and the career profile.
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
- Keep a category identical unless the resume now conveys something it did not before. Stronger verbs, reordering, and keyword insertion are presentation changes: they do not change what the candidate has done, so they do not change the score.
- DO raise a category when the revision surfaces a real qualification that the career profile supports and the previous version omitted. That is a genuine improvement in the resume's accuracy, and it is exactly what the rewrite was asked to do.
- If the revision asserts anything that the career profile does not support, treat it as unverified: do not credit it, and record it in "considerations" as an accuracy problem.
`
}
