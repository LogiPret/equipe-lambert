import { smoothScrollToElement } from '@/hooks/useSmoothScroll'

/**
 * Legacy scroll function replacement that uses enhanced smooth scrolling
 * Use this to replace existing scrollToBlock functions in your blocks
 */
export const scrollToBlock = (blockId: string, offset = 80) => {
  return smoothScrollToElement(blockId, {
    behavior: 'smooth',
    block: 'start',
    offset,
    duration: 800,
  })
}

/**
 * Enhanced button click handler for blocks that need scroll functionality
 * This replaces the handleButtonClick functions in your hero blocks
 */
export const handleActionButtonClick = (button: {
  actionType?: 'scroll' | 'link'
  scrollTarget?: string
  link?: {
    type: 'custom' | 'reference'
    url?: string
    newTab?: boolean
    reference?: {
      relationTo: 'pages' | 'posts'
      value: string | { slug: string }
    }
  }
}) => {
  if (button.actionType === 'scroll' && button.scrollTarget) {
    scrollToBlock(button.scrollTarget)
  } else if (button.actionType === 'link' && button.link) {
    const { link } = button
    if (link.type === 'custom' && link.url) {
      if (link.newTab) {
        window.open(link.url, '_blank', 'noopener,noreferrer')
      } else {
        window.location.href = link.url
      }
    } else if (link.type === 'reference' && link.reference) {
      // Handle internal references
      const href =
        typeof link.reference.value === 'object' && link.reference.value.slug
          ? `${link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''}/${link.reference.value.slug}`
          : '/'

      if (link.newTab) {
        window.open(href, '_blank', 'noopener,noreferrer')
      } else {
        window.location.href = href
      }
    }
  }
}

/**
 * Quick replacement for existing scroll functions in your blocks
 * Simply replace your existing scrollToBlock calls with this
 */
export const enhancedScrollToBlock = (blockId: string) => {
  const element = document.getElementById(blockId)
  if (element) {
    return smoothScrollToElement(blockId, {
      behavior: 'smooth',
      block: 'start',
      offset: 80, // Account for fixed header
      duration: 800,
    })
  } else {
    console.warn(
      `Block with ID "${blockId}" not found. Available IDs:`,
      Array.from(document.querySelectorAll('[id]')).map((el) => el.id),
    )
    return Promise.resolve(false)
  }
}
