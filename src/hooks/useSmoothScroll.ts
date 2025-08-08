import { useCallback } from 'react'

export interface ScrollOptions {
  behavior?: ScrollBehavior
  block?: ScrollLogicalPosition
  offset?: number
  duration?: number // Custom duration in ms for enhanced smooth scrolling
}

/**
 * Enhanced smooth scrolling hook with customizable options
 */
export const useSmoothScroll = () => {
  const scrollToElement = useCallback(
    (elementId: string, options: ScrollOptions = {}): Promise<boolean> => {
      return new Promise((resolve) => {
        const { behavior = 'smooth', block = 'start', offset = 0, duration = 800 } = options

        const element = document.getElementById(elementId)
        if (!element) {
          console.warn(
            `Element with ID "${elementId}" not found. Available IDs:`,
            Array.from(document.querySelectorAll('[id]')).map((el) => el.id),
          )
          resolve(false)
          return
        }

        // Get target position
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const targetPosition = elementPosition - offset
        const startPosition = window.pageYOffset
        const distance = targetPosition - startPosition

        // If no distance to scroll or using browser's smooth scroll
        if (Math.abs(distance) < 1 || behavior !== 'smooth' || duration <= 0) {
          if (offset !== 0) {
            window.scrollTo({
              top: targetPosition,
              behavior,
            })
          } else {
            element.scrollIntoView({
              behavior,
              block,
            })
          }

          // Use a timeout to simulate completion for browser smooth scroll
          setTimeout(() => resolve(true), behavior === 'smooth' ? 800 : 100)
          return
        }

        // Custom smooth scroll implementation with easing
        let startTime: number | null = null

        const easeInOutCubic = (t: number): number => {
          return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
        }

        const animation = (currentTime: number) => {
          if (startTime === null) startTime = currentTime

          const timeElapsed = currentTime - startTime
          const progress = Math.min(timeElapsed / duration, 1)
          const ease = easeInOutCubic(progress)

          const currentPosition = startPosition + distance * ease
          window.scrollTo(0, currentPosition)

          if (progress < 1) {
            requestAnimationFrame(animation)
          } else {
            resolve(true)
          }
        }

        requestAnimationFrame(animation)
      })
    },
    [],
  )

  const scrollToTop = useCallback((options: Omit<ScrollOptions, 'offset'> = {}) => {
    const { behavior = 'smooth', duration = 600 } = options

    if (behavior !== 'smooth' || duration <= 0) {
      window.scrollTo({ top: 0, behavior })
      return Promise.resolve(true)
    }

    return new Promise<boolean>((resolve) => {
      const startPosition = window.pageYOffset
      let startTime: number | null = null

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      }

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime

        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const ease = easeInOutCubic(progress)

        const currentPosition = startPosition * (1 - ease)
        window.scrollTo(0, currentPosition)

        if (progress < 1) {
          requestAnimationFrame(animation)
        } else {
          resolve(true)
        }
      }

      requestAnimationFrame(animation)
    })
  }, [])

  return {
    scrollToElement,
    scrollToTop,
  }
}

/**
 * Standalone function for quick scroll-to-element functionality
 */
export const smoothScrollToElement = (
  elementId: string,
  options: ScrollOptions = {},
): Promise<boolean> => {
  const { behavior = 'smooth', block = 'start', offset = 0, duration = 800 } = options

  return new Promise((resolve) => {
    const element = document.getElementById(elementId)
    if (!element) {
      console.warn(
        `Element with ID "${elementId}" not found. Available IDs:`,
        Array.from(document.querySelectorAll('[id]')).map((el) => el.id),
      )
      resolve(false)
      return
    }

    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const targetPosition = elementPosition - offset
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition

    if (Math.abs(distance) < 1 || behavior !== 'smooth' || duration <= 0) {
      if (offset !== 0) {
        window.scrollTo({
          top: targetPosition,
          behavior,
        })
      } else {
        element.scrollIntoView({
          behavior,
          block,
        })
      }

      setTimeout(() => resolve(true), behavior === 'smooth' ? 800 : 100)
      return
    }

    let startTime: number | null = null

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    }

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime

      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      const ease = easeInOutCubic(progress)

      const currentPosition = startPosition + distance * ease
      window.scrollTo(0, currentPosition)

      if (progress < 1) {
        requestAnimationFrame(animation)
      } else {
        resolve(true)
      }
    }

    requestAnimationFrame(animation)
  })
}
