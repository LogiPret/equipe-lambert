'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollAnimation } from '@/components/scroll-animations'
import {
  MapPin,
  Camera,
  Bed,
  Bath,
  Square,
  Calculator,
  Eye,
  ExternalLink,
  ArrowRight,
  Plus,
  Heart,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface Property {
  id: string
  image: string | { url?: string; alt?: string }
  price: number
  address: string
  beds: number
  baths: number
  sqft: string
  propType: 'maison' | 'condo' | 'townhouse' | 'loft'
  propStatus: 'a_vendre' | 'vendu' | 'option_achat'
  description?: string
  url?: string
}

interface InteractivePropertiesBlockProps {
  title?: string
  subtitle?: string
  buttonInfo: string
  props?: Property[]
  calculatorBlockId?: string
  hoverButtonIcon?: 'eye' | 'external-link' | 'arrow-right' | 'plus' | 'heart'
}

// Mock data for properties
const mockProperties: Property[] = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop&crop=house',
    price: 650000,
    address: '123 Rue Saint-Denis, Montréal',
    beds: 3,
    baths: 2,
    sqft: '1,850',
    propType: 'maison',
    propStatus: 'a_vendre',
    description: 'Magnifique maison familiale dans un quartier recherché',
    url: 'https://expquebec.com/en/brokers/david-lambert/',
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&crop=apartment',
    price: 425000,
    address: '456 Ave du Parc, Montréal',
    beds: 2,
    baths: 1,
    sqft: '1,200',
    propType: 'condo',
    propStatus: 'a_vendre',
    description: 'Condo moderne avec vue sur le parc',
    url: 'https://expquebec.com/en/brokers/david-lambert/',
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop&crop=townhouse',
    price: 750000,
    address: '789 Rue Sherbrooke, Westmount',
    beds: 4,
    baths: 3,
    sqft: '2,400',
    propType: 'townhouse',
    propStatus: 'a_vendre',
    description: 'Maison de ville luxueuse avec garage',
    url: 'https://expquebec.com/en/brokers/david-lambert/',
  },
  {
    id: '4',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop&crop=modern',
    price: 385000,
    address: '321 Boulevard Saint-Laurent, Montréal',
    beds: 1,
    baths: 1,
    sqft: '900',
    propType: 'loft',
    propStatus: 'a_vendre',
    description: 'Loft industriel au cœur du Plateau',
    url: 'https://expquebec.com/en/brokers/david-lambert/',
  },
  {
    id: '5',
    image:
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&h=300&fit=crop&crop=house',
    price: 520000,
    address: '654 Rue Beaubien, Rosemont',
    beds: 3,
    baths: 2,
    sqft: '1,650',
    propType: 'maison',
    propStatus: 'a_vendre',
    description: 'Charmante maison rénovée avec jardin',
    url: 'https://expquebec.com/en/brokers/david-lambert/',
  },
  {
    id: '6',
    image:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop&crop=luxury',
    price: 890000,
    address: '987 Chemin de la Côte-des-Neiges, Montréal',
    beds: 4,
    baths: 3,
    sqft: '2,800',
    propType: 'maison',
    propStatus: 'a_vendre',
    description: "Propriété d'exception avec piscine",
    url: 'https://expquebec.com/en/brokers/david-lambert/',
  },
]

const statusLabels = {
  a_vendre: 'À vendre',
  vendu: 'Vendu',
  option_achat: "Option d'achat",
}

const typeLabels = {
  maison: 'Maison',
  condo: 'Condo',
  townhouse: 'Maison de ville',
  loft: 'Loft',
}

export const InteractivePropertiesBlockComponent: React.FC<InteractivePropertiesBlockProps> = ({
  title = 'Propriétés Disponibles',
  subtitle = 'Découvrez notre sélection de propriétés et calculez vos paiements hypothécaires instantanément',
  buttonInfo = 'Utilisez le bouton "Calculer les paiements" pour estimer vos mensualités hypothécaires',
  props: cmsProperties,
  calculatorBlockId = 'mortgageCalculator',
  hoverButtonIcon = 'eye',
}) => {
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null)

  // Use CMS properties if available, otherwise fall back to mock data
  const properties = cmsProperties && cmsProperties.length > 0 ? cmsProperties : mockProperties

  // Helper function to get the appropriate icon component
  const getHoverIcon = (iconType: string) => {
    switch (iconType) {
      case 'eye':
        return Eye
      case 'external-link':
        return ExternalLink
      case 'arrow-right':
        return ArrowRight
      case 'plus':
        return Plus
      case 'heart':
        return Heart
      default:
        return Eye
    }
  }

  // Helper function to get image URL
  const getImageUrl = (image: string | { url?: string; alt?: string }) => {
    if (typeof image === 'string') {
      return image
    }
    return (
      image?.url ||
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop&crop=house'
    )
  }

  // Helper function to get image alt text
  const getImageAlt = (image: string | { url?: string; alt?: string }, address: string) => {
    if (typeof image === 'string') {
      return address
    }
    return image?.alt || address
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleCalculatorClick = (property: Property) => {
    // Scroll to mortgage calculator
    const calculatorElement =
      document.getElementById(`${calculatorBlockId}-0`) ||
      document.getElementById(calculatorBlockId) ||
      document.querySelector('[id*="mortgage"]') ||
      document.querySelector('[class*="mortgage"]')

    if (calculatorElement) {
      calculatorElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

      // Wait for scroll to complete, then update the form fields
      setTimeout(() => {
        // Function to trigger React events properly
        const triggerReactChange = (element: HTMLInputElement, value: string) => {
          // Set the value using the native setter
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value',
          )?.set
          if (nativeInputValueSetter) {
            nativeInputValueSetter.call(element, value)
          }

          // Trigger input event
          const inputEvent = new Event('input', { bubbles: true })
          element.dispatchEvent(inputEvent)

          // Trigger change event
          const changeEvent = new Event('change', { bubbles: true })
          element.dispatchEvent(changeEvent)
        }

        // Find and update home price input (usually the first number input)
        const numberInputs = calculatorElement.querySelectorAll('input[type="number"]')
        if (numberInputs.length > 0) {
          const homePriceInput = numberInputs[0] as HTMLInputElement
          triggerReactChange(homePriceInput, property.price.toString())
        }

        // Update down payment to 5% of property price
        if (numberInputs.length > 1) {
          const downPaymentInput = numberInputs[1] as HTMLInputElement
          const downPaymentAmount = Math.round(property.price * 0.05)
          triggerReactChange(downPaymentInput, downPaymentAmount.toString())
        }

        // Look for range inputs (sliders) and update them too
        const rangeInputs = calculatorElement.querySelectorAll('input[type="range"]')
        rangeInputs.forEach((slider, index) => {
          if (index === 0) {
            // First slider is likely home price
            triggerReactChange(slider as HTMLInputElement, property.price.toString())
          } else if (index === 1) {
            // Second slider is likely down payment
            const downPaymentAmount = Math.round(property.price * 0.05)
            triggerReactChange(slider as HTMLInputElement, downPaymentAmount.toString())
          }
        })

        // Try to find and click the 5% button for down payment
        setTimeout(() => {
          const buttons = Array.from(calculatorElement.querySelectorAll('button'))
          const fivePercentButton = buttons.find(
            (btn) => btn.textContent?.includes('5%') || btn.textContent?.includes('5 %'),
          )

          if (fivePercentButton) {
            ;(fivePercentButton as HTMLButtonElement).click()
          }
        }, 100)
      }, 800) // Wait for scroll animation to complete
    } else {
      console.warn('Mortgage calculator block not found. Looking for:', calculatorBlockId)
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-20">
            <div className="inline-block bg-blue-600 h-1 w-24 mb-6"></div>
            <h2 className="text-5xl font-serif font-bold text-gray-800 mb-6">{title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties && properties.length > 0 ? (
            properties.map((property, index) => {
              // Ensure property has required fields
              if (!property || !property.id || !property.price || !property.address) {
                return null
              }

              return (
                <ScrollAnimation key={property.id} animation="slideUp" delay={index * 200}>
                  <Card
                    className="flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-500 group border border-gray-200 bg-white hover:border-blue-500 relative h-full w-full max-w-full"
                    onMouseEnter={() => setHoveredProperty(property.id)}
                    onMouseLeave={() => setHoveredProperty(null)}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={getImageUrl(property.image)}
                        alt={getImageAlt(property.image, property.address)}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Property Status Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant={property.propStatus === 'vendu' ? 'secondary' : 'default'}
                          className={`${
                            property.propStatus === 'vendu'
                              ? 'bg-gray-600 text-white'
                              : property.propStatus === 'option_achat'
                                ? 'bg-orange-500 text-white'
                                : 'bg-blue-600 text-white'
                          } font-semibold`}
                        >
                          {statusLabels[property.propStatus]}
                        </Badge>
                      </div>

                      {/* Property Type Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant="outline"
                          className="bg-white/90 text-gray-700 border-gray-300"
                        >
                          {typeLabels[property.propType]}
                        </Badge>
                      </div>

                      {/* Photos Badge */}
                      <div className="absolute bottom-4 right-4">
                        <Badge variant="outline" className="bg-black/50 text-white border-white/30">
                          <Camera className="h-4 w-4 mr-2" />
                          12 photos
                        </Badge>
                      </div>

                      {/* Small Hover Button */}
                      {hoveredProperty === property.id && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300">
                          <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href={property.url || 'https://expquebec.com/en/brokers/david-lambert/'}
                          >
                            <Button
                              size="sm"
                              className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
                            >
                              {(() => {
                                const IconComponent = getHoverIcon(hoverButtonIcon)
                                return <IconComponent className="h-5 w-5" />
                              })()}
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6 flex flex-col flex-grow min-w-0">
                      <div className="mb-4 min-w-0">
                        <h3 className="text-2xl font-bold text-blue-600 mb-2 break-words">
                          {formatCurrency(property.price)}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
                          <p className="text-sm break-words">{property.address}</p>
                        </div>
                        {property.description && (
                          <p
                            className="text-gray-600 text-sm mb-4 break-words overflow-hidden"
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              lineHeight: '1.4em',
                              maxHeight: '4.2em', // 3 lines × 1.4em line height
                            }}
                          >
                            {property.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100 mb-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Bed className="h-4 w-4 mr-1 text-blue-500" />
                            <span>{property.beds}</span>
                          </div>
                          <div className="flex items-center">
                            <Bath className="h-4 w-4 mr-1 text-blue-500" />
                            <span>{property.baths}</span>
                          </div>
                          <div className="flex items-center">
                            <Square className="h-4 w-4 mr-1 text-blue-500" />
                            <span>{property.sqft} pi²</span>
                          </div>
                        </div>
                      </div>

                      {/* Calculator Button at Bottom */}
                      {property.propStatus === 'a_vendre' && (
                        <Button
                          onClick={() => handleCalculatorClick(property)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 transition-all duration-200"
                        >
                          <Calculator className="h-4 w-4 mr-2" />
                          Calculer les paiements
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              )
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">Aucune propriété disponible pour le moment.</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <ScrollAnimation animation="fadeIn" delay={600}>
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-6 text-lg">{buttonInfo}</p>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 font-semibold"
            >
              Voir toutes nos propriétés
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
