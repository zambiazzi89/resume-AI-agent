import { NextResponse } from 'next/server'

import { resume } from '../data/resume'
import { careerProfile } from '../data/careerProfile'
import { runAgent } from '@/ai/agent'
import type { AgentEvent } from '@/ai/types'

// Four sequential model calls. Without this the platform kills the function
// mid-run; streaming keeps proxies alive but does not extend the hard limit.
export const maxDuration = 300

const encoder = new TextEncoder()

function encode(event: AgentEvent): Uint8Array {
  return encoder.encode(`${JSON.stringify(event)}\n`)
}

export async function POST(req: Request) {
  let jobDescription: unknown

  try {
    ;({ jobDescription } = await req.json())
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (typeof jobDescription !== 'string' || !jobDescription.trim()) {
    return NextResponse.json(
      { error: 'Missing job description' },
      { status: 400 },
    )
  }

  const events = runAgent(jobDescription, resume, careerProfile)

  const stream = new ReadableStream({
    // Pulling one event at a time keeps the generator lazy: no model call
    // starts until the client is ready for the previous result.
    async pull(controller) {
      try {
        const { value, done } = await events.next()

        if (done) {
          controller.close()
          return
        }

        controller.enqueue(encode(value))
      } catch (error) {
        console.error(error)

        controller.enqueue(
          encode({ type: 'error', message: 'Something went wrong' }),
        )
        controller.close()
      }
    },

    // Stop the pipeline when the user navigates away or aborts.
    cancel() {
      void events.return(undefined)
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-store, no-transform',
      'X-Accel-Buffering': 'no',
    },
  })
}
