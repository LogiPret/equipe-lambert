// Central smooth scrolling utility to replace ad-hoc scrollToBlock implementations
// Usage: import { scrollToBlock } from '@/utilities/smoothScroll'
// scrollToBlock('target-id', { offset: 80 })

export interface ScrollToBlockOptions {
  offset?: number // pixels to offset from top (e.g. sticky header height)
  duration?: number // animation duration in ms
  ease?: (t: number) => number // optional easing function
  focus?: boolean // move focus to element after scroll for accessibility
}

const defaultEase = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export function scrollToBlock(id: string, options: ScrollToBlockOptions = {}): Promise<boolean> {
  const { offset = 0, duration = 700, ease = defaultEase, focus = true } = options

  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false)

    const el = document.getElementById(id)
    if (!el) {
      console.warn(
        `scrollToBlock: element with id "${id}" not found. Available ids:`,
        Array.from(document.querySelectorAll('[id]')).map((e) => e.id),
      )
      return resolve(false)
    }

    const startY = window.pageYOffset
    const targetY = el.getBoundingClientRect().top + window.pageYOffset - offset
    const distance = targetY - startY

    // If native smooth scroll supported and no custom duration/ease required, use it
    if ('scrollBehavior' in document.documentElement.style && duration <= 0) {
      window.scrollTo({ top: targetY, behavior: 'smooth' })
      if (focus) setTimeout(() => el.focus?.(), 750)
      return resolve(true)
    }

    if (Math.abs(distance) < 2) {
      if (focus) el.focus?.()
      return resolve(true)
    }

    let startTime: number | null = null

    const step = (ts: number) => {
      if (startTime == null) startTime = ts
      const elapsed = ts - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = ease(progress)
      window.scrollTo(0, startY + distance * eased)
      if (progress < 1) requestAnimationFrame(step)
      else {
        if (focus) el.focus?.({ preventScroll: true })
        resolve(true)
      }
    }

    requestAnimationFrame(step)
  })
}
