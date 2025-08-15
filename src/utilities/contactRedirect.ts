// Utility functions for redirecting acheter/vendre links to contact block

export function handleContactRedirect(href: string): boolean {
  // Check if this is an acheter or vendre link that should redirect to contact
  if (typeof window === 'undefined') {
    return false
  }
  
  if (href === '/contact-acheter' || href === '/contact-vendre') {
    scrollToContactBlock()
    return true
  }
  
  return false
}

export function scrollToContactBlock(): void {
  if (typeof window === 'undefined') {
    return
  }
  
  const contactBlock = document.getElementById('contact-block')
  if (contactBlock) {
    contactBlock.scrollIntoView({ behavior: 'smooth' })
  }
}
