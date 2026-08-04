import { Separator } from '@/components/ui/separator'
import { CardTitle } from '@/components/ui/card'

function getScoreMatch(score: number) {
  if (score === 100) return { emoji: '🟢', level: 'Perfect Match!' }
  if (score >= 90) return { emoji: '🟢', level: 'Near Perfect Match!' }
  if (score >= 75) return { emoji: '🟢', level: 'Strong Match!' }
  if (score >= 60) return { emoji: '🟡', level: 'Moderate match' }
  if (score >= 40) return { emoji: '🟠', level: 'Weak match' }
  return { emoji: '🔴', level: 'Poor match' }
}

export function FeedbackPanel({
  score,
  baselineScore,
  caption,
  strengths,
  weaknesses,
  considerations,
}: {
  score: number
  baselineScore?: number
  caption?: string
  strengths: string[]
  weaknesses: string[]
  considerations?: string[]
}) {
  return (
    <div>
      <Separator className="my-4" />
      <CardTitle className="my-2">
        {getScoreMatch(score).emoji} Score: {score}/100
        {baselineScore !== undefined && baselineScore !== score && (
          <span className="font-normal"> (was {baselineScore})</span>
        )}
      </CardTitle>
      <div>
        {getScoreMatch(score).level}
        {caption && <span className="opacity-60"> — {caption}</span>}
      </div>
      <Separator className="my-4" />
      <CardTitle className="my-2">✅ Strengths</CardTitle>
      <ul>
        {strengths?.map((s: string, i: number) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
      <Separator className="my-4" />
      <CardTitle className="my-2">⚠️ Weaknesses</CardTitle>
      <ul>
        {weaknesses?.map((w: string, i: number) => (
          <li key={i}>{w}</li>
        ))}
      </ul>

      {considerations && considerations.length > 0 && (
        <>
          <Separator className="my-4" />
          <CardTitle className="my-2">ℹ️ Considerations</CardTitle>
          <ul>
            {considerations.map((c: string, i: number) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
