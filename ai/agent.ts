import { ResumeType } from '../app/api/data/resume'
import type { CareerProfile } from '../app/api/data/careerProfile'

import { parse } from './parser'
import { RUBRIC } from './rubric'
import { AgentEvent } from './types'

import { AnalyzeSchema, AnalyzeResponse } from './schemas/analyze'
import { CritiqueSchema } from './schemas/critique'
import { ImproveSchema } from './schemas/improve'

import { getAnalyzePrompt } from './prompts/analyze'
import { getCritiquePrompt } from './prompts/critique'
import { getImprovePrompt } from './prompts/improve'

export type { AgentEvent, AgentResult, AgentStep } from './types'

/**
 * The model sometimes reports a total that disagrees with its own category
 * scores. The breakdown is the reasoned part, so clamp it to the rubric caps
 * and recompute the total from it.
 */
function normalizeScores(analysis: AnalyzeResponse): AnalyzeResponse {
  const breakdown = { ...analysis.scoringBreakdown }

  let category: keyof typeof breakdown
  for (category in breakdown) {
    const clamped = Math.min(Math.max(breakdown[category], 0), RUBRIC[category].max)
    breakdown[category] = Math.round(clamped)
  }

  const score = Object.values(breakdown).reduce((sum, value) => sum + value, 0)

  if (score !== analysis.score) {
    console.warn(
      `Score mismatch: model reported ${analysis.score}, breakdown sums to ${score}. Using ${score}.`,
    )
  }

  return { ...analysis, scoringBreakdown: breakdown, score }
}

/**
 * Yields one event per step so the caller can report progress and render
 * partial results. The tailored resume lands on step 3; step 4 only scores it.
 */
export async function* runAgent(
  jobDescription: string,
  resume: ResumeType,
  profile: CareerProfile,
): AsyncGenerator<AgentEvent> {
  //
  // STEP 1 — evaluate the resume as-is, with the profile available so a
  // qualification the resume omits reads as undersold rather than missing
  //
  yield { type: 'step:start', step: 'analyze' }

  const initialAnalysis = normalizeScores(
    await parse(
      getAnalyzePrompt(jobDescription, resume, profile),
      AnalyzeSchema,
      'initial_analysis',
    ),
  )

  yield { type: 'step:done', step: 'analyze', data: { initialAnalysis } }

  //
  // STEP 2 — turn the evaluation into actionable, truthful edits
  //
  yield { type: 'step:start', step: 'critique' }

  const critique = await parse(
    getCritiquePrompt(jobDescription, resume, profile, initialAnalysis),
    CritiqueSchema,
    'critique',
  )

  yield { type: 'step:done', step: 'critique', data: { critique } }

  //
  // STEP 3 — apply the edits; the only step that writes
  //
  yield { type: 'step:start', step: 'improve' }

  const improvement = await parse(
    getImprovePrompt(jobDescription, resume, profile, critique),
    ImproveSchema,
    'improvement',
  )

  yield {
    type: 'step:done',
    step: 'improve',
    data: {
      improvedResume: improvement.tailoredResume,
      coverLetter: improvement.coverLetter,
    },
  }

  //
  // STEP 4 — re-evaluate, calibrated against step 1 so the delta means something
  //
  yield { type: 'step:start', step: 'rescore' }

  const finalAnalysis = normalizeScores(
    await parse(
      getAnalyzePrompt(jobDescription, improvement.tailoredResume, profile, {
        resume,
        analysis: initialAnalysis,
      }),
      AnalyzeSchema,
      'final_analysis',
    ),
  )

  yield { type: 'step:done', step: 'rescore', data: { finalAnalysis } }
}
