'use client'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { handleScrollRedirect } from '@/utilities/contactRedirect'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | 'archive' | 'scroll' | null
  url?: string | null
  archive?: string | null
  scrollTarget?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    archive,
    scrollTarget,
  } = props

  let href: string | null = null

  if (type === 'reference' && typeof reference?.value === 'object' && reference.value.slug) {
    href = `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug}`
  } else if (type === 'archive' && archive) {
    // Handle archive pages
    switch (archive) {
      case 'posts':
        href = '/posts'
        break
      default:
        href = `/${archive}`
        break
    }
  } else if (type === 'custom' && url) {
    href = url
  } else if (type === 'scroll' && scrollTarget) {
    href = `#${scrollTarget}`
  }

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link
        className={cn(className)}
        href={href || url || ''}
        {...newTabProps}
        onClick={(e) => {
          if (handleScrollRedirect(href || url || '')) {
            e.preventDefault()
          }
        }}
      >
        {label && label}
        {children && children}
      </Link>
    )
  }

  const isLinkVariant = appearance === 'link'
  const anchorClassName = cn(className, !isLinkVariant && 'no-underline')

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link
        className={anchorClassName}
        href={href || url || ''}
        {...newTabProps}
        onClick={(e) => {
          if (handleScrollRedirect(href || url || '')) {
            e.preventDefault()
          }
        }}
      >
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
