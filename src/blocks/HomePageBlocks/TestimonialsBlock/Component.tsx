'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { Media } from '@/payload-types'

interface Testimonial {
  name: string
  location: string
  rating: number
  image: Media
  text: string
}

interface TestimonialStats {
  rating: string
  label: string
}

interface TestimonialsBlockProps {
  title: string
  subtitle: string
  testimonials: Testimonial[]
  stats?: TestimonialStats[]
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
    <div ref={ref} className={`${getAnimationClass()} h-full flex`}>
      {children}
    </div>
  )
}

export default function TestimonialsBlock({
  title,
  subtitle,
  testimonials,
  stats,
}: TestimonialsBlockProps) {
  return (
    <section className="py-24 bg-branding100 text-branding0">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-20">
            <div className="inline-block bg-branding0 h-1 w-24 mb-6"></div>
            <h2 className="text-5xl font-serif font-bold mb-6">{title}</h2>
            <p className="text-xl text-accent1static max-w-3xl mx-auto">{subtitle}</p>
          </div>
        </ScrollAnimation>

        <div className="flex flex-col gap-6 md:gap-8 max-w-7xl mx-auto">
          {(() => {
            // Split into large and small, then build rows: first 2 larges, then 3 smalls, repeat
            const isLargeTestimonial = (t: Testimonial) => (t.text?.length || 0) >= 240
            const large = testimonials.filter(isLargeTestimonial)
            const small = testimonials.filter((t) => !isLargeTestimonial(t))
            const rows: { type: 'large' | 'small'; items: Testimonial[] }[] = []
            let li = 0
            let si = 0
            while (li < large.length || si < small.length) {
              if (li < large.length) {
                rows.push({ type: 'large', items: large.slice(li, li + 2) })
                li += 2
              }
              if (si < small.length) {
                rows.push({ type: 'small', items: small.slice(si, si + 3) })
                si += 3
              }
            }

            return rows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className={`grid items-stretch grid-cols-1 md:grid-cols-2 ${row.type === 'large' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-6 md:gap-8`}
              >
                {row.items.map((testimonial, index) => {
                  const imageUrl =
                    typeof testimonial.image === 'object'
                      ? testimonial.image.url
                      : '/placeholder.svg'
                  const imageAlt =
                    typeof testimonial.image === 'object'
                      ? testimonial.image.alt || testimonial.name
                      : testimonial.name
                  const textLength = testimonial.text.length
                  const getCardMinHeight = () => {
                    if (textLength < 150) return 'min-h-[18rem]'
                    if (textLength < 250) return 'min-h-[20rem]'
                    if (textLength < 350) return 'min-h-[22rem]'
                    return 'min-h-[24rem]'
                  }

                  return (
                    <div key={`${rowIdx}-${index}`} className="flex h-full">
                      <ScrollAnimation animation="slideUp" delay={(rowIdx * 5 + index) * 150}>
                        <Card
                          className={`bg-branding90 border border-accent2static hover:border-borderprimarystatic transition-all duration-500 backdrop-blur-sm w-full h-full flex flex-col`}
                        >
                          <CardContent className="p-6 md:p-8 flex flex-col flex-1">
                            <div className="flex items-center mb-4 md:mb-6 flex-shrink-0">
                              <Image
                                src={imageUrl || '/placeholder.svg'}
                                alt={imageAlt}
                                width={60}
                                height={60}
                                className="w-12 h-12 md:w-16 md:h-16 rounded-full mr-3 md:mr-4 border-2 border-accent1static flex-shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center mb-1 md:mb-2">
                                  {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-current"
                                    />
                                  ))}
                                </div>
                                <p className="font-semibold text-branding0 text-sm md:text-base truncate">
                                  {testimonial.name}
                                </p>
                                <p className="text-xs md:text-sm text-accent1static truncate">
                                  {testimonial.location}
                                </p>
                              </div>
                            </div>
                            <blockquote className="text-accent1static text-sm md:text-base leading-relaxed italic flex-grow break-words">
                              &ldquo;{testimonial.text}&rdquo;
                            </blockquote>
                          </CardContent>
                        </Card>
                      </ScrollAnimation>
                    </div>
                  )
                })}
              </div>
            ))
          })()}
        </div>

        {stats && stats.length > 0 && (
          <ScrollAnimation animation="fadeIn" delay={1200}>
            <div className="text-center mt-16">
              <div className="bg-branding90 border border-accent2static p-8 max-w-4xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <div className="text-3xl font-bold text-branding0 mb-2">{stat.rating}</div>
                      <div className="text-accent1static">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimation>
        )}
      </div>
    </section>
  )
}
