'use client'

import { RUBRIC } from '@/ai/rubric'
import type { ScoringBreakdown } from '@/ai/schemas/analyze'

const CATEGORIES = Object.entries(RUBRIC) as [
  keyof ScoringBreakdown,
  (typeof RUBRIC)[keyof ScoringBreakdown],
][]

const percent = (value: number, max: number) => (value / max) * 100

/**
 * One row per rubric category. With a single breakdown each row is a meter;
 * once the re-score arrives each row becomes a dumbbell, so the reader sees
 * which categories the rewrite actually moved.
 *
 * Categories cap at different maxima (45/35/10/5/5), so every row is drawn as
 * a share of its own max — plotting raw points would make 5/5 eligibility look
 * like a failure next to 38/45 skills.
 */
export function RubricChart({
  breakdown,
  baseline,
}: {
  breakdown: ScoringBreakdown
  baseline?: ScoringBreakdown
}) {
  return (
    <div>
      {baseline && (
        <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-viz-before" />
            Original
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-viz-after" />
            Tailored
          </span>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {CATEGORIES.map(([key, category]) => {
          const value = breakdown[key]
          const before = baseline?.[key]

          return (
            <div key={key} className="flex flex-col gap-1.5">
              {/* Label above the bar rather than beside it: the rail is narrow,
                  and a side label either truncates or starves the track. */}
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm text-muted-foreground">
                  {category.label}
                </span>
                <span className="text-sm tabular-nums text-muted-foreground">
                  {value}
                  <span className="opacity-60">/{category.max}</span>
                </span>
              </div>

              {/* px-1.5 leaves room for a dot sitting at 0% or 100% */}
              <div className="relative h-2.5 px-1.5">
                <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-[4px] bg-viz-track" />

                {before === undefined ? (
                  // Meter: square at the baseline, 4px rounded data-end.
                  <div
                    className="absolute left-0 top-1/2 h-2 -translate-y-1/2 rounded-r-[4px] bg-viz-fill transition-[width] duration-500"
                    style={{ width: `${percent(value, category.max)}%` }}
                  />
                ) : (
                  <Dumbbell
                    before={percent(before, category.max)}
                    after={percent(value, category.max)}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Dumbbell({ before, after }: { before: number; after: number }) {
  const start = Math.min(before, after)
  const width = Math.abs(after - before)

  return (
    <>
      {/* 2px connector, drawn only when the value actually moved */}
      {width > 0 && (
        <div
          className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-viz-connector"
          style={{ left: `${start}%`, width: `${width}%` }}
        />
      )}

      {/* 10px dots, each with a 2px surface ring so they stay readable when
          the score did not change and the two marks overlap */}
      <div
        className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-viz-before ring-2 ring-card"
        style={{ left: `${before}%` }}
      />
      <div
        className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-viz-after ring-2 ring-card"
        style={{ left: `${after}%` }}
      />
    </>
  )
}
