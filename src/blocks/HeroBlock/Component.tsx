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
    <section className="relative bg-gradient-to-br from-gray-900 via-[#0f3046] to-[#1a4a66] text-white py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black/30"></div>

      {backgroundImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {badgeText && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Award className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">{badgeText}</span>
              </div>
            )}

            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-serif font-bold leading-tight">
                {title}
                {subtitle && (
                  <>
                    <br />
                    <span className="text-blue-300">{subtitle}</span>
                  </>
                )}
              </h1>
              {description && (
                <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">{description}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {primaryButton && primaryButton.text && (
                <CMSLink
                  {...primaryButton.link}
                  appearance="default"
                  size="lg"
                  className="bg-secondary text-primary hover:text-secondary hover:bg-primary font-medium"
                >
                  <Search className="h-5 w-5 mr-2" />
                  {primaryButton.text}
                </CMSLink>
              )}
              {secondaryButton && secondaryButton.text && (
                <CMSLink
                  {...secondaryButton.link}
                  appearance="outline"
                  size="lg"
                  className="border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-primary"
                >
                  {secondaryButton.text}
                </CMSLink>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="relative">
              <Image
                src={heroImageUrl || '/placeholder.svg'}
                alt={
                  typeof heroImage === 'object' && heroImage
                    ? heroImage.alt || 'Hero image'
                    : 'Hero image'
                }
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl w-full aspect-square object-cover"
                priority
              />
              {statsBoxNumber && statsBoxText && (
                <div className="absolute bottom-4 left-4 bg-secondary text-gray-800 p-4 shadow-xl">
                  <div className="text-xl font-bold text-primary mb-1">{statsBoxNumber}</div>
                  <div className="text-sm font-medium text-primary">{statsBoxText}</div>
                  {statsBoxDescription && (
                    <div className="text-xs text-primary">{statsBoxDescription}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
