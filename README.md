# Career Assistant Agent

Paste a job description, and the agent scores your resume against it, rewrites it for that
posting, and re-scores the result — so you can see whether the rewrite actually helped.

Built with Next.js 16 (App Router), the OpenAI Responses API with Zod-validated structured
outputs, Tailwind, and shadcn/ui.

## How it works

The agent runs four sequential model calls, each with its own prompt and schema:

| Step | Role | Output |
| --- | --- | --- |
| 1. Screening | Strict recruiter. Evaluates only — never rewrites. | Score, per-category breakdown, strengths, genuine gaps, undersold strengths, considerations |
| 2. Critique | Senior recruiter briefing a writer. | Actionable edits, true skill gaps, bullet-level rewrites |
| 3. Rewrite | Resume writer. The only step that produces text. | Tailored resume + cover letter |
| 4. Re-score | Same screener, calibrated against step 1. | Final score and breakdown |

Three design decisions are worth knowing before you change anything:

**The career profile is the source of truth, not the resume.**
[`careerProfile.ts`](app/api/data/careerProfile.ts) records what the candidate has actually
done — technology by technology, with an `experienceLevel` and evidence for each, plus
incidents, accomplishments, and capabilities. It is deliberately broader than the resume.
Every step reads it, which is what lets the pipeline tell two very different situations apart:

- the posting wants EC2, the profile records hands-on EC2, the resume never mentions it → an **undersold strength**, and the rewrite pulls it in
- the posting wants Kubernetes and neither the profile nor the resume has it → a **genuine gap**, reported to you and kept out of the resume

Before this distinction existed, both cases looked identical and came back as "no EC2
experience," which was true of the resume and false of the candidate.

**Scoring is anchored, not independent.** Step 4 receives the original resume and its category
scores, with instructions that presentation changes — better verbs, reordering, keyword
insertion — must not move the score. What *does* raise it is the rewrite surfacing a real,
profile-backed qualification the previous version omitted. Without this anchor the two analyses
are independent samples and the before/after delta mostly measures model variance.

Note that step 1 scores the resume **as written**, not the profile. A recruiter screens the
resume, so a qualification the resume fails to convey earns no points yet — that gap is the
thing the pipeline exists to close, and it is where the score improvement comes from.

**Only step 3 writes, and it is bounded by the profile.** Companies, dates, education, and work
eligibility are copied verbatim, and no role is ever added, dropped, or merged. Within those
bounds the step may add bullets and skills — but only ones the profile supports, placed at the
`experienceLevel` the profile records, attached to the role that actually produced them, with
metrics reproduced exactly as written (hedges included). Anything the profile does not record
stays out, including every gap step 2 identifies.

The rubric lives in [`ai/rubric.ts`](ai/rubric.ts) and is the single source of truth: the prompt
text is generated from it, and a `satisfies` constraint ties its keys to the scoring schema, so
the two can't drift apart. Totals are recomputed from the category breakdown in code rather than
trusted from the model.

## Getting started

Requires Node 20.9+ (Next.js 16's minimum) and an OpenAI API key.

```bash
npm install
```

Create `.env.local` in the project root:

```bash
OPENAI_API_KEY=sk-...
```

Then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), paste a job description, and click Analyze.

A full run makes four model calls and takes a while. The UI streams progress: each step shows
as it starts, with an elapsed timer, and results render as they arrive — the initial score
after step 1, and the tailored resume and cover letter after step 3, while the re-score is
still running.

## Using your own resume

Two typed objects, not file uploads:

- [`app/api/data/resume.ts`](app/api/data/resume.ts) — the resume being rewritten. `ResumeSchema`
  in the same file defines the shape and is reused as the model's output schema.
- [`app/api/data/careerProfile.ts`](app/api/data/careerProfile.ts) — everything you have actually
  done, including work the resume omits. The more evidence here, the more the rewrite has to draw
  on; anything absent is treated as something you cannot claim.

Keep `experienceLevel` honest in the profile (`hands-on` / `working-knowledge` / `exposure`) —
the rewrite uses it to decide how strongly a technology may be presented.

Some personal details are hardcoded outside that object and need editing separately:

- [`app/components/ResumeLayout.tsx`](app/components/ResumeLayout.tsx) — name, contact line, and education block
- [`app/api/download-resume/route.ts`](app/api/download-resume/route.ts) — the same details again, for the .docx export

## Project structure

```
ai/
  agent.ts        Async generator; yields a progress event per step
  parser.ts       Wraps responses.parse with a Zod schema
  profile.ts      Projects the career profile per step (index vs. full detail)
  rubric.ts       Scoring categories, caps, and anchors
  types.ts        Event and result types shared with the client
  prompts/        One prompt builder per step
  schemas/        Zod schemas that constrain each step's output
app/
  api/analyze/    Streams NDJSON events from the agent
  api/data/       resume.ts (the artifact) and careerProfile.ts (the evidence)
  api/download-resume/  Renders the tailored resume as .docx
  components/     Progress list, score card, rubric chart, changes panel
lib/ndjson.ts     Client-side NDJSON stream reader
```

The analyze route streams newline-delimited JSON rather than returning a single JSON body. It
pulls one event at a time from the generator, so no model call starts until the client has
consumed the previous result, and closing the tab cancels the remaining steps.

## Configuration

- **Model** — set in [`ai/parser.ts`](ai/parser.ts) (`gpt-5-mini`). All four steps share it.
- **Timeout** — `maxDuration = 300` in [`app/api/analyze/route.ts`](app/api/analyze/route.ts).
  Streaming keeps proxies from timing out but does not extend a serverless function's hard
  limit, so check your platform's ceiling before deploying.
- **Rubric weights** — [`ai/rubric.ts`](ai/rubric.ts). Changing a `max` updates the prompt and
  the clamping logic together; adding or renaming a category requires a matching change to
  `ScoringBreakdownSchema`, which the compiler will enforce.

## Scripts

```bash
npm run dev     # development server
npm run build   # production build (also typechecks)
npm start       # serve the production build
npm run lint    # eslint
```
