'use client'

import { useState } from 'react'
import { Download, Sparkles } from 'lucide-react'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { ResumeLayout } from './components/ResumeLayout'
import { FeedbackPanel } from './components/FeedbackPanel'
import { ScoreCard } from './components/ScoreCard'
import { ChangesPanel } from './components/ChangesPanel'
import { CoverLetter } from './components/CoverLetter'
import { ThemeToggle } from './components/ThemeToggle'
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
  // the calibrated re-score once step 4 completes.
  const analysis = result.finalAnalysis ?? result.initialAnalysis
  const baseline = result.finalAnalysis ? result.initialAnalysis : undefined
  const hasOutput = Boolean(result.improvedResume || result.critique)

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Career Assistant Agent
          </h1>
          <p className="text-sm text-muted-foreground">
            Score your resume against a posting, tailor it, then score it again.
          </p>
        </div>

        <ThemeToggle />
      </header>

      <div className="grid gap-6 lg:grid-cols-[22rem_1fr] lg:items-start">
        {/* Left rail — sticky so the score stays visible while reading the
            resume on the right */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-10">
          <Card className="gap-3 p-6">
            <label
              htmlFor="job-description"
              className="text-sm font-medium"
            >
              Job description
            </label>

            <Textarea
              id="job-description"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={10}
              className="min-h-44 resize-y"
            />

            <Button
              onClick={handleAnalyze}
              disabled={loading || !jobDescription.trim()}
            >
              <Sparkles aria-hidden />
              {loading ? 'Analyzing...' : 'Analyze'}
            </Button>
          </Card>

          {Object.keys(timings).length > 0 && (
            <Card className="p-6">
              <AgentProgress timings={timings} failed={Boolean(error)} />
            </Card>
          )}

          {error && (
            <Card className="border-destructive/40 p-6">
              <p className="text-sm text-destructive">{error}</p>
            </Card>
          )}

          {analysis && <ScoreCard analysis={analysis} baseline={baseline} />}
        </div>

        {/* Right column — the deliverables */}
        <div className="flex flex-col gap-4">
          {analysis && (
            <FeedbackPanel
              strengths={analysis.strengths}
              weaknesses={analysis.weaknesses}
              considerations={analysis.considerations}
            />
          )}

          {hasOutput && (
            <Tabs defaultValue="resume">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <TabsList>
                  <TabsTrigger value="resume">Resume</TabsTrigger>
                  <TabsTrigger value="cover-letter" disabled={!result.coverLetter}>
                    Cover letter
                  </TabsTrigger>
                  <TabsTrigger value="changes" disabled={!result.critique}>
                    What changed
                  </TabsTrigger>
                </TabsList>

                {result.improvedResume && (
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download aria-hidden />
                    Download .docx
                  </Button>
                )}
              </div>

              <TabsContent value="resume">
                {result.improvedResume ? (
                  <ResumeLayout resume={result.improvedResume} />
                ) : (
                  <Card className="p-6 text-sm text-muted-foreground">
                    Still rewriting — the tailored resume appears here as soon
                    as it is ready.
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="cover-letter">
                {result.coverLetter && <CoverLetter text={result.coverLetter} />}
              </TabsContent>

              <TabsContent value="changes">
                {result.critique && <ChangesPanel critique={result.critique} />}
              </TabsContent>
            </Tabs>
          )}

          {!analysis && !loading && (
            <Card className="p-10 text-center text-sm text-muted-foreground">
              Paste a job description to get started.
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}
