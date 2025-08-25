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
  const isExcludedPage =
    /^\/posts\/[^/]+$/.test(pathname || '') || pathname === '/acheter' || pathname === '/vendre'

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Hide entire header on single post pages
  if (isExcludedPage) return null

  return (
    <header
      className={`${isHomePage ? 'sticky top-0 sm:absolute sm:top-0 sm:left-0 sm:right-0 z-50 bg-brandingtheme-foreground sm:bg-transparent w-full max-w-full pb-2' : 'container relative z-20'}`}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      {isHomePage && <div className="absolute inset-0 bg-transparent pointer-events-none"></div>}

      <div
        className={`${
          isHomePage
            ? 'w-full max-w-full py-4 sm:py-8 flex justify-between items-center px-4 sm:px-6 relative z-10 box-border'
            : 'py-8 flex justify-between items-center'
        }`}
      >
        <Link href="/">
          <Logo
            loading="eager"
            priority="high"
            className={`${
              isHomePage
                ? 'drop-shadow-lg filter brightness-100 invert dark:invert-0 sm:invert sm:dark:invert'
                : 'sm:invert dark:invert-0'
            }`}
          />
        </Link>
        {<HeaderNav data={data} isHomePage={isHomePage} />}
      </div>
    </header>
  )
}
