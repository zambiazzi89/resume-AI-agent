import type { ResumeType } from '@/app/api/data/resume'
import type { AnalyzeResponse } from './schemas/analyze'
import type { CritiqueResponse } from './schemas/critique'

/**
 * Shared by the agent, the route, and the client. Everything imported here is
 * type-only except AGENT_STEPS, so importing this from a client component does
 * not pull the OpenAI client into the browser bundle.
 */
export const AGENT_STEPS = [
  { key: 'analyze', label: 'Screening resume' },
  { key: 'critique', label: 'Identifying improvements' },
  { key: 'improve', label: 'Rewriting' },
  { key: 'rescore', label: 'Re-scoring' },
] as const

export type AgentStep = (typeof AGENT_STEPS)[number]['key']

export type AgentResult = {
  initialAnalysis: AnalyzeResponse
  critique: CritiqueResponse
  improvedResume: ResumeType
  coverLetter: string
  finalAnalysis: AnalyzeResponse
}

export type AgentEvent =
  | { type: 'step:start'; step: AgentStep }
  | { type: 'step:done'; step: AgentStep; data: Partial<AgentResult> }
  | { type: 'error'; message: string }
