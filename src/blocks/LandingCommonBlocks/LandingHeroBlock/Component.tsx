'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { DollarSign, Target, Zap, Search, Key, Bell } from 'lucide-react'
import { ScrollAnimation } from '@/components/scroll-animations'
import type { Media } from '@/payload-types'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface Stat {
  value: string
  label: string
}

interface LinkData {
  type?: 'reference' | 'custom'
  reference?: {
    value: string | number
    relationTo: string
  }
  url?: string
  newTab?: boolean
}

interface ButtonData {
  text: string
  actionType: 'scroll' | 'link'
  scrollTarget?: string
  link?: LinkData
}

interface LandingHeroBlockProps {
  mode: 'vendre' | 'acheter'
  badgeText: string
  title: string
  subtitle?: string
  description?: string
  stats: Stat[]
  primaryButton: ButtonData
  secondaryButton: ButtonData
  formTitle: string
  formFields?: {
    // Vendre-specific
    addressPlaceholder?: string
    timeframePlaceholder?: string
    // Acheter-specific
    propertyTypePlaceholder?: string
    cityPlaceholder?: string
    // Common
    firstNamePlaceholder: string
    lastNamePlaceholder: string
    phonePlaceholder: string
    emailPlaceholder: string
    submitButtonText: string
    disclaimerText: string
  }
  timeframeOptions?: { option: string }[]
  propertyTypeOptions?: { option: string }[]
  backgroundImage?: Media | string
}

export default function LandingHeroBlock({
  mode = 'vendre',
  badgeText,
  title,
  subtitle,
  description,
  stats,
  primaryButton,
  secondaryButton,
  formTitle,
  formFields,
  timeframeOptions,
  propertyTypeOptions,
  backgroundImage,
}: LandingHeroBlockProps) {
  const router = useRouter()

  // Mode-specific defaults that override database values
  const modeDefaults = {
    vendre: {
      badgeText: 'VENDEZ VOTRE PROPRIÉTÉ',
      title: 'Vendez votre propriété',
      subtitle: 'rapidement et au meilleur prix',
      description:
        "Notre équipe d'experts vous accompagne dans la vente de votre bien immobilier avec une approche personnalisée et des résultats garantis.",
      formTitle: 'Évaluation gratuite de votre propriété',
      stats: [
        { value: '95%', label: 'Taux de satisfaction' },
        { value: '21 jours', label: 'Délai moyen de vente' },
        { value: '500+', label: 'Propriétés vendues' },
      ],
    },
    acheter: {
      badgeText: 'ACCÈS PRIVILÉGIÉ AUX NOUVEAUTÉS',
      title: 'Trouvez la propriété',
      subtitle: 'de vos rêves',
      description:
        'Notre équipe vous donne accès aux meilleures opportunités du marché montréalais. Plus de 150 propriétés exclusives disponibles.',
      formTitle: 'Recherche personnalisée de propriété',
      stats: [
        { value: '150+', label: 'Propriétés disponibles' },
        { value: '24h', label: 'Accès prioritaire' },
        { value: '95%', label: 'Clients satisfaits' },
      ],
    },
  }

  // Use mode-specific defaults if values match the original vendre defaults
  const currentDefaults = modeDefaults[mode]
  const effectiveBadgeText =
    badgeText === 'VENDEZ VOTRE PROPRIÉTÉ' ? currentDefaults.badgeText : badgeText
  const effectiveTitle = title === 'Vendez votre propriété' ? currentDefaults.title : title
  const effectiveSubtitle =
    subtitle === 'rapidement et au meilleur prix' ? currentDefaults.subtitle : subtitle
  const effectiveDescription =
    description ===
    "Notre équipe d'experts vous accompagne dans la vente de votre bien immobilier avec une approche personnalisée et des résultats garantis."
      ? currentDefaults.description
      : description
  const effectiveFormTitle =
    formTitle === 'Évaluation gratuite de votre propriété' ? currentDefaults.formTitle : formTitle
  const effectiveStats =
    !stats ||
    (stats.length === 3 && stats[0]?.value === '95%' && stats[0]?.label === 'Taux de satisfaction')
      ? currentDefaults.stats
      : stats
  const getInitialFormData = () => {
    if (mode === 'vendre') {
      return {
        vendre_address: '',
        prenom: '',
        nom: '',
        phone: '',
        email: '',
        vendre_delais: '',
      }
    } else {
      return {
        prenom: '',
        nom: '',
        email: '',
        phone: '',
        acheter_propertyType: '',
        acheter_city: '',
      }
    }
  }

  const [formData, setFormData] = useState(getInitialFormData())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Handle background image URL
  const backgroundImageUrl =
    typeof backgroundImage === 'object' && backgroundImage?.url
      ? backgroundImage.url
      : typeof backgroundImage === 'string'
        ? backgroundImage
        : '/website-template-OG.webp' // fallback image

  // Convert description to HTML string
  const descriptionHTML = effectiveDescription || ''

  // Mode-specific styling and content
  const modeConfig = {
    vendre: {
      badgeIcon: DollarSign,
      badgeClass: 'bg-accent5static',
      primaryButtonClass: 'bg-accent5static hover:bg-accent6static',
      primaryButtonIcon: Target,
      formButtonIcon: Zap,
      successTitle: '✓ Merci !',
      successMessage: 'Votre demande a été envoyée avec succès. Nous vous contactons sous peu.',
      successButtonText: 'Nos Blogs',
      successButtonLink: '/posts',
      apiEndpoint: '/api/vendrehero-form',
      formFields: ['vendre_address', 'prenom', 'nom', 'phone', 'email', 'vendre_delais'],
    },
    acheter: {
      badgeIcon: Key,
      badgeClass: 'bg-accent3static',
      primaryButtonClass: 'bg-accent3static hover:bg-accent4static',
      primaryButtonIcon: Search,
      formButtonIcon: Bell,
      successTitle: '✓ Merci !',
      successMessage:
        "Votre recherche a été enregistrée avec succès. Nous vous contacterons dès qu'une propriété correspondante sera disponible.",
      successButtonText: 'Nos Propriétés',
      successButtonLink: '/posts',
      apiEndpoint: '/api/acheterhero-form',
      formFields: ['prenom', 'nom', 'email', 'phone', 'acheter_propertyType', 'acheter_city'],
    },
  }

  const config = modeConfig[mode]
  const BadgeIcon = config.badgeIcon
  const PrimaryButtonIcon = config.primaryButtonIcon
  const FormButtonIcon = config.formButtonIcon

  // Scroll to block functionality
  const scrollToBlock = (blockId: string) => {
    const element = document.getElementById(blockId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    } else {
      console.warn(`Block with ID "${blockId}" not found`)
    }
  }

  // Handle button clicks
  const handleButtonClick = (button: ButtonData) => {
    if (button.actionType === 'scroll' && button.scrollTarget) {
      scrollToBlock(button.scrollTarget)
    } else if (button.actionType === 'link' && button.link) {
      const { link } = button
      let href = ''

      if (link.type === 'custom' && link.url) {
        href = link.url
      } else if (link.type === 'reference' && link.reference) {
        href = `/${link.reference.value}`
      }

      if (href) {
        if (link.newTab) {
          window.open(href, '_blank')
        } else {
          window.location.href = href
        }
      }
    }
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Validate required fields
      if (!formData.prenom || !formData.nom || !formData.email || !formData.phone) {
        throw new Error('Veuillez remplir tous les champs obligatoires')
      }

      // Create payload data based on current form data
      const payloadData = {
        submissionData: Object.entries(formData).map(([field, value]) => ({
          field,
          value,
        })),
      }

      const response = await fetch(config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit form')
      }

      setIsSubmitted(true)
      setFormData(getInitialFormData())
    } catch (err) {
      console.error('Form submission error:', err)
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-[var(--gradient-start-static)] via-[var(--gradient-via-static)] to-[var(--gradient-end-static)] text-branding0 py-24 overflow-hidden">
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
                <Badge
                  className={`${config.badgeClass} text-branding0 px-6 py-3 text-lg font-medium mb-6`}
                >
                  <BadgeIcon className="h-5 w-5 mr-2" />
                  {effectiveBadgeText}
                </Badge>
              </div>
            </ScrollAnimation>

            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-tight">
              {effectiveTitle}
              {effectiveSubtitle && (
                <span className="block text-accent1static font-chiffon">{effectiveSubtitle}</span>
              )}
            </h1>

            <div
              className="text-xl md:text-2xl mb-8 leading-relaxed text-branding0 max-w-2xl"
              dangerouslySetInnerHTML={{ __html: descriptionHTML }}
            />

            {effectiveStats && effectiveStats.length > 0 && (
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {effectiveStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-branding0 mb-2">{stat.value}</div>
                    <div className="text-accent1static text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                size="lg"
                className={`${config.primaryButtonClass} text-branding0 px-8 py-4 font-medium text-lg`}
                onClick={() => handleButtonClick(primaryButton)}
              >
                <PrimaryButtonIcon className="h-5 w-5 mr-3" />
                {primaryButton.text}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-borderprimarystatic text-branding0 hover:bg-branding0 hover:text-branding100 bg-transparent px-8 py-4 font-medium text-lg"
                onClick={() => handleButtonClick(secondaryButton)}
              >
                {secondaryButton.text}
              </Button>
            </div>
          </div>

          <ScrollAnimation animation="slideLeft" delay={200}>
            <div className="relative">
              <Card className="bg-secondarystatic p-8 backdrop-blur-sm">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="text-accent5static text-xl font-semibold mb-2">
                      {config.successTitle}
                    </div>
                    <p className="text-gray-600 mb-4">{config.successMessage}</p>
                    <p className="pt-4">Cliquez ci-dessous pour en savoir plus</p>
                    <Button
                      className="bg-branding100 hover:bg-accent2static text-branding0 py-4 font-medium text-lg disabled:opacity-50"
                      onClick={() => router.push(config.successButtonLink)}
                    >
                      {config.successButtonText}
                    </Button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-serif font-bold text-branding100 mb-6">
                      {effectiveFormTitle}
                    </h3>
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      {/* Vendre-specific address field */}
                      {mode === 'vendre' && (
                        <Input
                          name="vendre_address"
                          value={(formData as any).vendre_address || ''}
                          onChange={handleInputChange}
                          placeholder={
                            formFields?.addressPlaceholder || 'Adresse de votre propriété'
                          }
                          className="border border-borderprimarystatic focus:border-bordersecondarystatic p-4 text-lg bg-branding0"
                        />
                      )}

                      {/* Common name fields */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleInputChange}
                          placeholder={formFields?.firstNamePlaceholder || 'Prénom *'}
                          className="border border-borderprimarystatic focus:border-bordersecondarystatic p-4 bg-branding0"
                          required
                        />
                        <Input
                          name="nom"
                          value={formData.nom}
                          onChange={handleInputChange}
                          placeholder={formFields?.lastNamePlaceholder || 'Nom *'}
                          className="border border-borderprimarystatic focus:border-bordersecondarystatic p-4 bg-branding0"
                          required
                        />
                      </div>

                      {/* Common contact fields */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={formFields?.emailPlaceholder || 'Email *'}
                          type="email"
                          className="border border-borderprimarystatic focus:border-bordersecondarystatic p-4 bg-branding0"
                          required
                        />
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={formFields?.phonePlaceholder || 'Téléphone *'}
                          className="border border-borderprimarystatic focus:border-bordersecondarystatic p-4 bg-branding0"
                          required
                        />
                      </div>

                      {/* Mode-specific additional fields */}
                      {mode === 'vendre' ? (
                        <select
                          name="vendre_delais"
                          value={(formData as any).vendre_delais || ''}
                          onChange={handleInputChange}
                          className="w-full border border-branding25 focus:border-branding100 p-4 bg-branding0 text-branding50"
                        >
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
                      ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                          <select
                            name="acheter_propertyType"
                            value={(formData as any).acheter_propertyType || ''}
                            onChange={handleInputChange}
                            className="border text-branding100 border-branding25 focus:border-branding100 p-4 bg-branding0 rounded-md w-full"
                          >
                            <option value="">
                              {formFields?.propertyTypePlaceholder || 'Type de propriété'}
                            </option>
                            {propertyTypeOptions && propertyTypeOptions.length > 0
                              ? propertyTypeOptions.map((option, index) => (
                                  <option key={index} value={option.option}>
                                    {option.option}
                                  </option>
                                ))
                              : [
                                  <option key="default-1" value="Maison">
                                    Maison
                                  </option>,
                                  <option key="default-2" value="Condo">
                                    Condo
                                  </option>,
                                  <option key="default-3" value="Townhouse">
                                    Townhouse
                                  </option>,
                                  <option key="default-4" value="Loft">
                                    Loft
                                  </option>,
                                ]}
                          </select>
                          <Input
                            name="acheter_city"
                            value={(formData as any).acheter_city || ''}
                            onChange={handleInputChange}
                            placeholder={formFields?.cityPlaceholder || 'Ville'}
                            className="border border-branding25 focus:border-branding100 p-4 bg-branding0"
                          />
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-branding100 hover:bg-accent2static text-branding0 py-4 font-medium text-lg disabled:opacity-50"
                      >
                        <FormButtonIcon className="h-5 w-5 mr-2" />
                        {isSubmitting
                          ? 'Envoi en cours...'
                          : formFields?.submitButtonText ||
                            (mode === 'vendre'
                              ? 'Obtenir mon évaluation gratuite'
                              : 'Recevoir les nouvelles propriétés')}
                      </Button>
                    </form>
                  </>
                )}

                <p className="text-xs text-branding50 mt-4 text-center">
                  {formFields?.disclaimerText ||
                    (mode === 'vendre'
                      ? '* Évaluation professionnelle sans engagement'
                      : '* Accès privilégié aux inscriptions exclusives')}
                </p>
              </Card>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
