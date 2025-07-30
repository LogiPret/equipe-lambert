'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { DollarSign, Target, Zap } from 'lucide-react'
import { ScrollAnimation } from '@/components/scroll-animations'
import type { Media } from '@/payload-types'

interface Stat {
  value: string
  label: string
}

interface VendreHeroBlockProps {
  badgeText: string
  title: string
  subtitle?: string
  description?: string
  stats: Stat[]
  primaryButtonText: string
  secondaryButtonText: string
  formTitle: string
  formFields?: {
    addressPlaceholder: string
    firstNamePlaceholder: string
    lastNamePlaceholder: string
    phonePlaceholder: string
    emailPlaceholder: string
    timeframePlaceholder: string
    submitButtonText: string
    disclaimerText: string
  }
  timeframeOptions?: { option: string }[]
  backgroundImage?: Media | string
}

export default function VendreHeroBlock({
  badgeText,
  title,
  subtitle,
  description,
  stats,
  primaryButtonText,
  secondaryButtonText,
  formTitle,
  formFields,
  timeframeOptions,
  backgroundImage,
}: VendreHeroBlockProps) {
  // Handle background image URL
  const backgroundImageUrl =
    typeof backgroundImage === 'object' && backgroundImage?.url
      ? backgroundImage.url
      : typeof backgroundImage === 'string'
        ? backgroundImage
        : '/website-template-OG.webp' // fallback image

  // Convert description to HTML string
  const descriptionHTML = description || ''

  return (
    <section className="relative bg-gradient-to-br from-[#0f3046] via-[#1a4a66] to-[#2d5f7f] text-white py-24 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: `url('${backgroundImageUrl}')`,
        }}
      ></div>

      <div className="relative container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <ScrollAnimation animation="fadeIn" delay={300}>
              <div className="mb-8">
                <Badge className="bg-emerald-600 text-white px-6 py-3 text-lg font-medium mb-6">
                  <DollarSign className="h-5 w-5 mr-2" />
                  {badgeText}
                </Badge>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="slideUp" delay={600}>
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-tight">
                {title}
                {subtitle && <span className="block text-blue-200">{subtitle}</span>}
              </h1>
            </ScrollAnimation>

            <ScrollAnimation animation="slideUp" delay={900}>
              <div
                className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-200 max-w-2xl"
                dangerouslySetInnerHTML={{ __html: descriptionHTML }}
              />
            </ScrollAnimation>

            {stats && stats.length > 0 && (
              <ScrollAnimation animation="slideUp" delay={1200}>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-blue-200 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </ScrollAnimation>
            )}

            <ScrollAnimation animation="slideUp" delay={1500}>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 font-medium text-lg"
                >
                  <Target className="h-5 w-5 mr-3" />
                  {primaryButtonText}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#0f3046] bg-transparent px-8 py-4 font-medium text-lg"
                >
                  {secondaryButtonText}
                </Button>
              </div>
            </ScrollAnimation>
          </div>

          <ScrollAnimation animation="slideLeft" delay={800}>
            <div className="relative">
              <Card className="bg-white/95 p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">{formTitle}</h3>
                <form className="space-y-4">
                  <Input
                    placeholder={formFields?.addressPlaceholder || 'Adresse de votre propriété *'}
                    className="border border-gray-300 focus:border-[#0f3046] p-4 text-lg"
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder={formFields?.firstNamePlaceholder || 'Prénom *'}
                      className="border border-gray-300 focus:border-[#0f3046] p-4"
                    />
                    <Input
                      placeholder={formFields?.lastNamePlaceholder || 'Nom de famille *'}
                      className="border border-gray-300 focus:border-[#0f3046] p-4"
                    />
                  </div>
                  <Input
                    placeholder={formFields?.phonePlaceholder || 'Téléphone *'}
                    className="border border-gray-300 focus:border-[#0f3046] p-4"
                  />
                  <Input
                    placeholder={formFields?.emailPlaceholder || 'Email *'}
                    type="email"
                    className="border border-gray-300 focus:border-[#0f3046] p-4"
                  />
                  <select className="w-full border border-gray-300 focus:border-[#0f3046] p-4 bg-white text-gray-500">
                    <option value="">
                      {formFields?.timeframePlaceholder || 'Délai souhaité pour la vente'}
                    </option>
                    {timeframeOptions && timeframeOptions.length > 0
                      ? timeframeOptions.map((option, index) => (
                          <option key={index} value={option.option}>
                            {option.option}
                          </option>
                        ))
                      : [
                          <option key="default-1" value="Moins de 30 jours">
                            Moins de 30 jours
                          </option>,
                          <option key="default-2" value="1-3 mois">
                            1-3 mois
                          </option>,
                          <option key="default-3" value="3-6 mois">
                            3-6 mois
                          </option>,
                          <option key="default-4" value="Plus de 6 mois">
                            Plus de 6 mois
                          </option>,
                        ]}
                  </select>
                  <Button className="w-full bg-[#0f3046] hover:bg-[#1a4a66] text-white py-4 font-medium text-lg">
                    <Zap className="h-5 w-5 mr-2" />
                    {formFields?.submitButtonText || 'Obtenir mon évaluation gratuite'}
                  </Button>
                </form>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  {formFields?.disclaimerText || '* Évaluation professionnelle sans engagement'}
                </p>
              </Card>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
