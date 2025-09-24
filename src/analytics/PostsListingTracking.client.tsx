'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { track } from '@vercel/analytics'

// Tracks interactions on the posts listing page (/posts)
export default function PostsListingTracking() {
  const pathname = usePathname()

  useEffect(() => {
    // Only track on the main posts listing page
    if (pathname !== '/posts') return

    // Track page view for posts listing
    track('posts_listing_view', {
      page: 'posts_listing',
    })

    // Track clicks on post cards in the listing
    const handleClick = (e: MouseEvent) => {
      if (pathname !== '/posts') return

      const target = e.target as HTMLElement | null
      if (!target) return

      // Find nearest actionable element
      const clickable = target.closest('a, button') as HTMLElement | null
      if (!clickable) return

      // Check if it's a post card link
      const href = clickable.getAttribute('href')
      const isPostLink = href?.startsWith('/posts/') && href !== '/posts'

      if (isPostLink && href) {
        const postSlug = href.split('/posts/')[1]

        // Basic label extraction
        const label = (clickable.getAttribute('aria-label') || clickable.textContent || '')
          .trim()
          .slice(0, 120)

        track('post_card_click', {
          page: 'posts_listing',
          post_slug: postSlug,
          post_url: href,
          label: label || 'unlabeled',
        })
      }
    }

    document.addEventListener('click', handleClick, { capture: true })

    return () => {
      document.removeEventListener('click', handleClick, { capture: true } as any)
    }
  }, [pathname])

  return null
}
