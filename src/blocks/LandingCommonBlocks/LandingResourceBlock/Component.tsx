'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollAnimation } from '@/components/scroll-animations'
import { CheckSquare, Eye, ArrowRight, Download, FileText, Calculator } from 'lucide-react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

interface Resource {
  title: string
  description: string
  icon: 'download' | 'fileText' | 'calculator' | 'checkSquare'
  color: 'blue' | 'emerald' | 'indigo' | 'amber' | 'red'
  buttonText?: string
  buttonAction?: string
}

interface LandingResourceBlockProps {
  mode: 'vendre' | 'acheter'
  imagePosition: 'left' | 'right'

  // Main content section (inspired by ChecklistBlock)
  mainContent?: {
    badgeText?: string
    title?: string
    description?: string
    highlight?: string
    buttonText?: string
    buttonAction?: string
  }

  // Image content
  imageContent?: {
    mainImage?: Media | string
    imageAlt?: string
    imageCaption?: string
    imageSubcaption?: string
  }

  // Resources section (inspired by BuyerResourcesBlock)
  resources?: {
    title?: string
    subtitle?: string
    items?: Resource[]
  }
}

const iconMap = {
  download: Download,
  fileText: FileText,
  calculator: Calculator,
  checkSquare: CheckSquare,
}

const colorMap = {
  blue: 'bg-blue-100 text-blue-600',
  emerald: 'bg-emerald-100 text-emerald-600',
  indigo: 'bg-indigo-100 text-indigo-600',
  amber: 'bg-amber-100 text-amber-600',
  red: 'bg-red-100 text-red-600',
}

export const LandingResourceBlockComponent: React.FC<LandingResourceBlockProps> = ({
  mode = 'acheter',
  imagePosition = 'left',
  mainContent,
  imageContent,
  resources,
}) => {
  // Mode-specific defaults
  const modeDefaults = {
    vendre: {
      badgeText: 'VENDEZ INTELLIGEMMENT',
      title: 'Les Outils Essentiels pour Maximiser Votre Vente',
      description:
        "Découvrez nos ressources exclusives pour vendre votre propriété rapidement et au meilleur prix. De l'évaluation à la signature, nous vous accompagnons à chaque étape.",
      highlight: 'Notre expertise vous garantit une vente réussie',
      buttonText: 'Obtenir mes ressources',
      resourcesTitle: 'Ressources pour vendeurs',
      resourcesSubtitle:
        'Des outils et guides gratuits pour maximiser la valeur de votre propriété.',
      bgGradient: 'from-secondarystatic to-branding0',
      badgeColor: 'bg-emerald-200 text-accent6static',
      buttonClass: 'bg-accent5static',
      resourceButtonClass: 'border-accent5static text-accent5static hover:bg-accent5static',
    },
    acheter: {
      badgeText: 'ACHETEZ COMME UN PRO',
      title: "L'Art de l'Achat : Ne Laissez Rien au Hasard",
      description:
        "Lors d'une visite, l'émotion peut prendre le dessus. Nos ressources vous aident à rester objectif et à évaluer chaque aspect crucial : structure, plomberie, électricité, quartier, et plus encore.",
      highlight:
        'Utilisez nos outils pour poser les bonnes questions et prendre les meilleures décisions',
      buttonText: 'Recevoir mes ressources',
      resourcesTitle: 'Ressources pour acheteurs',
      resourcesSubtitle: "Des outils et guides gratuits pour vous aider dans votre projet d'achat.",
      bgGradient: 'from-secondarystatic to-branding0',
      badgeColor: 'bg-accent1static text-accent3static',
      buttonClass: 'bg-accent3static hover:bg-branding100',
      resourceButtonClass: 'border-accent3static text-accent3static hover:bg-accent3static',
    },
  }

  const currentDefaults = modeDefaults[mode]

  // Final values (user input or defaults)
  const finalBadgeText = mainContent?.badgeText || currentDefaults.badgeText
  const finalTitle = mainContent?.title || currentDefaults.title
  const finalDescription = mainContent?.description || currentDefaults.description
  const finalHighlight = mainContent?.highlight || currentDefaults.highlight
  const finalButtonText = mainContent?.buttonText || currentDefaults.buttonText
  const finalResourcesTitle = resources?.title || currentDefaults.resourcesTitle
  const finalResourcesSubtitle = resources?.subtitle || currentDefaults.resourcesSubtitle

  // Default image fallback
  const mainImage = imageContent?.mainImage
  const imageUrl =
    typeof mainImage === 'string'
      ? mainImage
      : mainImage?.url || '/placeholder.svg?height=600&width=500'

  const finalImageAlt =
    imageContent?.imageAlt ||
    (mode === 'acheter' ? 'Checklist de visite de propriété' : 'Guide de vente immobilière')
  const finalImageCaption =
    imageContent?.imageCaption ||
    (mode === 'acheter' ? 'La Checklist de Visite Essentielle' : 'Le Guide de Vente Complet')
  const finalImageSubcaption =
    imageContent?.imageSubcaption ||
    (mode === 'acheter' ? 'Ne manquez aucun détail' : 'Maximisez votre prix de vente')

  // Handle button click
  const handleButtonClick = () => {
    if (mainContent?.buttonAction) {
      // Could implement scroll to section or external link logic here
      console.log('Button clicked:', mainContent.buttonAction)
    }
  }

  const handleResourceClick = (resource: Resource) => {
    if (resource.buttonAction) {
      console.log('Resource clicked:', resource.buttonAction)
    }
  }

  // Determine grid order based on image position
  const imageOrder = imagePosition === 'left' ? 'order-first' : 'order-last'
  const contentOrder = imagePosition === 'left' ? 'order-last' : 'order-first'

  return (
    <section className={`py-20 bg-gradient-to-br ${currentDefaults.bgGradient}`}>
      <div className="container mx-auto px-4">
        {/* Main Content Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <div
            className={`relative h-full min-h-[400px] rounded-lg overflow-hidden shadow-2xl ${imageOrder}`}
          >
            <Image
              src={imageUrl}
              alt={finalImageAlt}
              fill
              className="object-cover transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-branding75 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-branding0">
              <h3 className="text-2xl font-bold">{finalImageCaption}</h3>
              <p className="text-accent1static">{finalImageSubcaption}</p>
            </div>
          </div>

          {/* Content */}
          <div className={`${imagePosition === 'left' ? 'pl-8' : 'pr-8'} ${contentOrder}`}>
            <div
              className={`inline-flex items-center ${currentDefaults.badgeColor} px-4 py-2 rounded-full text-sm font-semibold mb-4`}
            >
              <CheckSquare className="h-5 w-5 mr-2" />
              {finalBadgeText}
            </div>
            <h2 className="text-4xl font-serif font-bold text-branding100 mb-6">{finalTitle}</h2>
            <p className="text-lg text-branding75 mb-6 leading-relaxed">{finalDescription}</p>
            <p className="text-lg text-branding75 mb-8 leading-relaxed">
              <strong>{finalHighlight}</strong>
            </p>
            <Button
              size="lg"
              className={`${currentDefaults.buttonClass} text-branding0 px-8 py-4 font-medium text-lg`}
              onClick={handleButtonClick}
            >
              <Eye className="h-5 w-5 mr-3" />
              {finalButtonText}
            </Button>
          </div>
        </div>

        {/* Resources Section */}
        {resources?.items && resources.items.length > 0 && (
          <div>
            <ScrollAnimation animation="fadeIn">
              <div className="text-center mb-16">
                <div
                  className={`inline-block ${mode === 'acheter' ? 'bg-accent3static' : 'bg-accent5static'} h-1 w-24 mb-6`}
                ></div>
                <h2 className="text-4xl font-serif font-bold text-branding100 mb-6">
                  {finalResourcesTitle}
                </h2>
                <p className="text-xl text-branding75 max-w-3xl mx-auto">
                  {finalResourcesSubtitle}
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid md:grid-cols-3 gap-8">
              {resources.items.map((resource, index) => {
                const IconComponent = iconMap[resource.icon]
                const colorClass = colorMap[resource.color]

                return (
                  <Card className="h-full flex flex-col text-center p-8 hover:shadow-xl transition-shadow bg-branding0">
                    <div className="flex justify-center mb-6">
                      <div className={`p-4 rounded-full ${colorClass}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-branding100 mb-4">{resource.title}</h3>
                    <p className="text-branding75 flex-grow mb-6">{resource.description}</p>
                    <Button
                      variant="outline"
                      className={`mt-auto ${currentDefaults.resourceButtonClass} hover:text-branding0 bg-transparent`}
                      onClick={() => handleResourceClick(resource)}
                    >
                      {resource.buttonText || 'Télécharger'} <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Card>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
