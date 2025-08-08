import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'
import Link from 'next/link'
import type { Page, Post } from '@/payload-types'
import { scrollToBlock } from '@/utilities/smoothScroll'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: { size: 'default', variant: 'default' },
    variants: {
      size: {
        clear: '',
        default: 'h-10 px-4 py-2',
        icon: 'h-10 w-10',
        lg: 'h-11 rounded px-8',
        sm: 'h-9 rounded px-3',
      },
      variant: {
        default: 'bg-brandingtheme text-brandingtheme-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-card hover:text-accent-foreground',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
        outline: 'border border-border bg-background hover:bg-card hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

// Action types for extended button
export type ActionType = 'default' | 'scroll' | 'link' | 'archive'

interface BaseActionProps {
  actionType?: ActionType
  // Scroll
  scrollTarget?: string
  scrollOffset?: number
  scrollDuration?: number
  // Link / Archive
  linkType?: 'custom' | 'reference'
  url?: string | null
  newTab?: boolean
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  archive?: string | null // e.g. 'posts'
}

export type ActionButtonProps = ButtonProps & BaseActionProps

const resolveHref = (props: BaseActionProps): string | null => {
  const { actionType, linkType, url, reference, archive } = props
  if (actionType === 'link') {
    if (linkType === 'custom' && url) return url
    if (linkType === 'reference' && reference) {
      if (
        typeof reference.value === 'object' &&
        'slug' in reference.value &&
        reference.value.slug
      ) {
        return `${reference.relationTo !== 'pages' ? `/${reference.relationTo}` : ''}/${reference.value.slug}`
      }
      // fallback if only id provided (cannot build slug)
      if (typeof reference.value === 'string' || typeof reference.value === 'number')
        return `/${reference.relationTo}`
    }
  }
  if (actionType === 'archive' && archive) {
    switch (archive) {
      case 'posts':
        return '/posts'
      default:
        return `/${archive}`
    }
  }
  return null
}

const Button: React.FC<ActionButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  ref,
  actionType = 'default',
  scrollTarget,
  scrollOffset = 0,
  scrollDuration = 700,
  linkType,
  url,
  reference,
  newTab,
  archive,
  onClick,
  children,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'

  // For scroll, always render a button element
  if (actionType === 'scroll') {
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (e.defaultPrevented) return
      if (scrollTarget) {
        await scrollToBlock(scrollTarget, { offset: scrollOffset, duration: scrollDuration })
      }
    }
    return (
      <Comp
        className={cn(buttonVariants({ className, size, variant }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Comp>
    )
  }

  // Link or archive actions -> anchor navigation
  if (actionType === 'link' || actionType === 'archive') {
    const href = resolveHref({ actionType, linkType, url, reference, archive })
    if (!href) {
      return (
        <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props}>
          {children}
        </Comp>
      )
    }
    const anchor = (
      <Link
        href={href}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={cn(buttonVariants({ className, size, variant }))}
      >
        {children}
      </Link>
    )
    if (asChild) return <Slot>{anchor}</Slot>
    return anchor
  }

  // Default button behavior
  return (
    <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props}>
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }
