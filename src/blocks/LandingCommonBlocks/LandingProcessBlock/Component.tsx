import React from 'react'
import { Card } from '@/components/ui/card'
import { ScrollAnimation } from '@/components/scroll-animations'
import {
  Home,
  Search,
  Camera,
  Users,
  DollarSign,
  Key,
  Calendar,
  CheckCircle,
  Star,
  Target,
  ClipboardList,
  Handshake,
} from 'lucide-react'

interface ProcessStep {
  icon: string
  title: string
  description: string
}

interface LandingProcessBlockProps {
  title?: string
  subtitle?: string
  steps?: ProcessStep[]
}

const iconMap = {
  home: Home,
  search: Search,
  camera: Camera,
  users: Users,
  dollarSign: DollarSign,
  key: Key,
  calendar: Calendar,
  checkCircle: CheckCircle,
  star: Star,
  target: Target,
  clipboardList: ClipboardList,
  handshake: Handshake,
}

export default function LandingProcessBlock({ title, subtitle, steps }: LandingProcessBlockProps) {
  const validSteps = Array.isArray(steps) ? steps : []

  return (
    <section className="py-20 bg-secondarystatic">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-branding100 h-1 w-24 mb-6"></div>
          <h2 className="text-4xl font-serif font-bold text-branding100 mb-6">{title}</h2>
          <p className="text-xl text-branding75 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {validSteps.map((step, index) => {
            const IconComponent = iconMap[step.icon as keyof typeof iconMap] || Home

            return (
              <ScrollAnimation key={index} animation="slideUp" delay={200 + index * 200}>
                <Card className="h-full flex flex-col text-center p-8 bg-branding0 border border-borderprimarystatic hover:shadow-lg transition-all relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-branding100 text-branding0 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>

                  <div className="text-branding100 mb-6 flex justify-center mt-4">
                    <IconComponent size={48} />
                  </div>

                  <h3 className="text-xl font-bold text-branding100 mb-4">{step.title}</h3>
                  <p className="text-branding75 mt-auto">{step.description}</p>
                </Card>
              </ScrollAnimation>
            )
          })}
        </div>
      </div>
    </section>
  )
}
