'use client'

import { useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * The theme lives on <html> (set before paint by the inline script in the
 * layout), so the class list is the source of truth and this component reads
 * it rather than keeping a second copy in state.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })

  return () => observer.disconnect()
}

const isDark = () => document.documentElement.classList.contains('dark')

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false)

  const toggle = () => {
    const next = !dark

    document.documentElement.classList.toggle('dark', next)

    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      // Private mode or blocked storage: the toggle still works for this visit.
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {dark ? <Sun aria-hidden /> : <Moon aria-hidden />}
    </Button>
  )
}
