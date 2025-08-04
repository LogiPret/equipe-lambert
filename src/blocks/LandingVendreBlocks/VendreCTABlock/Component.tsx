'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ScrollAnimation } from '@/components/scroll-animations'
import { Target, Phone } from 'lucide-react'

interface VendreCTABlockProps {
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

export const VendreCTABlockComponent: React.FC<VendreCTABlockProps> = ({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonTarget,
  secondaryButtonText,
  secondaryButtonTarget,
  phoneNumber,
}) => {
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
    <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center">
            <h2 className="text-4xl font-serif font-bold mb-6">{title}</h2>
            <p className="text-xl mb-8 text-emerald-100 max-w-2xl mx-auto">{subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 font-medium text-lg"
                onClick={handlePrimaryClick}
              >
                <Target className="h-5 w-5 mr-3" />
                {primaryButtonText}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent px-8 py-4 font-medium text-lg"
                onClick={handleSecondaryClick}
              >
                <Phone className="h-5 w-5 mr-3" />
                {secondaryButtonText}
                {phoneNumber && !secondaryButtonTarget ? `: ${phoneNumber}` : ''}
              </Button>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
