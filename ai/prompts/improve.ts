import { ResumeType } from '@/app/api/data/resume'
import type { CareerProfile } from '@/app/api/data/careerProfile'
import { CritiqueResponse } from '../schemas/critique'
import { formatFullProfile } from '../profile'

export function getImprovePrompt(
  jobDescription: string,
  resume: ResumeType,
  profile: CareerProfile,
  critique: CritiqueResponse,
): string {
  return `
You are an expert resume writer. Rewrite this candidate's resume for this specific
posting, and write a matching cover letter.

You have two sources of truth, and you may draw on BOTH:

1. The current resume. Everything already in it is true — the candidate wrote it.
   It is the floor, not a draft to be pruned.
2. The career profile. It records real work the resume leaves out, in more
   detail. It is a supplement to the resume, not a replacement for it, and it is
   NOT exhaustive: plenty of genuine experience appears only on the resume.

Your job is to close the gap between them — surface what the profile proves and
the resume hides, while keeping everything the resume already claims.

The candidate will be interviewed on every word you write. A claim supported by
neither source will get them caught.

JOB DESCRIPTION:
${jobDescription}

CURRENT RESUME (JSON) — the artifact you are rewriting:
${JSON.stringify(resume, null, 2)}

CAREER PROFILE — your source of truth:
${formatFullProfile(profile)}

RECRUITER CRITIQUE:
${JSON.stringify(critique, null, 2)}

COPY THESE VERBATIM from the current resume — they are facts, not writing:
- every company, location, and dates value
- the entire education object (degree, school, GPA, graduationDate, highlights); coreConcepts may be reordered but not edited
- the entire workEligibility object
- every project name
- the set of experience entries: never drop a role, never merge two roles, never add a role

YOU MAY CHANGE, using the career profile as source material:
- title and summary
- experience bullets: rewrite them, reorder them, and ADD new bullets drawn from the profile's responsibilities, accomplishments, and incidents for that same role
- the skills arrays: reorder them by relevance to this posting, and ADD technologies the profile records that the posting asks for. Never remove an entry — a longer list costs nothing in screening, and dropping a skill the candidate has is a pure loss
- project descriptions and tech lists, where the profile records more than the resume shows
- the order of everything

HARD RULES:
- Every claim must be traceable to the current resume OR the career profile. Something absent from both never goes in — this includes every entry in the critique's missingSkills, which are the candidate's real gaps.
- The profile's silence is not evidence against anything. A skill the resume lists and the profile omits stays exactly where it is; the profile simply has nothing to add about it. Never delete, downgrade, or hedge a resume claim because the profile does not repeat it.
- Where the profile DOES record an experienceLevel for a technology, respect it: "hands-on" may sit in languagesAndTools, "exposure" belongs in exposure. Never present exposure or working-knowledge as depth, and never move something the resume already lists into a weaker category.
- Attach evidence to the role that actually produced it. An accomplishment recorded under one company never migrates to another.
- Never invent or inflate a metric. Reproduce numbers exactly as the profile or resume states them, hedges included ("approximately 75%" stays approximate). If neither records a number, the bullet has no number.
- Never imply seniority, team size, or ownership beyond what the profile states.
- Do not claim a role was something it was not: where the profile records how a role's time was actually split, never present a support-heavy role as primarily greenfield development. You are NOT required to state the ratio, and you should not apologise for the role's real shape — production support, root-cause analysis, and remediation are senior engineering work and should be written with their full weight, using the strongest evidence the profile records.
- Keep every certification the resume lists, and add one only if the profile's certifications array records it.

STYLE:
- Bullets: 3-6 per role, one to two lines each (roughly 40 words maximum), starting with an action verb. Present tense for the current role, past tense for the others. Lead with the outcome where the profile gives one.
- Prefer the specific over the generic. If the profile records the individual services, name them rather than the umbrella term.
- Mirror the posting's terminology wherever it describes something the candidate has actually done. Where the candidate's term and the posting's term differ, use the posting's term and keep the specific technology in the sentence.
- Summary: 2-4 sentences, no first person. Cut adjectives that cannot be evidenced ("passionate", "results-driven", "creative") in favor of what the candidate has built and fixed.
- Write the entire output in the language of the job description.

COVER LETTER:
- Three short paragraphs, under 250 words total, plain text with a blank line between paragraphs.
- First: the role and the single strongest reason this candidate fits. Do not open with "I am writing to apply".
- Second: one concrete piece of evidence — a profile incident or accomplishment is usually the strongest choice — with its result.
- Third: what connects the candidate to this particular team or product based on the posting, then a plain closing.
- No flattery, no clichés ("proven track record", "hit the ground running"), no restating the resume.
- Never claim a skill the profile does not record.

Return the complete resume object with every field populated, including the fields you did not change.
`
}
