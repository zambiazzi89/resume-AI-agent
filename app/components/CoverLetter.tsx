'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function CoverLetter({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="gap-4 p-6">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-medium">Cover letter</p>

        <Button variant="outline" size="sm" onClick={handleCopy}>
          {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>

      <p className="max-w-prose text-sm whitespace-pre-line">{text}</p>
    </Card>
  )
}
