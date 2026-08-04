import { ResumeType } from '@/app/api/data/resume'
import { CritiqueResponse } from '../schemas/critique'

export function getImprovePrompt(
  jobDescription: string,
  resume: ResumeType,
  critique: CritiqueResponse,
): string {
  return `
You are an expert resume writer. Rewrite this candidate's resume for this specific posting,
and write a matching cover letter.

The candidate will be interviewed on every word you write. Anything you cannot trace back to
the original resume will get them caught.

JOB DESCRIPTION:
${jobDescription}

ORIGINAL RESUME (JSON):
${JSON.stringify(resume, null, 2)}

RECRUITER CRITIQUE:
${JSON.stringify(critique, null, 2)}

COPY THESE VERBATIM from the original — they are facts, not writing:
- every company, location, and dates value
- the entire education object (degree, school, GPA, graduationDate, highlights); coreConcepts may be reordered but not edited
- skills.certifications
- the entire workEligibility object
- every project name and its tech array
- the set of experience entries: never drop a role, never merge two roles, never add a role

YOU MAY CHANGE:
- title and summary
- the order of skills.languagesAndTools, skills.exposure, experience bullets, projects, and coreConcepts
- the wording of experience bullets and project descriptions

HARD RULES:
- Never add a skill, tool, language, framework, or certification that does not already appear somewhere in the original resume. This includes every entry in the critique's missingSkills — those are gaps to be honest about, not targets to write toward.
- Never move an item from skills.exposure into skills.languagesAndTools. "Exposure" is a weaker claim and promoting it is a lie.
- Reorder the skills arrays by relevance to this posting, but do not remove entries.
- Never invent or inflate a metric. Reproduce existing numbers exactly. If a bullet has no number, it stays without one.
- Never imply seniority, team size, or ownership beyond what the original states.

STYLE:
- Bullets: 3-6 per role, one to two lines each (roughly 40 words maximum), starting with an action verb. Present tense for the current role, past tense for the others. Lead with the outcome where the original gives one.
- Mirror the posting's terminology wherever it describes something the candidate has actually done. Where the candidate's term and the posting's term differ, use the posting's term and keep the specific technology in the sentence.
- Summary: 2-4 sentences, no first person. Cut adjectives that cannot be evidenced ("passionate", "results-driven", "creative") in favor of what the candidate has built.
- Write the entire output in the language of the job description.

COVER LETTER:
- Three short paragraphs, under 250 words total, plain text with a blank line between paragraphs.
- First: the role and the single strongest reason this candidate fits. Do not open with "I am writing to apply".
- Second: one concrete piece of evidence from the resume, with its result.
- Third: what connects the candidate to this particular team or product based on the posting, then a plain closing.
- No flattery, no clichés ("proven track record", "hit the ground running"), no restating the resume.
- Never claim a skill that is not in the resume.

Return the complete resume object with every field populated, including the fields you did not change.
`
}
