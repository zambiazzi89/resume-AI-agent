import { z } from 'zod'
import { zodTextFormat } from 'openai/helpers/zod'

import client from './client'

const MODEL = 'gpt-5-mini'

export async function parse<S extends z.ZodType>(
  prompt: string,
  schema: S,
  schemaName: string,
): Promise<z.infer<S>> {
  const response = await client.responses.parse({
    model: MODEL,

    input: prompt,

    text: {
      format: zodTextFormat(schema, schemaName),
    },
  })

  if (!response.output_parsed) {
    throw new Error(
      `Model failed to produce structured output for "${schemaName}".`,
    )
  }

  return response.output_parsed
}
