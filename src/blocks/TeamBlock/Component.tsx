'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, Handshake, Target, Shield } from 'lucide-react'
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
    <section id="equipe" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-20">
            <div className="inline-block bg-[#0f3046] h-1 w-24 mb-6"></div>
            <h2 className="text-5xl font-serif font-bold text-gray-800 mb-6">{title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
          </div>
        </ScrollAnimation>

        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {members.map((member, index) => {
            const imageUrl =
              typeof member.image === 'object' ? member.image.url : '/placeholder.svg'
            const imageAlt =
              typeof member.image === 'object' ? member.image.alt || member.name : member.name

            return (
              <ScrollAnimation key={index} animation="slideUp" delay={300 + index * 200}>
                <Card className="border border-gray-200 hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-white to-blue-50 hover:border-[#2d5f7f] w-auto max-w-xs">
                  <CardContent className="p-4 text-center">
                    <div className="relative mb-4 md:mb-6 w-[250px] h-[250px] mx-auto">
                      <Image
                        src={imageUrl || '/placeholder.svg'}
                        alt={imageAlt}
                        width={250}
                        height={250}
                        className="shadow-lg object-cover w-full h-full aspect-square"
                      />
                      <div className="absolute bottom-2 left-2 bg-white text-gray-800 p-2 shadow-xl text-xs">
                        <div className="font-bold text-[#0f3046]">{member.experience}</div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-[#0f3046] font-semibold mb-1">{member.role}</p>
                    <p className="text-gray-600 mb-6">{member.speciality}</p>
                    <div className="flex justify-center gap-3">
                      <Button size="sm" className="bg-[#0f3046] hover:bg-[#2d5f7f] text-white">
                        <Phone className="h-4 w-4 mr-2" />
                        Appeler
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#0f3046] text-[#0f3046] hover:bg-[#0f3046] hover:text-white bg-white"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            )
          })}
        </div>

        <ScrollAnimation animation="fadeIn" delay={600}>
          <div className="bg-gray-100 rounded-2xl p-12">
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
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="bg-[#0f3046] p-4 rounded-full inline-block mb-4">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-3">{advantage.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
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
