import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, Clock, Shield, Target, Award, Users } from 'lucide-react'
import { ScrollAnimation } from '@/components/scroll-animations'

interface Choice {
  icon: string
  iconColor: string
  bgColor: string
  title: string
  description: string
  statValue: string
  statLabel: string
  statColor: string
  statBgColor: string
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
}

export default function WhyChooseUsBlock({ title, subtitle, choices }: WhyChooseUsBlockProps) {
  const validChoices = Array.isArray(choices) ? choices : []

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>
        </ScrollAnimation>

        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {validChoices.map((choice, index) => {
            const IconComponent = iconMap[choice.icon as keyof typeof iconMap] || TrendingUp

            return (
              <ScrollAnimation key={index} animation="slideUp" delay={index * 100}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div
                      className={`w-20 h-20 ${choice.bgColor || 'bg-green-100'} rounded-full flex items-center justify-center mb-6`}
                    >
                      <IconComponent
                        className={`w-8 h-8 ${choice.iconColor || 'text-green-600'}`}
                      />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {choice.title || 'Titre par défaut'}
                    </h3>

                    <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-md">
                      {choice.description || 'Description par défaut'}
                    </p>

                    <div className={`${choice.statBgColor || 'bg-green-50'} rounded-lg px-6 py-4`}>
                      <div className={`text-3xl font-bold ${choice.statColor || 'text-green-700'}`}>
                        {choice.statValue || '0'}
                      </div>
                      <div className="text-gray-700 text-sm">
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
