import type { CareerProfile } from '@/app/api/data/careerProfile'

/**
 * The full profile is large, and every step does not need all of it.
 *
 * Screening only needs to answer "does this candidate have X, and at what
 * level" — the investigation-by-investigation detail would dilute that. The
 * critique and rewrite steps DO need the detail, because they have to pull
 * specific evidence into bullets.
 */
export function formatEvidenceIndex(profile: CareerProfile): string {
  const technologies = profile.technicalExperience
    .map(
      (item) =>
        `- ${item.technology} (${item.category}): ${item.experienceLevel}, ${item.context}`,
    )
    .join('\n')

  const roles = profile.experience
    .map(
      (role) =>
        `- ${role.role}, ${role.company} (${role.dates}): ${role.technologies.join(', ') || 'no technologies'}`,
    )
    .join('\n')

  const capabilities = profile.capabilities
    .map((group) => `- ${group.category}: ${group.skills.join(', ')}`)
    .join('\n')

  const projects = profile.projects
    .map((project) => `- ${project.name}: ${project.technologies.join(', ')}`)
    .join('\n')

  return `
TECHNOLOGIES THE CANDIDATE HAS USED:
${technologies}

ROLES:
${roles}

CAPABILITIES:
${capabilities}

PERSONAL PROJECTS:
${projects}

CERTIFICATIONS:
${profile.certifications.map((c) => `- ${c}`).join('\n')}

WORK ELIGIBILITY:
${JSON.stringify(profile.identity)}
`
}

/** Everything, for the steps that need to quote specific evidence. */
export function formatFullProfile(profile: CareerProfile): string {
  return JSON.stringify(profile, null, 2)
}
