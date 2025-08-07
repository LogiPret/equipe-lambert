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
    <section className="bg-gradient-to-br from-branding100 to-accent2static text-branding0 py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Description */}
          <div className="space-y-6 lg:text-left sm:text-center">
            <h2 className="text-4xl font-serif font-bold leading-tight">{title}</h2>
            <p className="text-lg text-accent1static leading-relaxed">{description}</p>
            <p className="text-lg text-accent1static leading-relaxed font-medium pt-10">
              {closingStatement}
            </p>
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-branding0 text-branding100 hover:bg-secondarystatic font-bold px-8 py-4 text-lg"
                onClick={handleCtaClick}
              >
                {ctaText}
              </Button>
            </div>
          </div>

          {/* Right Column: Points */}
          <ScrollAnimation animation="slideLeft" delay={200}>
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm border border-white/20">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{benefitsTitle}</h3>
                  <ul className="space-y-3">
                    {validBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-accent5static mr-3 mt-1 flex-shrink-0" />
                        <span className="text-accent1static">{benefit.text}</span>
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
                          <IconComponent className="h-8 w-8 text-accent1static mr-4 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-branding0">{item.title}</h4>
                            <p className="text-accent1static">{item.description}</p>
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
