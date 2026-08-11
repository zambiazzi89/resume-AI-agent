import { ArrowDown, Lightbulb, TriangleAlert } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { CritiqueResponse } from '@/ai/schemas/critique'

export function ChangesPanel({ critique }: { critique: CritiqueResponse }) {
  return (
    <div className="flex flex-col gap-4">
      {critique.summaryFeedback && (
        <Card className="p-6">
          <p className="mb-2 text-sm font-medium">On the summary</p>
          <p className="text-sm text-muted-foreground">
            {critique.summaryFeedback}
          </p>
        </Card>
      )}

      {critique.improvements?.length > 0 && (
        <Card className="p-6">
          <p className="mb-3 text-sm font-medium">What the rewrite targeted</p>
          <ul className="flex flex-col gap-2">
            {critique.improvements.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                <Lightbulb
                  className="mt-0.5 size-4 shrink-0 text-viz-warning"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {critique.bulletImprovements?.length > 0 && (
        <Card className="p-6">
          <p className="mb-4 text-sm font-medium">Bullet rewrites</p>

          <div className="flex flex-col gap-5">
            {critique.bulletImprovements.map((bullet, i) => (
              <div key={i}>
                {i > 0 && <Separator className="mb-5" />}

                <p className="text-sm text-muted-foreground line-through decoration-muted-foreground/40">
                  {bullet.original}
                </p>

                <ArrowDown
                  className="my-1.5 size-3.5 text-muted-foreground"
                  aria-hidden
                />

                <p className="text-sm">{bullet.improved}</p>

                <p className="mt-1.5 text-xs text-muted-foreground">
                  {bullet.reason}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {critique.missingSkills?.length > 0 && (
        <Card className="p-6">
          <p className="mb-2 flex items-center gap-1.5 text-sm font-medium">
            <TriangleAlert className="size-4 text-viz-serious" aria-hidden />
            Gaps the rewrite did not paper over
          </p>
          <p className="mb-3 text-sm text-muted-foreground">
            The posting asks for these and your resume does not support them.
            They were deliberately kept out of the tailored version.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {critique.missingSkills.map((skill, i) => (
              <span
                key={i}
                className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
