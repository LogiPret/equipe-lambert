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

interface SellingProcessBlockProps {
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

export default function SellingProcessBlock({ title, subtitle, steps }: SellingProcessBlockProps) {
  const validSteps = Array.isArray(steps) ? steps : []

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#0f3046] h-1 w-24 mb-6"></div>
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">{title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {validSteps.map((step, index) => {
            const IconComponent = iconMap[step.icon as keyof typeof iconMap] || Home

            return (
              <ScrollAnimation key={index} animation="slideUp" delay={300 + index * 200}>
                <Card className="h-full flex flex-col text-center p-8 bg-white border border-gray-200 hover:shadow-lg transition-all relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#0f3046] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>

                  <div className="text-[#0f3046] mb-6 flex justify-center mt-4">
                    <IconComponent size={48} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
                  <p className="text-gray-600 mt-auto">{step.description}</p>
                </Card>
              </ScrollAnimation>
            )
          })}
        </div>
      </div>
    </section>
  )
}
