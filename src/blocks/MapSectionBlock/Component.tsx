'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import PropertyMap from '@/components/PropertyMap'
import { useEffect, useRef, useState } from 'react'

interface Property {
  id: number
  address: string
  price: string
  status: string
  type: string
}

interface ServiceArea {
  name: string
  status: string
  badgeColor?: string
  bgColor?: string
  borderColor?: string
}

interface MapSectionBlockProps {
  title: string
  subtitle: string
  properties: Property[]
  serviceAreas: ServiceArea[]
}

function ScrollAnimation({
  children,
  animation = 'fadeIn',
  delay = 0,
}: {
  children: React.ReactNode
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft'
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

export default function MapSectionBlock({ title, subtitle, properties }: MapSectionBlockProps) {
  const focusProperty = (index: number) => {
    // This function will be handled by the PropertyMap component
    console.log(`Focus property at index: ${index}`)
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#0f3046] h-1 w-24 mb-6"></div>
            <h2 className="text-5xl font-serif font-bold text-gray-800 mb-6">{title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card className="overflow-hidden shadow-lg h-full">
              <PropertyMap properties={properties} />
            </Card>
          </div>

          <div className="space-y-6">
            <ScrollAnimation animation="slideLeft" delay={500}>
              <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-[#0f3046] rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800">Carte interactive</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Cliquez sur les marqueurs pour voir les détails des propriétés ou sur une
                    propriété dans la liste pour la localiser sur la carte.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#0f3046] rounded-full mr-2"></div>
                      <span>À vendre</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                      <span>Vendu</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
            <ScrollAnimation animation="slideLeft" delay={300}>
              <Card className="shadow-lg bg-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    Propriétés disponibles
                  </h3>
                  <div className="space-y-3">
                    {(properties || []).slice(0, 4).map((property, index) => (
                      <div
                        key={property.id}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer border border-gray-200 hover:border-[#2d5f7f]"
                        onClick={() => focusProperty(index)}
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${
                            property.status === 'À vendre' ? 'bg-green-500' : 'bg-gray-400'
                          }`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate">
                            {property.address.split(',')[0]}
                          </p>
                          <p className="text-sm text-[#0f3046] font-semibold">{property.price}</p>
                        </div>
                        <Badge variant="outline" className="text-xs text-[#0f3046]">
                          {property.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <button className="text-[#0f3046] hover:text-[#2d5f7f] font-medium text-sm">
                      Voir toutes les propriétés →
                    </button>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}
