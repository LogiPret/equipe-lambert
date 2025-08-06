import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, Clock, Shield, Target, Award, Users, Bell } from 'lucide-react'
import { ScrollAnimation } from '@/components/scroll-animations'

interface Choice {
  icon: string
  color: string
  title: string
  description: string
  statValue: string
  statLabel: string
}

interface WhyChooseUsBlockProps {
  title?: string
  subtitle?: string
  choices?: Choice[]
}

const iconMap = {
  trendingUp: TrendingUp,
  clock: Clock,
  shield: Shield,
  target: Target,
  award: Award,
  users: Users,
  bell: Bell,
}

// Function to generate color classes based on the base color
const getColorClasses = (color: string) => {
  const colorMap: Record<
    string,
    { iconColor: string; bgColor: string; statColor: string; statBgColor: string }
  > = {
    green: {
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      statColor: 'text-green-700',
      statBgColor: 'bg-green-50',
    },
    blue: {
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      statColor: 'text-blue-700',
      statBgColor: 'bg-blue-50',
    },
    red: {
      iconColor: 'text-red-600',
      bgColor: 'bg-red-100',
      statColor: 'text-red-700',
      statBgColor: 'bg-red-50',
    },
    yellow: {
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      statColor: 'text-yellow-700',
      statBgColor: 'bg-yellow-50',
    },
    purple: {
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      statColor: 'text-purple-700',
      statBgColor: 'bg-purple-50',
    },
    pink: {
      iconColor: 'text-pink-600',
      bgColor: 'bg-pink-100',
      statColor: 'text-pink-700',
      statBgColor: 'bg-pink-50',
    },
    indigo: {
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      statColor: 'text-indigo-700',
      statBgColor: 'bg-indigo-50',
    },
    emerald: {
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      statColor: 'text-emerald-700',
      statBgColor: 'bg-emerald-50',
    },
    teal: {
      iconColor: 'text-teal-600',
      bgColor: 'bg-teal-100',
      statColor: 'text-teal-700',
      statBgColor: 'bg-teal-50',
    },
    cyan: {
      iconColor: 'text-cyan-600',
      bgColor: 'bg-cyan-100',
      statColor: 'text-cyan-700',
      statBgColor: 'bg-cyan-50',
    },
  }

  return colorMap[color] || colorMap.green // Default to green if color not found
}

export default function WhyChooseUsBlock({ title, subtitle, choices }: WhyChooseUsBlockProps) {
  const validChoices = Array.isArray(choices) ? choices : []

  return (
    <section className="py-16 bg-branding0">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-branding100 mb-4">{title}</h2>
            <p className="text-lg text-branding75 max-w-3xl mx-auto">{subtitle}</p>
          </div>
        </ScrollAnimation>

        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {validChoices.map((choice, index) => {
            const IconComponent = iconMap[choice.icon as keyof typeof iconMap] || TrendingUp
            const colorClasses = getColorClasses(choice.color || 'green')

            return (
              <ScrollAnimation key={index} animation="slideUp" delay={index * 100}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-secondarystatic">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div
                      className={`w-20 h-20 ${colorClasses.bgColor} rounded-full flex items-center justify-center mb-6`}
                    >
                      <IconComponent className={`w-8 h-8 ${colorClasses.iconColor}`} />
                    </div>

                    <h3 className="text-2xl font-bold text-branding100 mb-4">
                      {choice.title || 'Titre par défaut'}
                    </h3>

                    <p className="text-branding75 text-base leading-relaxed mb-8 max-w-md">
                      {choice.description || 'Description par défaut'}
                    </p>

                    <div className={`${colorClasses.statBgColor} rounded-lg px-6 py-4`}>
                      <div className={`text-3xl font-bold ${colorClasses.statColor}`}>
                        {choice.statValue || '0'}
                      </div>
                      <div className="text-branding75 text-sm">
                        {choice.statLabel || 'Statistique'}
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
