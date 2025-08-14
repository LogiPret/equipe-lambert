'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  // Check if this is the home page
  const isHomePage = pathname === '/'
  // Check if this is a single post page (e.g., /posts/my-slug)
  const isPostDetailPage = /^\/posts\/[^/]+$/.test(pathname || '')

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Hide entire header on single post pages
  if (isPostDetailPage) return null

  return (
    <header
      className={`${isHomePage ? 'absolute text-branding100 top-0 left-0 right-0 z-50 pt-8' : 'container relative z-20'}`}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      {/* Gradient overlay for better text visibility on home page */}
      {isHomePage && <div className="absolute inset-0 pointer-events-none"></div>}

      <div
        className={`${
          isHomePage
            ? 'container mx-auto py-8 flex justify-between rounded-xl px-6 mt-4 relative z-10'
            : 'py-8 flex justify-between'
        }`}
      >
        <Link href="/">
          <Logo
            loading="eager"
            priority="high"
            className={`${
              isHomePage ? 'drop-shadow-lg filter brightness-100 invert' : 'invert dark:invert-0'
            }`}
          />
        </Link>
        {!isPostDetailPage && <HeaderNav data={data} isHomePage={isHomePage} />}
      </div>
    </header>
  )
}
