'use client'
import { CMSLink } from '@/components/Link'
import { DollarSign, Key, Phone, Mail } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Page, Post } from '@/payload-types'

interface ButtonLink {
  type?: 'custom' | 'reference' | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  url?: string | null
  newTab?: boolean | null
}

interface CTABannerBlockProps {
  backgroundColor: 'gradient_blue' | 'dark_blue' | 'navy'
  title: string
  subtitle?: string
  button: {
    text: string
    icon?: 'dollar_sign' | 'key' | 'phone' | 'mail'
    variant?: 'primary' | 'secondary'
    link: ButtonLink
  }
}

function ScrollAnimation({
  children,
  animation = 'fadeIn',
  delay = 0,
}: {
  children: React.ReactNode
  animation?: 'fadeIn' | 'slideUp'
  delay?: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getAnimationClass = () => {
    const baseClass = 'transition-all duration-1000 ease-out'

    if (!isVisible) {
      switch (animation) {
        case 'fadeIn':
          return `${baseClass} opacity-0`
        case 'slideUp':
          return `${baseClass} opacity-0 translate-y-8`
        default:
          return `${baseClass} opacity-0`
      }
    }

    return `${baseClass} opacity-100 translate-y-0`
  }

  return (
    <div ref={ref} className={getAnimationClass()}>
      {children}
    </div>
  )
}

const backgroundClasses = {
  gradient_blue: 'bg-gradient-to-r from-[#2d5f7f] to-[#4a7ba7]',
  dark_blue: 'bg-[#0f3046]',
  navy: 'bg-[#1a365d]',
}

const iconMap = {
  dollar_sign: DollarSign,
  key: Key,
  phone: Phone,
  mail: Mail,
}

export default function CTABannerBlock({
  backgroundColor = 'gradient_blue',
  title,
  subtitle,
  button,
}: CTABannerBlockProps) {
  const IconComponent = button.icon ? iconMap[button.icon] : undefined

  return (
    <ScrollAnimation animation="fadeIn">
      <div className={`${backgroundClasses[backgroundColor]} py-4`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-secondarystatic">
            <div className="text-center md:text-left">
              <span className="text-lg font-medium">{title}</span>
              {subtitle && <span className="text-accent1static ml-2">{subtitle}</span>}
            </div>
            <CMSLink
              {...button.link}
              appearance="default"
              className="bg-secondarystatic text-primarystatic hover:bg-accent1static font-medium"
            >
              {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
              {button.text}
            </CMSLink>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  )
}
