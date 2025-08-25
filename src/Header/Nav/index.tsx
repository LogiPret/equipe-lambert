'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType; isHomePage?: boolean }> = ({
  data,
  isHomePage = false,
}) => {
  const navItems = data?.navItems || []

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-block')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="flex gap-1 sm:gap-3 items-center flex-shrink-0">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className={`${isHomePage ? 'text-branding0 sm:text-branding100 drop-shadow-lg' : ''} text-sm sm:text-base whitespace-nowrap`}
          />
        )
      })}
      <button
        onClick={scrollToContact}
        className={`px-2 lg:px-4 py-2 rounded-lg transition-colors duration-200 text-sm sm:text-base whitespace-nowrap flex-shrink-0 ${
          isHomePage
            ? 'sm:bg-branding100 bg-branding0 sm:text-branding0 text-branding100 hover:bg-branding75 drop-shadow-lg'
            : 'bg-primary text-brandingtheme-foreground hover:bg-primary/90'
        }`}
      >
        Nous contacter
      </button>
    </nav>
  )
}
