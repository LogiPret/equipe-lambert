import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'
import Link from 'next/link'
import type { Page, Post } from '@/payload-types'
import { smoothScrollToElement } from '@/hooks/useSmoothScroll'

const actionButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
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

type ActionType = 'scroll' | 'link' | 'archive'

export interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof actionButtonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>

  // Action configuration
  actionType: ActionType

  // Scroll action props
  scrollTarget?: string
  scrollBehavior?: 'smooth' | 'instant' | 'auto'
  scrollBlock?: 'start' | 'center' | 'end' | 'nearest'
  scrollOffset?: number // Additional offset from top in pixels
  scrollDuration?: number // Custom duration for smooth scrolling in ms

  // Link action props
  linkType?: 'custom' | 'reference'
  url?: string
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  }
  newTab?: boolean

  // Archive action props
  archive?: 'posts' | string
}

/**
 * Generate href for link actions
 */
const generateHref = (props: ActionButtonProps): string | null => {
  const { actionType, linkType, url, reference, archive } = props

  if (actionType === 'link') {
    if (linkType === 'reference' && typeof reference?.value === 'object' && reference.value.slug) {
      return `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug}`
    } else if (linkType === 'custom' && url) {
      return url
    }
  } else if (actionType === 'archive' && archive) {
    switch (archive) {
      case 'posts':
        return '/posts'
      default:
        return `/${archive}`
    }
  }

  return null
}

const ActionButton: React.FC<ActionButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  ref,
  actionType,
  scrollTarget,
  scrollBehavior = 'smooth',
  scrollBlock = 'start',
  scrollOffset = 0,
  scrollDuration = 800,
  linkType,
  url,
  reference,
  newTab = false,
  archive,
  onClick,
  children,
  ...props
}) => {
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Call original onClick if provided
    if (onClick) {
      onClick(event)
    }

    // Handle action based on type
    switch (actionType) {
      case 'scroll':
        if (scrollTarget) {
          event.preventDefault()
          await smoothScrollToElement(scrollTarget, {
            behavior: scrollBehavior,
            block: scrollBlock,
            offset: scrollOffset,
            duration: scrollDuration,
          })
        }
        break

      case 'link':
      case 'archive':
        // For links and archives, let the Link component handle navigation
        // The href will be generated and handled by the Link wrapper
        break

      default:
        console.warn(`Unknown action type: ${actionType}`)
    }
  }

  const buttonClasses = cn(actionButtonVariants({ className, size, variant }))
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  // For scroll actions, render as button
  if (actionType === 'scroll') {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={buttonClasses} ref={ref} onClick={handleClick} {...props}>
        {children}
      </Comp>
    )
  }

  // For link and archive actions, wrap with Link
  const href = generateHref({ actionType, linkType, url, reference, archive } as ActionButtonProps)

  if (!href) {
    console.warn('ActionButton: No valid href generated for link/archive action')
    // Fallback to regular button if no href
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={buttonClasses} ref={ref} onClick={handleClick} {...props}>
        {children}
      </Comp>
    )
  }

  if (asChild) {
    return (
      <Slot className={buttonClasses}>
        <Link href={href} {...newTabProps}>
          {children}
        </Link>
      </Slot>
    )
  }

  return (
    <Link href={href} {...newTabProps} className={buttonClasses}>
      {children}
    </Link>
  )
}

export { ActionButton, actionButtonVariants }
