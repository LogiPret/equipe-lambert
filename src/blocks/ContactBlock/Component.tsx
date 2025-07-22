'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Phone, Mail, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { Media } from '@/payload-types'

interface ContactInfo {
  icon: 'phone' | 'mail' | 'location'
  title: string
  primary: string
  secondary?: string
  description: string
}

interface ContactBlockProps {
  title: string
  subtitle: string
  contactInfo: ContactInfo[]
  officeImage: {
    image: Media
    description: string
  }
  form: {
    title: string
    disclaimer: string
  }
}

function ScrollAnimation({
  children,
  animation = 'fadeIn',
  delay = 0,
}: {
  children: React.ReactNode
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight'
  delay?: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getAnimationClass = () => {
    const baseClass = 'transition-all duration-1000 ease-out'

    if (!isVisible) {
      switch (animation) {
        case 'fadeIn':
          return `${baseClass} opacity-0`
        case 'slideUp':
          return `${baseClass} opacity-0 translate-y-8`
        case 'slideLeft':
          return `${baseClass} opacity-0 translate-x-8`
        case 'slideRight':
          return `${baseClass} opacity-0 -translate-x-8`
        default:
          return `${baseClass} opacity-0`
      }
    }

    return `${baseClass} opacity-100 translate-y-0 translate-x-0`
  }

  return (
    <div ref={ref} className={getAnimationClass()}>
      {children}
    </div>
  )
}

const iconMap = {
  phone: Phone,
  mail: Mail,
  location: MapPin,
}

export default function ContactBlock({
  title,
  subtitle,
  contactInfo,
  officeImage,
  form,
}: ContactBlockProps) {
  const imageUrl =
    typeof officeImage.image === 'object' ? officeImage.image.url : '/placeholder.svg'
  const imageAlt =
    typeof officeImage.image === 'object' ? officeImage.image.alt || 'Office' : 'Office'

  return (
    <section id="contact" className="py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-20">
            <div className="inline-block bg-[#0f3046] h-1 w-24 mb-6"></div>
            <h2 className="text-5xl font-serif font-bold text-gray-800 mb-6">{title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <ScrollAnimation animation="slideRight" delay={300}>
            <div>
              <h3 className="text-3xl font-serif font-bold text-gray-800 mb-8">
                Rencontrez l&apos;équipe
              </h3>

              <div className="space-y-6 mb-10">
                {contactInfo.map((info, index) => {
                  const IconComponent = iconMap[info.icon]
                  return (
                    <div
                      key={index}
                      className="flex items-center p-6 border border-gray-300 bg-white shadow-sm hover:border-[#2d5f7f] transition-colors"
                    >
                      <IconComponent className="h-8 w-8 text-[#0f3046] mr-6" />
                      <div>
                        <p className="font-bold text-gray-800 text-lg">{info.title}</p>
                        <p className="text-gray-600 text-lg">{info.primary}</p>
                        {info.secondary && <p className="text-gray-600">{info.secondary}</p>}
                        <p className="text-sm text-[#0f3046] mt-2">{info.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="bg-white p-6 border border-gray-300 shadow-sm">
                <Image
                  src={imageUrl || '/placeholder.svg'}
                  alt={imageAlt}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover mb-4"
                />
                <p className="text-gray-600 text-center">{officeImage.description}</p>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slideLeft" delay={600}>
            <Card className="border border-gray-300 shadow-xl bg-white hover:border-[#2d5f7f] transition-colors">
              <CardContent className="p-10">
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-8">{form.title}</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Prénom *"
                      className="border border-gray-300 focus:border-[#0f3046] p-4 text-lg"
                    />
                    <Input
                      placeholder="Nom *"
                      className="border border-gray-300 focus:border-[#0f3046] p-4 text-lg"
                    />
                  </div>
                  <Input
                    placeholder="Email *"
                    type="email"
                    className="border border-gray-300 focus:border-[#0f3046] p-4 text-lg"
                  />
                  <Input
                    placeholder="Téléphone *"
                    type="tel"
                    className="border border-gray-300 focus:border-[#0f3046] p-4 text-lg"
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <select className="border border-gray-300 focus:border-[#0f3046] p-4 text-lg bg-white rounded-md">
                      <option>Type de projet *</option>
                      <option>Achat résidentiel</option>
                      <option>Vente résidentiel</option>
                      <option>Investissement commercial</option>
                      <option>Évaluation d&apos;équipe</option>
                    </select>
                    <select className="border border-gray-300 focus:border-[#0f3046] p-4 text-lg bg-white rounded-md">
                      <option>Membre d&apos;équipe préféré</option>
                      <option>David Lambert (Résidentiel)</option>
                      <option>Sarah Dubois (Condos)</option>
                      <option>Marc Tremblay (Commercial)</option>
                      <option>Indifférent</option>
                    </select>
                  </div>
                  <Textarea
                    placeholder="Décrivez votre projet immobilier en détail..."
                    rows={4}
                    className="border border-gray-300 focus:border-[#0f3046] p-4 text-lg"
                  />
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="consent" className="w-4 h-4" />
                    <label htmlFor="consent" className="text-sm text-gray-600">
                      J&apos;accepte d&apos;être contacté par l&apos;Équipe Lambert concernant ma
                      demande *
                    </label>
                  </div>
                  <Button className="w-full bg-[#0f3046] hover:bg-[#1a4a66] text-white py-4 font-medium text-lg">
                    Demander une consultation d&apos;équipe gratuite
                  </Button>
                </form>
                <p className="text-xs text-gray-500 mt-4 text-center">{form.disclaimer}</p>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
