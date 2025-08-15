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
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className={isHomePage ? 'text-branding100 drop-shadow-lg' : ''}
          />
        )
      })}
      <button
        onClick={scrollToContact}
        className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
          isHomePage
            ? 'bg-branding100 text-branding0 hover:bg-branding75 drop-shadow-lg'
            : 'bg-primary text-white hover:bg-primary/90'
        }`}
      >
        Nous contacter
      </button>
    </nav>
  )
}
