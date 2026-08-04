'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardTitle } from '@/components/ui/card'
import { ResumeLayout } from './components/ResumeLayout'
import { FeedbackPanel } from './components/FeedbackPanel'
import { AgentProgress, type StepTimings } from './components/AgentProgress'
import { readNdjson } from '@/lib/ndjson'
import type { AgentEvent, AgentResult } from '@/ai/types'

export default function Home() {
  const [jobDescription, setJobDescription] = useState('')

  const [result, setResult] = useState<Partial<AgentResult>>({})
  const [timings, setTimings] = useState<StepTimings>({})
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    setLoading(true)
    setResult({})
    setTimings({})
    setError(null)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: JSON.stringify({ jobDescription }),
      })

      if (!res.ok || !res.body) throw new Error(`Analyze failed (${res.status})`)

      for await (const event of readNdjson<AgentEvent>(res.body)) {
        if (event.type === 'error') {
          setError(event.message)
          continue
        }

        if (event.type === 'step:start') {
          setTimings((prev) => ({
            ...prev,
            [event.step]: { startedAt: Date.now() },
          }))
          continue
        }

        setTimings((prev) => ({
          ...prev,
          [event.step]: {
            startedAt: Date.now(),
            ...prev[event.step],
            finishedAt: Date.now(),
          },
        }))

        setResult((prev) => ({ ...prev, ...event.data }))
      }
    } catch (err) {
      console.error(err)
      setError('Could not reach the analyzer. Please try again.')
    }

    setLoading(false)
  }

  const handleDownload = async () => {
    if (!result.improvedResume) return

    const res = await fetch('/api/download-resume', {
      method: 'POST',
      body: JSON.stringify({ resume: result.improvedResume }),
    })

    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'resume.docx'
    a.click()
  }

  // The initial screening renders as soon as step 1 lands, then is replaced by
  // the re-score once step 4 completes.
  const analysis = result.finalAnalysis ?? result.initialAnalysis

  return (
    <Card className="m-12 p-12 bg-secondary border-black">
      <CardTitle>Career Assistant Agent</CardTitle>

      <Textarea
        placeholder="Paste the job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={10}
        className="w-full min-h-40 bg-primary-foreground"
      />

      <Button onClick={handleAnalyze} disabled={loading || !jobDescription.trim()}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </Button>

      <AgentProgress timings={timings} failed={Boolean(error)} />

      {error && <div className="text-destructive">{error}</div>}

      {analysis && (
        <FeedbackPanel
          score={analysis.score}
          baselineScore={
            result.finalAnalysis ? result.initialAnalysis?.score : undefined
          }
          caption={
            result.finalAnalysis ? 'Tailored resume' : 'Original resume'
          }
          strengths={analysis.strengths}
          weaknesses={analysis.weaknesses}
          considerations={analysis.considerations}
        />
      )}

      {result.improvedResume && (
        <>
          <Separator className="my-4" />
          <div className="flex justify-between">
            <CardTitle>📄 Tailored Resume</CardTitle>
            <Button onClick={handleDownload} className="w-fit">
              Download (.docx)
            </Button>
          </div>
          <ResumeLayout resume={result.improvedResume} />
        </>
      )}

      {result.coverLetter && (
        <>
          <Separator className="my-4" />
          <div style={{ marginTop: 20 }}>
            <h2>✉️ Cover Letter</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{result.coverLetter}</p>
          </div>
        </>
      )}
    </Card>
  )
}
