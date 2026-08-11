'use client'

import {
  AlertCircle,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  Minus,
  XCircle,
} from 'lucide-react'

import { Card } from '@/components/ui/card'
import { RubricChart } from './RubricChart'
import type { AnalyzeResponse } from '@/ai/schemas/analyze'

/**
 * Status is never carried by color alone — every level ships an icon and a
 * text label, which is also what makes the sub-3:1 warning and serious steps
 * legal on the light surface.
 */
function getScoreMatch(score: number) {
  if (score >= 90)
    return { Icon: CheckCircle2, tone: 'text-viz-good', level: 'Near perfect match' }
  if (score >= 75)
    return { Icon: CheckCircle2, tone: 'text-viz-good', level: 'Strong match' }
  if (score >= 60)
    return { Icon: AlertCircle, tone: 'text-viz-warning', level: 'Moderate match' }
  if (score >= 40)
    return { Icon: AlertTriangle, tone: 'text-viz-serious', level: 'Weak match' }
  return { Icon: XCircle, tone: 'text-viz-critical', level: 'Poor match' }
}

export function ScoreCard({
  analysis,
  baseline,
}: {
  analysis: AnalyzeResponse
  baseline?: AnalyzeResponse
}) {
  const { Icon, tone, level } = getScoreMatch(analysis.score)
  const delta = baseline ? analysis.score - baseline.score : null

  return (
    <Card className="gap-4 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            {baseline ? 'Tailored resume' : 'Original resume'}
          </p>

          {/* Hero figure: proportional figures, not tabular — tabular-nums
              makes a large standalone number look loose. */}
          <p className="text-6xl font-semibold tracking-tight">
            {analysis.score}
            <span className="ml-1 text-2xl font-normal text-muted-foreground">
              /100
            </span>
          </p>

          <p className="mt-1 flex items-center gap-1.5 text-sm">
            <Icon className={`size-4 ${tone}`} aria-hidden />
            {level}
          </p>
        </div>

        {delta !== null && <DeltaChip delta={delta} from={baseline!.score} />}
      </div>

      <RubricChart
        breakdown={analysis.scoringBreakdown}
        baseline={baseline?.scoringBreakdown}
      />
    </Card>
  )
}

function DeltaChip({ delta, from }: { delta: number; from: number }) {
  if (delta === 0) {
    return (
      <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm text-muted-foreground">
        <Minus className="size-3.5" aria-hidden />
        No change
      </span>
    )
  }

  const up = delta > 0
  const Icon = up ? ArrowUp : ArrowDown

  return (
    <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm">
      <Icon
        className={`size-3.5 ${up ? 'text-viz-up' : 'text-viz-critical'}`}
        aria-hidden
      />
      <span className="tabular-nums">
        {up ? '+' : ''}
        {delta}
      </span>
      <span className="text-muted-foreground">from {from}</span>
    </span>
  )
}
