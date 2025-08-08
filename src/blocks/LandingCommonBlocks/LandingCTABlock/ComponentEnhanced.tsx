'use client'

import React from 'react'
import { ActionButton } from '@/components/ui/action-button'
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

export const LandingCTABlockEnhanced: React.FC<LandingCTABlockProps> = ({
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
      primaryIcon: Target,
      secondaryIcon: Phone,
      bgGradient: 'from-emerald-600 to-emerald-700',
      subtitleClass: 'text-emerald-100',
      primaryButtonClass: 'bg-white text-emerald-700 hover:bg-emerald-50',
      secondaryButtonClass:
        'border-2 border-white text-white hover:bg-white hover:text-emerald-700 bg-transparent',
    },
    acheter: {
      title: 'Prêt à acheter votre prochaine propriété?',
      subtitle:
        'Explorez nos propriétés disponibles et laissez-nous vous aider à trouver la maison de vos rêves avec notre expertise du marché local.',
      primaryButtonText: 'Voir les propriétés',
      secondaryButtonText: 'Consulter un expert',
      primaryIcon: Search,
      secondaryIcon: Key,
      bgGradient: 'from-blue-600 to-blue-700',
      subtitleClass: 'text-blue-100',
      primaryButtonClass: 'bg-white text-blue-700 hover:bg-blue-50',
      secondaryButtonClass:
        'border-2 border-white text-white hover:bg-white hover:text-blue-700 bg-transparent',
    },
  }

  const currentDefaults = modeDefaults[mode]

  // Use provided values or fall back to mode defaults
  const finalTitle = title || currentDefaults.title
  const finalSubtitle = subtitle || currentDefaults.subtitle
  const finalPrimaryButtonText = primaryButtonText || currentDefaults.primaryButtonText
  const finalSecondaryButtonText = secondaryButtonText || currentDefaults.secondaryButtonText

  const PrimaryIcon = currentDefaults.primaryIcon
  const SecondaryIcon = currentDefaults.secondaryIcon

  return (
    <section className={`py-16 bg-gradient-to-r ${currentDefaults.bgGradient} text-branding0`}>
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">{finalTitle}</h2>
          <p className={`text-xl mb-8 ${currentDefaults.subtitleClass} max-w-2xl mx-auto`}>
            {finalSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {/* Primary Action Button with Enhanced Scrolling */}
            <ActionButton
              actionType="scroll"
              scrollTarget={primaryButtonTarget || ''}
              scrollOffset={80} // Account for fixed header
              scrollDuration={1000} // Smooth animation
              size="lg"
              className={`${currentDefaults.primaryButtonClass} px-8 py-4 font-medium text-lg`}
            >
              <PrimaryIcon className="h-5 w-5 mr-3" />
              {finalPrimaryButtonText}
            </ActionButton>

            {/* Secondary Action Button */}
            {secondaryButtonTarget ? (
              <ActionButton
                actionType="scroll"
                scrollTarget={secondaryButtonTarget}
                scrollOffset={80}
                scrollDuration={1000}
                size="lg"
                variant="outline"
                className={`${currentDefaults.secondaryButtonClass} px-8 py-4 font-medium text-lg`}
              >
                <SecondaryIcon className="h-5 w-5 mr-3" />
                {finalSecondaryButtonText}
              </ActionButton>
            ) : phoneNumber ? (
              <ActionButton
                actionType="link"
                linkType="custom"
                url={`tel:${phoneNumber}`}
                size="lg"
                variant="outline"
                className={`${currentDefaults.secondaryButtonClass} px-8 py-4 font-medium text-lg`}
              >
                <SecondaryIcon className="h-5 w-5 mr-3" />
                {finalSecondaryButtonText}
              </ActionButton>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
