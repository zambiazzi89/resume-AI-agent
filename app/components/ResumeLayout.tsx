import { ResumeType } from '../api/data/resume'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const FULL_NAME = 'Diego Bez Zambiazzi'
const CONTACT_INFO =
  'Brazil / United States | diego@zambiazzi.com | linkedin.com/in/zambiazzi/ | github.com/zambiazzi89'
const UNIVERSITY = 'Southern New Hampshire University'
const DEGREE = 'BS in Computer Science (Software Engineering Concentration)'
const ED_DETAIL =
  "May 2022 | GPA: 3.99 | President's List (2019-2022) | Alpha Sigma Lambda Honor Society"

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        {children}
      </p>
      <Separator className="mt-1.5" />
    </div>
  )
}

function SkillLine({ label, items }: { label: string; items?: string[] }) {
  if (!items?.length) return null

  return (
    <p className="text-sm">
      <span className="font-medium">{label}: </span>
      <span className="text-muted-foreground">{items.join(', ')}</span>
    </p>
  )
}

export function ResumeLayout({ resume }: { resume: ResumeType }) {
  return (
    <Card className="gap-5 p-8">
      {/* HEADER */}
      <div>
        <p className="text-lg font-semibold">{FULL_NAME}</p>
        <p className="text-sm text-muted-foreground">{CONTACT_INFO}</p>
        <p className="mt-2 font-medium text-primary">{resume.title}</p>
      </div>

      {/* SUMMARY */}
      <p className="max-w-prose text-sm">{resume.summary}</p>

      {/* SKILLS */}
      <div className="flex flex-col gap-2">
        <SectionHeading>Skills</SectionHeading>
        <SkillLine
          label="Languages & Tools"
          items={resume.skills?.languagesAndTools}
        />
        <SkillLine label="Certifications" items={resume.skills?.certifications} />
        <SkillLine label="Exposure to" items={resume.skills?.exposure} />
      </div>

      {/* EDUCATION */}
      <div className="flex flex-col gap-2">
        <SectionHeading>Education</SectionHeading>
        <div>
          <p className="text-sm font-medium">{UNIVERSITY}</p>
          <p className="text-sm font-medium">{DEGREE}</p>
          <p className="text-sm text-muted-foreground">{ED_DETAIL}</p>
        </div>
        <SkillLine label="Core Concepts" items={resume.education?.coreConcepts} />
      </div>

      {/* EXPERIENCE */}
      <div className="flex flex-col gap-3">
        <SectionHeading>Experience</SectionHeading>

        {resume.experience?.map((job, i) => (
          <div key={i}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="text-sm font-medium">{job.role}</p>
              <p className="text-xs text-muted-foreground">{job.dates}</p>
            </div>

            <p className="text-sm text-muted-foreground italic">
              {job.company}, {job.location}
            </p>

            <ul className="mt-1.5 flex flex-col gap-1">
              {job.bullets?.map((bullet, j) => (
                <li key={j} className="flex gap-2 text-sm">
                  <span
                    className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground"
                    aria-hidden
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* PROJECTS */}
      <div className="flex flex-col gap-3">
        <SectionHeading>Projects</SectionHeading>

        {resume.projects?.map((project, i) => (
          <div key={i}>
            <p className="text-sm font-medium">{project.name}</p>
            <p className="text-xs text-muted-foreground">
              {project.tech.join(', ')}
            </p>
            <p className="text-sm">{project.description}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
