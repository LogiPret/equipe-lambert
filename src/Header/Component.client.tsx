'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useTheme } from '@/providers/Theme'
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
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Determine header type (only after mounting to avoid hydration mismatch)
  const isHomePage = mounted && pathname === '/'
  const isPostPage = mounted && (/^\/posts\/[^/]+$/.test(pathname || '') || pathname === '/posts')
  const isExcludedPage = mounted && (pathname === '/acheter' || pathname === '/vendre')

  useEffect(() => {
    setMounted(true)
  }, [])

  // Hide entire header on excluded pages
  if (isExcludedPage) return null

  // Show a default header during server-side rendering and initial client render
  if (!mounted) {
    return (
      <header className="container relative z-20 pt-4">
        <div className="py-8 flex justify-between items-center">
          <Link href="/">
            <Logo loading="eager" priority="high" className="sm:invert dark:invert" />
          </Link>
          <HeaderNav data={data} variant="global" />
        </div>
      </header>
    )
  }

  // Render homepage header
  if (isHomePage) {
    return (
      <header className="sticky top-0 pt-4 sm:absolute sm:top-0 sm:left-0 sm:right-0 z-50 bg-brandingtheme-foreground sm:bg-transparent w-full max-w-full pb-2">
        <div className="absolute inset-0 bg-transparent pointer-events-none"></div>
        <div className="w-full max-w-full py-4 sm:py-8 flex justify-between items-center px-4 sm:px-6 relative z-10 box-border">
          <Link href="/">
            <Logo
              loading="eager"
              priority="high"
              className="drop-shadow-lg filter brightness-100 invert sm:invert-0 sm:dark:invert-0"
            />
          </Link>
          <HeaderNav data={data} variant="homepage" />
        </div>
      </header>
    )
  }

  // Render posts header
  if (isPostPage) {
    return (
      <header className="relative z-20">
        {/* Gradient background */}
        <div className="absolute inset-0 w-full h-40 bg-gradient-to-b from-brandingtheme-foreground to-transparent pointer-events-none"></div>

        {/* Constrained content with same grid layout as PostHero */}
        <div className="container relative pt-12 lg:grid lg:grid-cols-[1fr_64rem_1fr]">
          <div className="col-start-1 col-span-1 lg:col-start-2 lg:col-span-1 flex justify-between items-center">
            <Link href="/">
              <Logo loading="eager" priority="high" className="invert dark:invert-0" />
            </Link>
            <HeaderNav data={data} variant="posts" />
          </div>
        </div>
      </header>
    )
  }

  // Render global header (default)
  return (
    <header className="container relative z-20 pt-4">
      <div className="py-8 flex justify-between items-center">
        <Link href="/">
          <Logo loading="eager" priority="high" className="sm:invert dark:invert-0" />
        </Link>
        <HeaderNav data={data} variant="global" />
      </div>
    </header>
  )
}
