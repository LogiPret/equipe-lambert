'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CMSLink } from '@/components/Link'
import { MapPin, Camera, Bed, Bath, Square } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { Media, Page, Post } from '@/payload-types'

interface Property {
  image: Media
  price: string
  address: string
  beds: number
  baths: number
  sqft: string
  type: 'maison' | 'condo' | 'townhouse' | 'loft'
  status: 'a_vendre' | 'vendu' | 'option_achat'
}

interface ButtonLink {
  type?: 'custom' | 'reference' | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  url?: string | null
  newTab?: boolean | null
}

interface PropertiesBlockProps {
  title: string
  subtitle: string
  properties: Property[]
  showAllButton?: {
    text: string
    link?: ButtonLink
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

const typeLabels = {
  maison: 'Maison',
  condo: 'Condo',
  townhouse: 'Townhouse',
  loft: 'Loft',
}

const statusLabels = {
  a_vendre: 'À vendre',
  vendu: 'Vendu',
  option_achat: "Option d'achat",
}

export default function PropertiesBlock({
  title,
  subtitle,
  properties,
  showAllButton = { text: "Voir toutes nos propriétés d'équipe" },
}: PropertiesBlockProps) {
  return (
    <section id="proprietes" className="py-24 bg-branding0">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-20">
            <div className="inline-block bg-branding100 h-1 w-24 mb-6"></div>
            <h2 className="text-5xl font-serif font-bold text-branding100 mb-6">{title}</h2>
            <p className="text-xl text-branding75 max-w-3xl mx-auto">{subtitle}</p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => {
            const imageUrl =
              typeof property.image === 'object' ? property.image.url : '/placeholder.svg'
            const imageAlt =
              typeof property.image === 'object'
                ? property.image.alt || property.address
                : property.address

            return (
              <ScrollAnimation key={index} animation="slideUp" delay={index * 200}>
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border border-borderprimarystatic bg-branding0 hover:border-bordersecondarystatic">
                  <div className="relative overflow-hidden">
                    <Image
                      src={imageUrl || '/placeholder.svg'}
                      alt={imageAlt}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant={property.status === 'vendu' ? 'secondary' : 'default'}
                        className={`${
                          property.status === 'vendu'
                            ? 'bg-branding75 text-branding0'
                            : 'bg-branding100 text-branding0'
                        } px-3 py-1 font-medium`}
                      >
                        {statusLabels[property.status]}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        className="bg-branding100 hover:bg-accent2static text-branding0"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Visite virtuelle
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-branding100">{property.price}</span>
                      <Badge
                        variant="outline"
                        className="border-bordersecondarystatic text-primarystatic"
                      >
                        {typeLabels[property.type]}
                      </Badge>
                    </div>
                    <p className="text-branding75 mb-4 flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-branding100" />
                      {property.address}
                    </p>
                    <div className="flex items-center justify-between text-sm text-branding50 pt-4 border-t border-borderprimarystatic">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1 text-branding100" />
                        {property.beds} ch.
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1 text-branding100" />
                        {property.baths} sdb.
                      </div>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1 text-branding100" />
                        {property.sqft} pi²
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            )
          })}
        </div>

        {showAllButton && (
          <ScrollAnimation animation="fadeIn" delay={1000}>
            <div className="text-center mt-16">
              {showAllButton.link ? (
                <CMSLink
                  {...showAllButton.link}
                  appearance="default"
                  size="lg"
                  className="bg-branding100 hover:bg-accent2static text-branding0 px-8 py-4 font-medium text-lg"
                >
                  {showAllButton.text}
                </CMSLink>
              ) : (
                <Button
                  size="lg"
                  className="bg-branding100 hover:bg-accent2static text-branding0 px-8 py-4 font-medium text-lg"
                >
                  {showAllButton.text}
                </Button>
              )}
            </div>
          </ScrollAnimation>
        )}
      </div>
    </section>
  )
}
