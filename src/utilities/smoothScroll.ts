// Smooth scrolling utility (enhanced)
// Provides consistent smooth scroll with optional offset, duration and easing.
// Falls back to native smooth scrolling when available for better performance.

interface ScrollOptions {
  offset?: number
  duration?: number // milliseconds (manual mode)
  easing?: (t: number) => number
  focus?: boolean // focus target after scroll
  forceManual?: boolean // force manual rAF animation (ignore native smooth)
  ignoreReducedMotion?: boolean // ignore prefers-reduced-motion
}

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

function supportsNativeSmooth(): boolean {
  return typeof document !== 'undefined' && 'scrollBehavior' in document.documentElement.style
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

export async function smoothScrollTo(
  targetY: number,
  {
    duration = 600,
    easing = easeInOutCubic,
    forceManual = true,
    ignoreReducedMotion: _ignoreReducedMotion = true,
  }: ScrollOptions = {},
): Promise<void> {
  if (typeof window === 'undefined') return

  const reduce = false // override for always-animate requirement

  // Prefer native smooth scrolling when supported, allowed, and no custom easing requested
  if (!forceManual && supportsNativeSmooth() && easing === easeInOutCubic) {
    window.scrollTo({ top: targetY, behavior: reduce ? 'auto' : 'smooth' })
    // Approximate wait so callers can chain logic if needed
    if (!reduce) await sleep(Math.min(Math.max(duration, 300), 1200))
    return
  }

  const startY = window.scrollY || window.pageYOffset
  const distance = targetY - startY

  // If distance negligible or reduced motion requested, jump directly
  if (Math.abs(distance) < 2) {
    window.scrollTo(0, targetY)
    return
  }

  return new Promise((resolve) => {
    let startTime: number | null = null
    const step = (ts: number) => {
      if (startTime === null) startTime = ts
      const elapsed = ts - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easing(progress)
      window.scrollTo(0, startY + distance * eased)
      if (elapsed < duration) requestAnimationFrame(step)
      else resolve()
    }
    requestAnimationFrame(step)
  })
}

export async function scrollToBlock(
  blockId: string,
  options: ScrollOptions = {},
): Promise<boolean> {
  if (typeof document === 'undefined') return false
  const el = document.getElementById(blockId)
  if (!el) {
    console.warn(`scrollToBlock: element with id "${blockId}" not found`)
    return false
  }
  const rect = el.getBoundingClientRect()
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  // Center the element in the viewport by default
  let targetY =
    (window.scrollY || window.pageYOffset) + rect.top + rect.height / 2 - viewportHeight / 2
  // Apply optional offset (positive offset moves element further up)
  if (options.offset) targetY -= options.offset
  // Clamp to valid scroll range
  const maxScroll = Math.max(
    0,
    (document.documentElement.scrollHeight || document.body.scrollHeight) - viewportHeight,
  )
  if (targetY < 0) targetY = 0
  if (targetY > maxScroll) targetY = maxScroll
  await smoothScrollTo(targetY, options)
  if (options.focus) {
    const focusable = el as HTMLElement
    if (focusable && typeof focusable.focus === 'function') {
      if (focusable.tabIndex === -1) focusable.tabIndex = -1
      focusable.focus({ preventScroll: true })
    }
  }
  return true
}

export function scrollToTop(options: Omit<ScrollOptions, 'focus'> = {}) {
  return smoothScrollTo(0, options)
}
