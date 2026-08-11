import { Check, Info, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { LucideIcon } from 'lucide-react'

function FindingList({
  title,
  items,
  Icon,
  tone,
}: {
  title: string
  items: string[]
  Icon: LucideIcon
  tone: string
}) {
  if (!items?.length) return null

  return (
    <div>
      <p className="mb-2 text-sm font-medium">{title}</p>
      <ul className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
            <Icon className={`mt-0.5 size-4 shrink-0 ${tone}`} aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function FeedbackPanel({
  strengths,
  weaknesses,
  considerations,
}: {
  strengths: string[]
  weaknesses: string[]
  considerations?: string[]
}) {
  return (
    <Card className="gap-5 p-6">
      <FindingList
        title="Strengths"
        items={strengths}
        Icon={Check}
        tone="text-viz-good"
      />
      <FindingList
        title="Weaknesses"
        items={weaknesses}
        Icon={X}
        tone="text-viz-critical"
      />
      <FindingList
        title="Considerations"
        items={considerations ?? []}
        Icon={Info}
        tone="text-muted-foreground"
      />
    </Card>
  )
}
