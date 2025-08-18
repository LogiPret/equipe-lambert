'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Handshake, Target, Shield } from 'lucide-react'
import Image from 'next/image'
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

export default function TeamBlock({ title, subtitle, members, advantages }: TeamBlockProps) {
  // Dynamic grid classes based on number of members
  const getGridClass = (memberCount: number) => {
    if (memberCount === 1) return 'grid grid-cols-1 max-w-sm mx-auto'
    if (memberCount === 2) return 'grid grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto'
    if (memberCount === 3) return 'grid grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto'
    if (memberCount === 4) return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    if (memberCount <= 6) return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return (
    <section id="equipe" className="py-24 bg-secondarystatic">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-block bg-branding100 h-1 w-24 mb-6"></div>
          <h2 className="text-5xl font-serif font-bold text-branding100 mb-6">{title}</h2>
          <p className="text-xl text-branding75 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
        </div>

        <div className={`${getGridClass(members.length)} gap-8 mb-16 justify-items-center`}>
          {members.map((member, index) => {
            const imageUrl =
              typeof member.image === 'object' ? member.image.url : '/placeholder.svg'
            const imageAlt =
              typeof member.image === 'object' ? member.image.alt || member.name : member.name

            return (
              <Card
                key={index}
                className="border border-borderprimarystatic hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-branding0 to-secondarystatic hover:border-bordersecondarystatic w-full max-w-sm"
              >
                <CardContent className="p-4 text-center">
                  <div className="relative mb-4 w-full aspect-square mx-auto">
                    <Image
                      src={imageUrl || '/placeholder.svg'}
                      alt={imageAlt}
                      fill
                      className="shadow-lg object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-2 bg-branding0 text-branding100 p-1.5 shadow-xl text-xs rounded">
                      <div className="font-bold text-primarystatic">{member.experience}</div>
                    </div>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-serif font-bold text-branding100 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-branding100 font-semibold mb-1 text-sm lg:text-base">
                    {member.role}
                  </p>
                  <p className="text-branding75 text-xs lg:text-sm">{member.speciality}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="bg-branding0 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold text-branding100 mb-4">
              {advantages.title}
            </h3>
            <p className="text-lg text-branding75 max-w-2xl mx-auto">{advantages.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {advantages.items.map((advantage, index) => {
              const IconComponent = iconMap[advantage.icon]
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-branding0 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="bg-branding100 p-4 rounded-full inline-block mb-4">
                    <IconComponent className="h-8 w-8 text-branding0" />
                  </div>
                  <h4 className="text-xl font-bold text-branding100 mb-3">{advantage.title}</h4>
                  <p className="text-branding75 leading-relaxed">{advantage.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
