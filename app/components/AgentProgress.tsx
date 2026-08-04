'use client'

import { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { AGENT_STEPS, type AgentStep } from '@/ai/types'

export type StepTimings = Partial<
  Record<AgentStep, { startedAt: number; finishedAt?: number }>
>

function formatElapsed(ms: number): string {
  const seconds = Math.round(ms / 1000)

  if (seconds < 60) return `${seconds}s`

  return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, '0')}s`
}

export function AgentProgress({
  timings,
  failed = false,
}: {
  timings: StepTimings
  failed?: boolean
}) {
  const entries = Object.values(timings)
  const running = !failed && entries.some((timing) => !timing.finishedAt)

  // There is no way to know how far into a model call we are, so the elapsed
  // time is the honest signal that the run is still alive.
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!running) return

    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [running])

  if (entries.length === 0) return null

  return (
    <div>
      <Separator className="my-4" />

      <ul>
        {AGENT_STEPS.map(({ key, label }) => {
          const timing = timings[key]
          const done = Boolean(timing?.finishedAt)
          const active = Boolean(timing) && !done

          return (
            <li key={key} className="flex items-center gap-2">
              <span>{done ? '✅' : active ? (failed ? '⚠️' : '⏳') : '⬜'}</span>

              <span
                className={
                  active ? 'font-medium' : timing ? undefined : 'opacity-50'
                }
              >
                {label}
              </span>

              {timing && (
                <span className="text-sm opacity-60 tabular-nums">
                  {formatElapsed((timing.finishedAt ?? now) - timing.startedAt)}
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
