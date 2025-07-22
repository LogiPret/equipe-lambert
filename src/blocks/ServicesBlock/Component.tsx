'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Home, Building, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { Media } from '@/payload-types'

interface ServiceFeature {
  text: string
}

interface Service {
  icon: 'home' | 'building'
  title: string
  subtitle: string
  description: string
  image: Media
  features: ServiceFeature[]
}

interface ServicesBlockProps {
  title: string
  subtitle: string
  services: Service[]
}

const iconMap = {
  home: Home,
  building: Building,
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

export default function ServicesBlock({ title, subtitle, services }: ServicesBlockProps) {
  return (
    <section id="services" className="py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-20">
            <div className="inline-block bg-[#0f3046] h-1 w-24 mb-6"></div>
            <h2 className="text-5xl font-serif font-bold text-gray-800 mb-6">{title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon]
            const imageUrl =
              typeof service.image === 'object' ? service.image.url : '/placeholder.svg'
            const imageAlt =
              typeof service.image === 'object' ? service.image.alt || service.title : service.title

            return (
              <ScrollAnimation key={index} animation="slideUp" delay={300 + index * 300}>
                <Card className="border border-gray-200 hover:shadow-xl transition-all duration-500 bg-white hover:border-[#2d5f7f] overflow-hidden">
                  <CardContent className="p-0">
                    {/* Icon and Title/Subtitle at top */}
                    <div className="p-8 pb-0">
                      <div className="flex items-center mb-6">
                        <div className="bg-[#0f3046] p-3 rounded-lg mr-4">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-serif font-bold text-gray-800">
                            {service.title}
                          </h3>
                          <p className="text-[#0f3046] font-medium">{service.subtitle}</p>
                        </div>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="relative h-64 mx-8 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={imageUrl || '/placeholder.svg'}
                        alt={imageAlt}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Description */}
                    <div className="px-8 mb-6">
                      <p className="text-gray-600 leading-relaxed">{service.description}</p>
                    </div>

                    {/* Features */}
                    <div className="px-8 pb-8">
                      <div className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            )
          })}
        </div>
      </div>
    </section>
  )
}
