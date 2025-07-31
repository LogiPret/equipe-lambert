'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle, Home, TrendingUp, Users } from 'lucide-react'
import React from 'react'
import { ScrollAnimation } from '@/components/scroll-animations'

interface Benefit {
  text: string
}

interface Deliverable {
  icon: string
  title: string
  description: string
}

interface EvaluationGratuiteBlockProps {
  title?: string
  description?: string
  ctaText?: string
  ctaTarget?: string
  closingStatement?: string
  benefitsTitle?: string
  benefits?: Benefit[]
  deliverablesTitle?: string
  deliverables?: Deliverable[]
}

const iconMap = {
  home: Home,
  trendingUp: TrendingUp,
  users: Users,
}

export default function EvaluationGratuiteBlock({
  title,
  description,
  ctaText,
  ctaTarget,
  closingStatement,
  benefitsTitle,
  benefits,
  deliverablesTitle,
  deliverables,
}: EvaluationGratuiteBlockProps) {
  const validBenefits = Array.isArray(benefits) ? benefits : []
  const validDeliverables = Array.isArray(deliverables) ? deliverables : []

  // Scroll to block functionality
  const handleCtaClick = () => {
    if (ctaTarget) {
      const element = document.getElementById(ctaTarget)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      } else {
        console.warn(`Block with ID "${ctaTarget}" not found`)
      }
    }
  }
  return (
    <section className="bg-gradient-to-br from-[#0f3046] to-[#1e4966] text-white py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Description */}
          <div className="space-y-6 lg:text-left sm:text-center">
            <ScrollAnimation animation="fadeIn">
              <h2 className="text-4xl font-serif font-bold leading-tight">{title}</h2>
              <p className="text-lg text-blue-200 leading-relaxed">{description}</p>
              <p className="text-lg text-blue-200 leading-relaxed font-medium pt-10">
                {closingStatement}
              </p>
              <div className="pt-4">
                <Button
                  size="lg"
                  className="bg-white text-[#0f3046] hover:bg-gray-200 font-bold px-8 py-4 text-lg"
                  onClick={handleCtaClick}
                >
                  {ctaText}
                </Button>
              </div>
            </ScrollAnimation>
          </div>

          {/* Right Column: Points */}
          <ScrollAnimation animation="slideLeft" delay={300}>
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm border border-white/20">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{benefitsTitle}</h3>
                  <ul className="space-y-3">
                    {validBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-emerald-400 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-blue-100">{benefit.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-white/20"></div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">{deliverablesTitle}</h3>
                  <ul className="space-y-4">
                    {validDeliverables.map((item, index) => {
                      const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Home

                      return (
                        <li key={index} className="flex items-start">
                          <IconComponent className="h-8 w-8 text-blue-300 mr-4 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-white">{item.title}</h4>
                            <p className="text-blue-200">{item.description}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
