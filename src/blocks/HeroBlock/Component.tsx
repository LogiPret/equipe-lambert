'use client'
import { CMSLink } from '@/components/Link'
import { Award, Search } from 'lucide-react'
import type { Media, Page, Post } from '@/payload-types'

interface ButtonLink {
  type?: 'custom' | 'reference' | 'scroll' | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  url?: string | null
  scrollTarget?: string | null
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
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  heroImage,
  backgroundImage,
}: HeroBlockProps) {
  const backgroundImageUrl =
    typeof backgroundImage === 'object' && backgroundImage ? backgroundImage.url : undefined

  return (
    <section className="relative text-white pt-0 md:pt-64 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>

      {backgroundImageUrl && (
        <>
          {/* Background for lg and larger screens - fills entire hero */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat hidden md:block"
            style={{
              backgroundImage: `url(${backgroundImageUrl})`,
              backgroundPosition: 'center 5%',
            }}
          />
          {/* Gradient overlay for larger screens */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent hidden md:block"></div>

          {/* Layout for md and smaller screens */}
          <div className="absolute inset-0 flex flex-col md:hidden">
            {/* Background image - fills width without cropping */}
            <div
              className="w-full flex-shrink-0 bg-no-repeat bg-top relative"
              style={{
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: '100% auto', // Fill width, auto height to maintain aspect ratio
                paddingBottom: '50%', // Approximate fallback height, will be overridden by actual image
                minHeight: '200px',
                maxHeight: '60vh',
              }}
            >
              {/* Gradient overlay for small screens - only on the image area */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, var(--branding-90), rgba(0,0,0,0.4) 50%, transparent)',
                }}
              ></div>
            </div>

            {/* Fill div for remaining space */}
            <div className="flex-1 bg-branding90 min-h-[200px] -mt-px" />
          </div>
        </>
      )}

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
