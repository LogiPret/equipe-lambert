'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ScrollAnimation } from '@/components/scroll-animations'
import { Target, Phone, Search, Key } from 'lucide-react'

interface LandingCTABlockProps {
  mode: 'vendre' | 'acheter'
  title?: string
  subtitle?: string
  primaryButtonText?: string
  primaryButtonTarget?: string
  secondaryButtonText?: string
  secondaryButtonTarget?: string
  phoneNumber?: string
}

const scrollToBlock = (blockId: string) => {
  const element = document.getElementById(blockId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  } else {
    console.warn(
      `Block with ID "${blockId}" not found. Available IDs:`,
      Array.from(document.querySelectorAll('[id]')).map((el) => el.id),
    )
  }
}

export const LandingCTABlockComponent: React.FC<LandingCTABlockProps> = ({
  mode = 'vendre',
  title,
  subtitle,
  primaryButtonText,
  primaryButtonTarget,
  secondaryButtonText,
  secondaryButtonTarget,
  phoneNumber,
}) => {
  // Mode-specific defaults that override database values
  const modeDefaults = {
    vendre: {
      title: 'Prêt à vendre votre propriété?',
      subtitle:
        "Contactez-nous dès aujourd'hui pour une évaluation gratuite et découvrez comment nous pouvons vous aider à obtenir le meilleur prix pour votre propriété.",
      primaryButtonText: 'Évaluation gratuite',
      secondaryButtonText: 'Appelez-nous',
      bgGradient: 'from-emerald-600 to-emerald-700',
      primaryButtonClass: 'bg-white text-emerald-600 hover:bg-emerald-50',
      secondaryButtonClass:
        'border-2 border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent',
      subtitleClass: 'text-emerald-100',
      primaryIcon: Target,
      secondaryIcon: Phone,
    },
    acheter: {
      title: 'Prêt à trouver votre propriété idéale ?',
      subtitle:
        "Commencez votre recherche dès aujourd'hui avec l'accompagnement expert de l'Équipe Lambert",
      primaryButtonText: 'Commencer ma recherche',
      secondaryButtonText: 'Consultation gratuite',
      bgGradient: 'from-[#0f3046] to-[#1a4a66]',
      primaryButtonClass: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondaryButtonClass:
        'border-2 border-white text-white hover:bg-white hover:text-[#0f3046] bg-transparent',
      subtitleClass: 'text-blue-200',
      primaryIcon: Search,
      secondaryIcon: Key,
    },
  }

  const currentDefaults = modeDefaults[mode]
  const PrimaryIcon = currentDefaults.primaryIcon
  const SecondaryIcon = currentDefaults.secondaryIcon

  const finalTitle = title || currentDefaults.title
  const finalSubtitle = subtitle || currentDefaults.subtitle
  const finalPrimaryButtonText = primaryButtonText || currentDefaults.primaryButtonText
  const finalSecondaryButtonText = secondaryButtonText || currentDefaults.secondaryButtonText

  const handlePrimaryClick = () => {
    if (primaryButtonTarget) {
      scrollToBlock(primaryButtonTarget)
    }
  }

  const handleSecondaryClick = () => {
    if (secondaryButtonTarget) {
      scrollToBlock(secondaryButtonTarget)
    } else if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`
    }
  }

  return (
    <section className={`py-16 bg-gradient-to-r ${currentDefaults.bgGradient} text-white`}>
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center">
            <h2 className="text-4xl font-serif font-bold mb-6">{finalTitle}</h2>
            <p className={`text-xl mb-8 ${currentDefaults.subtitleClass} max-w-2xl mx-auto`}>
              {finalSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className={`${currentDefaults.primaryButtonClass} px-8 py-4 font-medium text-lg`}
                onClick={handlePrimaryClick}
              >
                <PrimaryIcon className="h-5 w-5 mr-3" />
                {finalPrimaryButtonText}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`${currentDefaults.secondaryButtonClass} px-8 py-4 font-medium text-lg`}
                onClick={handleSecondaryClick}
              >
                <SecondaryIcon className="h-5 w-5 mr-3" />
                {finalSecondaryButtonText}
                {phoneNumber && !secondaryButtonTarget ? `: ${phoneNumber}` : ''}
              </Button>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
