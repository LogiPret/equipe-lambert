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
  description: string
}

interface FormField {
  fieldType: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select' | 'checkbox'
  name: string
  label: string
  placeholder?: string
  required: boolean
  width: 'full' | 'half'
  options?: Array<{
    label: string
    value: string
  }>
  rows?: number
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
    formFields: FormField[]
    submitButton: {
      text: string
      loadingText: string
    }
    checkboxText?: string
    successMessage?: string
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

function renderFormField(
  field: FormField,
  index: number,
  onFieldChange: (name: string, value: string) => void,
) {
  const baseClassName =
    'border border-gray-300 focus:border-[#0f3046] focus:ring-1 focus:ring-[#0f3046] p-4 text-lg bg-white text-gray-900 rounded-md'
  const widthClassName = field.width === 'half' ? 'md:col-span-1' : 'md:col-span-2'

  const fieldId = `field-${field.name}-${index}`
  const isRequired = field.required
  const placeholder = field.placeholder + (isRequired ? ' *' : '')

  switch (field.fieldType) {
    case 'text':
    case 'email':
    case 'tel':
    case 'number':
      return (
        <div key={fieldId} className={widthClassName}>
          <Input
            id={fieldId}
            name={field.name}
            type={field.fieldType}
            placeholder={placeholder}
            required={isRequired}
            className={baseClassName}
            onChange={(e) => onFieldChange(field.name, e.target.value)}
          />
        </div>
      )

    case 'textarea':
      return (
        <div key={fieldId} className="md:col-span-2">
          <Textarea
            id={fieldId}
            name={field.name}
            placeholder={placeholder}
            required={isRequired}
            rows={field.rows || 4}
            className={baseClassName}
            onChange={(e) => onFieldChange(field.name, e.target.value)}
          />
        </div>
      )

    case 'select':
      return (
        <div key={fieldId} className={widthClassName}>
          <select
            id={fieldId}
            name={field.name}
            required={isRequired}
            className={`${baseClassName} w-full text-gray-900 appearance-none`}
            style={{ minWidth: '100%' }}
            onChange={(e) => onFieldChange(field.name, e.target.value)}
          >
            <option value="" className="text-gray-500">
              {field.label}
              {isRequired ? ' *' : ''}
            </option>
            {field.options?.map((option, optIndex) => (
              <option key={optIndex} value={option.value} className="text-gray-900">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )

    default:
      return null
  }
}

export default function ContactBlock({
  title,
  subtitle,
  contactInfo,
  officeImage,
  form,
}: ContactBlockProps) {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const imageUrl =
    typeof officeImage.image === 'object' ? officeImage.image.url : '/placeholder.svg'
  const imageAlt =
    typeof officeImage.image === 'object' ? officeImage.image.alt || 'Office' : 'Office'

  // Filter out checkbox fields since we handle the checkbox separately
  const formFields = form.formFields.filter((field) => field.fieldType !== 'checkbox')

  // Check if all required fields are filled
  const isFormValid = formFields.every((field) => {
    if (!field.required) return true
    const value = formData[field.name]
    return value && value.trim() !== ''
  })

  // Button should be enabled only when form is valid AND checkbox is checked
  const isSubmitEnabled = isFormValid && isCheckboxChecked && !isSubmitting

  // Handle form field changes
  const handleFieldChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSubmitEnabled) return

    setIsSubmitting(true)

    // Simulate form submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-24 bg-secondarystatic">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-20">
            <div className="inline-block bg-branding100 h-1 w-24 mb-6"></div>
            <h2 className="text-5xl font-serif font-bold text-branding100 mb-6">{title}</h2>
            <p className="text-xl text-branding75 max-w-3xl mx-auto">{subtitle}</p>
          </div>
        </ScrollAnimation>
        <div className="grid lg:grid-cols-2 gap-16">
          <ScrollAnimation animation="slideRight" delay={300}>
            <div>
              <div className="space-y-6 mb-10">
                {contactInfo.map((info, index) => {
                  const IconComponent = iconMap[info.icon]
                  return (
                    <div
                      key={index}
                      className="flex items-center p-6 border border-borderprimarystatic bg-branding0 shadow-sm hover:bordersecondarystatic transition-colors"
                    >
                      <IconComponent className="h-8 w-8 text-branding100 mr-6" />
                      <div>
                        <p className="font-bold text-branding100 text-lg">{info.title}</p>
                        <p className="text-branding75 text-lg">{info.primary}</p>
                        <p className="text-sm text-branding100 mt-2">{info.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="bg-branding0 p-6 border border-borderprimarystatic shadow-sm">
                <Image
                  src={imageUrl || '/placeholder.svg'}
                  alt={imageAlt}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover mb-4"
                />
                <p className="text-branding75 text-center">{officeImage.description}</p>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slideLeft" delay={600}>
            <Card className="border border-borderprimarystatic shadow-xl bg-branding0 hover:border-bordersecondarystatic transition-colors">
              <CardContent className="p-10">
                <h3 className="text-2xl font-serif font-bold text-branding100 mb-8">
                  {form.title}
                </h3>

                {isSubmitted ? (
                  // Success message
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 border border-green-600">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-branding100 mb-4">Message Sent!</h4>
                    <p className="text-branding75 leading-relaxed">
                      {form.successMessage ||
                        'Merci pour votre message ! Nous vous contacterons bientôt.'}
                    </p>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4">
                      {formFields.map((field, index) =>
                        renderFormField(field, index, handleFieldChange),
                      )}
                    </div>

                    {/* Simple checkbox with admin-configured text */}
                    <div className="flex items-start space-x-3">
                      <input
                        id="agreement-checkbox"
                        name="agreement"
                        type="checkbox"
                        required
                        checked={isCheckboxChecked}
                        onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                        className="w-5 h-5 mt-0.5 text-branding100 bg-branding0 border-2 border-borderprimarystatic rounded focus:ring-branding100 focus:ring-2"
                      />
                      <label
                        htmlFor="agreement-checkbox"
                        className="text-sm text-branding75 leading-relaxed"
                      >
                        {form.checkboxText || 'I agree to the terms and conditions'} *
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={!isSubmitEnabled}
                      className={`w-full py-4 font-medium text-lg transition-colors ${
                        !isSubmitEnabled
                          ? 'bg-branding25 cursor-not-allowed text-branding0'
                          : 'bg-branding100 hover:bg-accent2static text-branding0'
                      }`}
                    >
                      {isSubmitting ? form.submitButton.loadingText : form.submitButton.text}
                    </Button>
                  </form>
                )}

                {!isSubmitted && (
                  <p className="text-xs text-branding50 mt-4 text-center">{form.disclaimer}</p>
                )}
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
