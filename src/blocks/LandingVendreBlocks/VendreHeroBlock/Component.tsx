'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { DollarSign, Target, Zap } from 'lucide-react'
import { ScrollAnimation } from '@/components/scroll-animations'
import type { Media } from '@/payload-types'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { scrollToBlock as smoothScrollToBlock } from '@/utilities/smoothScroll'

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

interface VendreHeroBlockProps {
  badgeText: string
  title: string
  subtitle?: string
  description?: string
  stats: Stat[]
  primaryButton: ButtonData
  secondaryButton: ButtonData
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
  primaryButton,
  secondaryButton,
  formTitle,
  formFields,
  timeframeOptions,
  backgroundImage,
}: VendreHeroBlockProps) {
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    vendre_address: '',
    prenom: '',
    nom: '',
    phone: '',
    email: '',
    vendre_delais: '',
  })
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
  const descriptionHTML = description || ''

  // Scroll to block functionality
  const scrollToBlock = (blockId: string) => {
    smoothScrollToBlock(blockId, { offset: 0, duration: 600 })
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
        // For reference links, we would need to construct the URL
        // This depends on your routing structure
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

      // Send to Supabase via our custom API endpoint
      const payloadData = {
        submissionData: [
          { field: 'vendre_address', value: formData.vendre_address },
          { field: 'prenom', value: formData.prenom },
          { field: 'nom', value: formData.nom },
          { field: 'phone', value: formData.phone },
          { field: 'email', value: formData.email },
          { field: 'vendre_delais', value: formData.vendre_delais },
        ],
      }

      const response = await fetch('/api/vendrehero-form', {
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
      setFormData({
        vendre_address: '',
        prenom: '',
        nom: '',
        phone: '',
        email: '',
        vendre_delais: '',
      })
    } catch (err) {
      console.error('Form submission error:', err)
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

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
                  onClick={() => handleButtonClick(primaryButton)}
                >
                  <Target className="h-5 w-5 mr-3" />
                  {primaryButton.text}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#0f3046] bg-transparent px-8 py-4 font-medium text-lg"
                  onClick={() => handleButtonClick(secondaryButton)}
                >
                  {secondaryButton.text}
                </Button>
              </div>
            </ScrollAnimation>
          </div>

          <ScrollAnimation animation="slideLeft" delay={800}>
            <div className="relative">
              <Card className="bg-white/95 p-8 backdrop-blur-sm">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="text-green-600 text-xl font-semibold mb-2">✓ Merci !</div>
                    <p className="text-gray-600">
                      Votre demande a été envoyée avec succès. <br /> Nous vous contactons sous peu.
                    </p>
                    <p className="pt-8">Clicquez ci dessous pour consulter nos blogs</p>
                    <Button
                      className="bg-[#0f3046] hover:bg-[#1a4a66] text-white py-4 font-medium text-lg disabled:opacity-50"
                      onClick={() => router.push('/posts')}
                    >
                      Nos Blogs
                    </Button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                      {formTitle}
                    </h3>
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <Input
                        name="vendre_address"
                        value={formData.vendre_address}
                        onChange={handleInputChange}
                        placeholder={formFields?.addressPlaceholder || 'Adresse de votre propriété'}
                        className="border border-gray-300 focus:border-[#0f3046] p-4 text-lg"
                      />
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleInputChange}
                          placeholder={formFields?.firstNamePlaceholder || 'Prénom *'}
                          className="border border-gray-300 focus:border-[#0f3046] p-4"
                          required
                        />
                        <Input
                          name="nom"
                          value={formData.nom}
                          onChange={handleInputChange}
                          placeholder={formFields?.lastNamePlaceholder || 'Nom de famille *'}
                          className="border border-gray-300 focus:border-[#0f3046] p-4"
                          required
                        />
                      </div>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={formFields?.phonePlaceholder || 'Téléphone *'}
                        className="border border-gray-300 focus:border-[#0f3046] p-4"
                        required
                      />
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={formFields?.emailPlaceholder || 'Email *'}
                        type="email"
                        className="border border-gray-300 focus:border-[#0f3046] p-4"
                        required
                      />
                      <select
                        name="vendre_delais"
                        value={formData.vendre_delais}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 focus:border-[#0f3046] p-4 bg-white text-gray-500"
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
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#0f3046] hover:bg-[#1a4a66] text-white py-4 font-medium text-lg disabled:opacity-50"
                      >
                        <Zap className="h-5 w-5 mr-2" />
                        {isSubmitting
                          ? 'Envoi en cours...'
                          : formFields?.submitButtonText || 'Obtenir mon évaluation gratuite'}
                      </Button>
                    </form>
                  </>
                )}

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
