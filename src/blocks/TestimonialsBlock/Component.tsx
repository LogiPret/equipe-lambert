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
    <div ref={ref} className={getAnimationClass()}>
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
    <section className="py-24 bg-[#0f3046] text-white">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-20">
            <div className="inline-block bg-white h-1 w-24 mb-6"></div>
            <h2 className="text-5xl font-serif font-bold mb-6">{title}</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">{subtitle}</p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const imageUrl =
              typeof testimonial.image === 'object' ? testimonial.image.url : '/placeholder.svg'
            const imageAlt =
              typeof testimonial.image === 'object'
                ? testimonial.image.alt || testimonial.name
                : testimonial.name

            return (
              <ScrollAnimation key={index} animation="slideUp" delay={index * 300}>
                <Card className="bg-white/10 border border-blue-300/30 hover:border-blue-300/60 transition-all duration-500 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <Image
                        src={imageUrl || '/placeholder.svg'}
                        alt={imageAlt}
                        width={60}
                        height={60}
                        className="w-15 h-15 rounded-full mr-4 border-2 border-blue-300"
                      />
                      <div>
                        <div className="flex items-center mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-blue-200">{testimonial.location}</p>
                      </div>
                    </div>
                    <blockquote className="text-blue-100 text-lg leading-relaxed italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </blockquote>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            )
          })}
        </div>

        {stats && stats.length > 0 && (
          <ScrollAnimation animation="fadeIn" delay={1200}>
            <div className="text-center mt-16">
              <div className="bg-white/10 border border-blue-300/30 p-8 max-w-4xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <div className="text-3xl font-bold text-white mb-2">{stat.rating}</div>
                      <div className="text-blue-200">{stat.label}</div>
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
