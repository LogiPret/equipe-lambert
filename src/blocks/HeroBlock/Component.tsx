'use client'
import { CMSLink } from '@/components/Link'
import { Award, Search } from 'lucide-react'
import Image from 'next/image'
import type { Media, Page, Post } from '@/payload-types'

interface ButtonLink {
  type?: 'custom' | 'reference' | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  url?: string | null
  newTab?: boolean | null
}

interface HeroBlockProps {
  badgeText?: string
  _badgeIcon?: string
  title: string
  subtitle?: string
  description?: string
  primaryButton?: {
    text: string
    icon?: string
    link: ButtonLink
  }
  secondaryButton?: {
    text: string
    link: ButtonLink
  }
  heroImage: Media
  statsBoxNumber?: string
  statsBoxText?: string
  statsBoxDescription?: string
  backgroundImage?: Media
}

export default function HeroBlock({
  badgeText = "ÉQUIPE D'EXCELLENCE DEPUIS 2008",
  _badgeIcon,
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  heroImage,
  statsBoxNumber,
  statsBoxText,
  statsBoxDescription,
  backgroundImage,
}: HeroBlockProps) {
  const heroImageUrl =
    typeof heroImage === 'object' && heroImage ? heroImage.url : '/placeholder.svg'
  const backgroundImageUrl =
    typeof backgroundImage === 'object' && backgroundImage ? backgroundImage.url : undefined

  return (
    <section className="relative text-white pt-64 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>

      {backgroundImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}

      {/* Gradient overlay to protect text readability in bottom area */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-end min-h-[600px]">
        {/* Bottom area - content positioned at very bottom */}
        <div className="">
          <div className="w-full items-end">
            {/* Badge, Title, Buttons */}
            <div className="space-y-8">
              {badgeText && (
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Award className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium">{badgeText}</span>
                </div>
              )}

              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-chiffon font-light leading-tight">
                  {title}
                  {subtitle && (
                    <>
                      <br />
                      <span className="text-blue-300 font-chiffon font-medium">{subtitle}</span>
                    </>
                  )}
                </h1>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                {primaryButton && primaryButton.text && (
                  <CMSLink
                    {...primaryButton.link}
                    appearance="default"
                    size="lg"
                    className="bg-branding4 text-primary hover:text-secondary hover:bg-branding1 font-medium"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    {primaryButton.text}
                  </CMSLink>
                )}
                {secondaryButton && secondaryButton.text && (
                  <CMSLink
                    {...secondaryButton.link}
                    size="lg"
                    className="border border-branding4 bg-transparent text-white hover:bg-branding4 hover:text-primary"
                  >
                    {secondaryButton.text}
                  </CMSLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
