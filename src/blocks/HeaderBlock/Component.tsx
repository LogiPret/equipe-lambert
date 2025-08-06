'use client'
import { Button } from '@/components/ui/button'
import { Users, Phone } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface NavigationItem {
  label: string
  href: string
}

interface HeaderBlockProps {
  logo: {
    title: string
    subtitle: string
  }
  navigation: NavigationItem[]
  contactButton: {
    text: string
    phone: string
  }
}

function ScrollAnimation({
  children,
  animation = 'fadeIn',
  delay = 0,
}: {
  children: React.ReactNode
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight'
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
        case 'slideLeft':
          return `${baseClass} opacity-0 translate-x-8`
        case 'slideRight':
          return `${baseClass} opacity-0 -translate-x-8`
        default:
          return `${baseClass} opacity-0`
      }
    }

    return `${baseClass} opacity-100 translate-y-0 translate-x-0`
  }

  return (
    <div ref={ref} className={getAnimationClass()}>
      {children}
    </div>
  )
}

export default function HeaderBlock({ logo, navigation, contactButton }: HeaderBlockProps) {
  return (
    <header className="bg-branding0 shadow-lg border-b border-branding0">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <ScrollAnimation animation="slideRight">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-branding100 to-accent2static p-3 rounded-sm">
                <Users className="h-8 w-8 text-branding0" />
              </div>
              <div>
                <span className="text-3xl font-serif font-bold text-branding100">{logo.title}</span>
                <div className="text-sm text-branding100 font-medium tracking-wide">
                  {logo.subtitle}
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-branding75 hover:text-branding100 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ScrollAnimation animation="slideLeft">
            <Button className="bg-branding100 hover:bg-accent2static text-branding0 px-6 py-3 font-medium">
              <Phone className="h-4 w-4 mr-2" />
              {contactButton.text}
            </Button>
          </ScrollAnimation>
        </div>
      </div>
    </header>
  )
}
