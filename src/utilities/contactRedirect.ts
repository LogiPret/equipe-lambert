// Utility functions for redirecting acheter/vendre links to contact block and general scroll functionality

export function handleScrollRedirect(href: string): boolean {
  // Check if this is a scroll-to-section link
  if (typeof window === 'undefined') {
    return false
  }

  // Handle contact redirects
  if (href === '/contact-acheter' || href === '/contact-vendre') {
    scrollToContactBlock()
    return true
  }

  // Handle general scroll-to-section links (format: #section-id)
  if (href.startsWith('#')) {
    const sectionId = href.substring(1)
    scrollToSection(sectionId)
    return true
  }

  // Handle scroll-to-section links with /scroll-to/ prefix
  if (href.startsWith('/scroll-to/')) {
    const sectionId = href.substring('/scroll-to/'.length)
    scrollToSection(sectionId)
    return true
  }

  return false
}

export function scrollToSection(sectionId: string): void {
  if (typeof window === 'undefined') {
    return
  }

  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}

export function scrollToContactBlock(): void {
  scrollToSection('contact-block')
}

// Keep the old function name for backward compatibility
export const handleContactRedirect = handleScrollRedirect
