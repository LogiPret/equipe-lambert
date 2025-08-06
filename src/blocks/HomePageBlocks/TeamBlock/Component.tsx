'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Handshake, Target, Shield } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { Media } from '@/payload-types'

interface TeamMember {
  name: string
  role: string
  speciality: string
  image: Media
  experience: string
}

interface TeamAdvantage {
  icon: 'handshake' | 'target' | 'shield'
  title: string
  description: string
}

interface TeamBlockProps {
  title: string
  subtitle: string
  members: TeamMember[]
  advantages: {
    title: string
    subtitle: string
    items: TeamAdvantage[]
  }
}

const iconMap = {
  handshake: Handshake,
  target: Target,
  shield: Shield,
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

export default function TeamBlock({ title, subtitle, members, advantages }: TeamBlockProps) {
  return (
    <section id="equipe" className="py-24 bg-secondarystatic">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-20">
            <div className="inline-block bg-branding100 h-1 w-24 mb-6"></div>
            <h2 className="text-5xl font-serif font-bold text-branding100 mb-6">{title}</h2>
            <p className="text-xl text-branding75 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
          </div>
        </ScrollAnimation>

        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {members.map((member, index) => {
            const imageUrl =
              typeof member.image === 'object' ? member.image.url : '/placeholder.svg'
            const imageAlt =
              typeof member.image === 'object' ? member.image.alt || member.name : member.name

            return (
              <ScrollAnimation key={index} animation="slideUp" delay={300 + index * 200}>
                <Card className="border border-borderprimarystatic hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-branding0 to-secondarystatic hover:border-bordersecondarystatic w-full max-w-sm">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-6 w-[300px] h-[300px] mx-auto">
                      <Image
                        src={imageUrl || '/placeholder.svg'}
                        alt={imageAlt}
                        width={300}
                        height={300}
                        className="shadow-lg object-cover w-full h-full aspect-square rounded-lg"
                      />
                      <div className="absolute bottom-2 left-2 bg-branding0 text-branding100 p-2 shadow-xl text-xs">
                        <div className="font-bold text-primarystatic">{member.experience}</div>
                      </div>
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-branding100 mb-3">
                      {member.name}
                    </h3>
                    <p className="text-branding100 font-semibold mb-2 text-lg">{member.role}</p>
                    <p className="text-branding75 mb-8 text-base">{member.speciality}</p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            )
          })}
        </div>

        <ScrollAnimation animation="fadeIn" delay={600}>
          <div className="bg-branding0 rounded-2xl p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif font-bold text-gray-800 mb-4">
                {advantages.title}
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{advantages.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {advantages.items.map((advantage, index) => {
                const IconComponent = iconMap[advantage.icon]
                return (
                  <ScrollAnimation key={index} animation="slideUp" delay={800 + index * 200}>
                    <div className="text-center p-6 bg-branding0 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="bg-branding100 p-4 rounded-full inline-block mb-4">
                        <IconComponent className="h-8 w-8 text-branding0" />
                      </div>
                      <h4 className="text-xl font-bold text-branding100 mb-3">{advantage.title}</h4>
                      <p className="text-branding75 leading-relaxed">{advantage.description}</p>
                    </div>
                  </ScrollAnimation>
                )
              })}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
