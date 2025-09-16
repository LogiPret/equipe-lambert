'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { track } from '@vercel/analytics'

// Tracks block impressions when at least 50% of a block is visible
// and button clicks within the acheter landing page.
export default function AcheterTracking() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/acheter') return

    // Track block visibility
    const blocks = Array.from(
      document.querySelectorAll('[data-block-type][data-block-index]'),
    ) as HTMLElement[]

    const seen = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const el = entry.target as HTMLElement
            const type = el.dataset.blockType || 'unknown'
            const index = el.dataset.blockIndex || '0'
            const id = `${type}-${index}`
            if (!seen.has(id)) {
              seen.add(id)
              track('block_view', { page: 'acheter', block_type: type, block_index: index })
            }
          }
        })
      },
      { threshold: [0.5] },
    )

    blocks.forEach((b) => io.observe(b))

    // Track button clicks (links and buttons)
    const handleClick = (e: MouseEvent) => {
      if (pathname !== '/acheter') return
      const target = e.target as HTMLElement | null
      if (!target) return

      // Find nearest actionable element
      const clickable = target.closest('a, button') as HTMLElement | null
      if (!clickable) return

      // Basic label extraction
      const label = (clickable.getAttribute('aria-label') || clickable.textContent || '')
        .trim()
        .slice(0, 120)

      // Determine context block if any
      const wrapper = clickable.closest('[data-block-type]') as HTMLElement | null
      const blockType = wrapper?.dataset.blockType || 'unknown'
      const blockIndex = wrapper?.dataset.blockIndex || 'NA'

      track('button_click', {
        page: 'acheter',
        label: label || 'unlabeled',
        block_type: blockType,
        block_index: blockIndex,
      })
    }

    document.addEventListener('click', handleClick, { capture: true })

    return () => {
      io.disconnect()
      document.removeEventListener('click', handleClick, { capture: true } as any)
    }
  }, [pathname])

  return null
}
