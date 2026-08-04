import { ResumeType } from '../api/data/resume'
import { ChevronDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Card, CardTitle } from '@/components/ui/card'

const FULL_NAME = 'Diego Bez Zambiazzi'
const CONTACT_INFO =
  'Brazil / United States | diego@zambiazzi.com | linkedin.com/in/zambiazzi/ | github.com/zambiazzi89'
const UNIVERSITY = 'Southern New Hampshire University'
const DEGREE = 'BS in Computer Science (Software Engineering Concentration)'
const ED_DETAIL =
  "May 2022 | GPA: 3.99 | President's List (2019-2022) | Alpha Sigma Lambda Honor Society"

export function ResumeLayout({ resume }: { resume: ResumeType }) {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button className="group w-full">
          View Resume
          <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="py-4">
        <Card className="p-4">
          {/* HEADER */}
          <div>
            <p className="font-bold text-lg">{FULL_NAME}</p>
            <p className="font-light">{CONTACT_INFO}</p>
          </div>

          {/* ROLE */}
          <p className="font-bold text-lg">{resume.title}</p>

          {/* SUMMARY */}
          <p>{resume.summary}</p>

          {/* SKILLS */}
          <div>
            <p className="font-bold pb-2">SKILLS</p>
            <div>
              <span className="font-bold">Languages & Tools: </span>
              <span>{resume.skills?.languagesAndTools?.join(', ')}</span>
            </div>
            <div>
              <span className="font-bold">Certifications: </span>
              <span>{resume.skills?.certifications?.join(', ')}</span>
            </div>
            <div>
              <span className="font-bold">Exposure to: </span>
              <span>{resume.skills?.exposure?.join(', ')}</span>
            </div>
          </div>

          {/* EDUCATION */}
          <div>
            <p className="font-bold pb-2">EDUCATION</p>
            <p className="font-bold">{UNIVERSITY}</p>
            <p className="font-bold">{DEGREE}</p>
            <p>{ED_DETAIL}</p>
            <div>
              <span className="font-bold">Core Concepts: </span>
              <span>{resume.education?.coreConcepts?.join(', ')}</span>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div>
            <p className="font-bold pb-2">EXPERIENCE</p>
            {resume.experience?.map((job: any, i: number) => (
              <div key={i} className="pb-3">
                <div className="font-bold">{job.role} </div>
                <div className="italic">
                  {job.company}, {job.location}
                </div>
                <ul>
                  {job.bullets?.map((b: string, j: number) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* PROJECTS */}
          <div>
            <p className="font-bold pb-2">PROJECTS</p>
            <div>
              {resume.projects?.map((project: any, i: number) => (
                <div key={i} className="pb-3">
                  <div className="font-bold">{project.name}</div>
                  <div className="font-light">{project.tech.join(', ')}</div>
                  <div>{project.description}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  )
}
