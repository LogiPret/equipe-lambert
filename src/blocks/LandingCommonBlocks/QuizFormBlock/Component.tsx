'use client'

import React, { useState, FormEvent, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { cn } from '@/utilities/ui'
import type { QuizFormBlockProps, QuizFormData, QuizField, QuizStep } from './types'

// Utility functions for phone and email validation
const formatPhoneNumber = (value: string): string => {
  // Remove all non-digits to get clean number
  const cleaned = value.replace(/\D/g, '')

  // Limit to 10 digits max
  const limited = cleaned.substring(0, 10)

  // Apply progressive formatting based on length
  if (limited.length === 0) {
    return ''
  } else if (limited.length <= 3) {
    return `(${limited}`
  } else if (limited.length <= 6) {
    return `(${limited.slice(0, 3)}) ${limited.slice(3)}`
  } else {
    return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`
  }
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePhoneNumber = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length === 10
}

// Helpers to map form values to strings/numbers acceptable by Supabase
const toStringOrNull = (v: unknown): string | null => {
  if (v === undefined || v === null) return null
  if (Array.isArray(v)) return v.length ? v.join(', ') : null
  if (typeof v === 'string') return v.trim() ? v.trim() : null
  return String(v)
}

const toNumberOrNull = (v: unknown): number | null => {
  if (v === undefined || v === null) return null
  if (typeof v === 'number' && Number.isFinite(v)) return v
  const parsed = parseFloat(String(v).replace(/[^\d.-]/g, ''))
  return Number.isFinite(parsed) ? parsed : null
}

// Direct key-based mapping from formData with a tiny alias list
const getFirst = (obj: Record<string, any>, keys: string[]) => {
  for (const k of keys) {
    const v = obj?.[k]
    if (v !== undefined && v !== null && (typeof v !== 'string' || v.trim() !== '')) return v
  }
  return undefined
}

// Animated height wrapper component
const AnimatedHeightWrapper = ({
  children,
  currentStep,
}: {
  children: React.ReactNode
  currentStep: number
}) => {
  const [height, setHeight] = useState<number | 'auto'>('auto')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0]
        if (entry) {
          setHeight(entry.contentRect.height)
        }
      })

      resizeObserver.observe(contentRef.current)
      return () => resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [currentStep])

  return (
    <motion.div
      animate={{ height }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ overflow: 'hidden' }}
    >
      <div ref={contentRef}>{children}</div>
    </motion.div>
  )
}

// Progress Bar Component
const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const progress = ((current + 1) / total) * 100

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-branding25">
          Étape {current + 1} sur {total}
        </span>
        <span className="text-sm font-medium text-branding25">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-branding100 rounded-full h-2.5">
        <motion.div
          className="bg-accent3static h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// City select combobox component (uses hooks at top level)
const CitySelect = ({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) => {
  const cities = [
    'Beaconsfield',
    'Blainville',
    'Bois-des-Filion',
    'Boisbriand',
    'Boucherville',
    'Brossard',
    'Candiac',
    'Carignan',
    'Charlemagne',
    'Châteauguay',
    'Chomedey (Laval)',
    'Contrecoeur',
    'Côte-Saint-Luc',
    'Delson',
    'Deux-Montagnes',
    'Dollard-des-Ormeaux',
    'Dorval',
    'Fabreville (Laval)',
    'Greenfield Park (Longueuil)',
    'Hampstead',
    'Kirkland',
    'La Prairie',
    'Lachine (Montréal)',
    'L’Assomption',
    'Laval',
    'Laval-des-Rapides (Laval)',
    'L’Île-Bizard–Sainte-Geneviève (Montréal)',
    'Longueuil',
    'Lorraine',
    'Mascouche',
    'McMasterville',
    'Mercier–Hochelaga-Maisonneuve (Montréal)',
    'Mirabel',
    'Montréal',
    'Montréal-Est',
    'Montréal-Nord (Montréal)',
    'Montréal-Ouest',
    'Mont-Royal',
    'Mont-Saint-Hilaire',
    'Notre-Dame-de-Grâce–Côte-des-Neiges (Montréal)',
    'Outremont (Montréal)',
    'Pierrefonds-Roxboro (Montréal)',
    'Pointe-Claire',
    'Rivière-des-Prairies–Pointe-aux-Trembles (Montréal)',
    'Repentigny',
    'Rosemère',
    'Rosemont–La Petite-Patrie (Montréal)',
    'Saint-Amable',
    'Saint-Basile-le-Grand',
    'Saint-Bruno-de-Montarville',
    'Saint-Constant',
    'Sainte-Anne-de-Bellevue',
    'Sainte-Anne-des-Plaines',
    'Sainte-Catherine',
    'Sainte-Julie',
    'Sainte-Marthe-sur-le-Lac',
    'Sainte-Rose (Laval)',
    'Sainte-Thérèse',
    'Saint-Eustache',
    'Saint-Laurent (Montréal)',
    'Saint-Lambert',
    'Saint-Léonard (Montréal)',
    'Saint-Michel (Montréal)',
    'Saint-Vincent-de-Paul (Laval)',
    'Salaberry-de-Valleyfield',
    'Senneville',
    'Terrebonne',
    'Varennes',
    'Vaudreuil-Dorion',
    'Verdun (Montréal)',
    'Verchères',
    'Ville-Marie (Montréal)',
    'Villeray–Saint-Michel–Parc-Extension (Montréal)',
    'Westmount',
  ]

  const [query, setQuery] = React.useState(value || '')
  const [open, setOpen] = React.useState(false)

  // Keep input in sync when value prop changes
  React.useEffect(() => {
    setQuery(value || '')
  }, [value])

  const filtered = query
    ? cities.filter((c) => c.toLowerCase().includes(query.toLowerCase()))
    : cities

  return (
    <div className="space-y-2">
      <Input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          if (!open) setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        placeholder={placeholder || 'Rechercher une ville'}
        className="bg-branding0 text-branding100 border border-branding100 focus:border-branding0 focus-visible:ring-branding0 placeholder:text-branding50"
      />
      {open && (
        <div className="max-h-56 overflow-auto rounded-md border border-branding100 bg-branding0">
          {filtered.length === 0 ? (
            <div className="p-2 text-sm text-branding25">Aucune ville</div>
          ) : (
            <ul className="divide-y divide-branding100/20">
              {filtered.map((city) => (
                <li key={city}>
                  <button
                    type="button"
                    className={cn(
                      'w-full text-left px-3 py-2 hover:bg-branding90',
                      query === city ? 'bg-branding90 text-branding0' : 'text-branding100',
                    )}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      setQuery(city)
                      onChange(city)
                      setOpen(false)
                    }}
                  >
                    {city}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

// Field Component
const FormField = ({
  field,
  value,
  onChange,
  error,
}: {
  field: QuizField
  value: string | number | boolean | string[]
  onChange: (value: string | number | boolean | string[]) => void
  error?: string
}): React.JSX.Element => {
  const renderFieldInput = () => {
    switch (field.type) {
      case 'city':
        return (
          <CitySelect
            value={(value as string) || ''}
            onChange={(v) => onChange(v)}
            placeholder={field.placeholder}
          />
        )
      case 'optionCards': {
        const selected = Array.isArray(value) ? (value as string[]) : value ? [String(value)] : []
        const isMulti = !!field.allowMultiple
        const toggle = (val: string) => {
          if (isMulti) {
            const next = selected.includes(val)
              ? selected.filter((v) => v !== val)
              : [...selected, val]
            onChange(next)
          } else {
            onChange(val)
          }
        }

        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {field.options?.map((opt) => {
              const active = selected.includes(opt.value)
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggle(opt.value)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg border p-4 text-left',
                    'bg-branding100',
                    active ? 'border-branding0 bg-branding90' : 'border-branding100',
                    error && 'border-destructive',
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex h-5 w-5 flex-none items-center justify-center rounded-full',
                      active ? 'bg-branding0' : 'bg-branding90',
                    )}
                  >
                    <span
                      className={cn(
                        'h-2 w-2 rounded-full bg-branding100',
                        active ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </span>
                  <span className="font-medium text-branding0">{opt.label}</span>
                </button>
              )
            })}
          </div>
        )
      }
      case 'text':
        return (
          <Input
            id={field.id}
            placeholder={field.placeholder}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              'bg-branding0 text-branding100 border border-branding100 focus:border-branding0 focus-visible:ring-branding0 placeholder:text-branding50',
              error && 'border-destructive',
            )}
          />
        )

      case 'phone':
        return (
          <Input
            id={field.id}
            type="tel"
            placeholder={field.placeholder || '(000) 000-0000'}
            value={value as string}
            onChange={(e) => {
              const formatted = formatPhoneNumber(e.target.value)
              onChange(formatted)
            }}
            className={cn(
              'bg-branding0 text-branding100 border border-branding100 focus:border-branding0 focus-visible:ring-branding0 placeholder:text-branding50',
              error && 'border-destructive',
            )}
            maxLength={14}
          />
        )

      case 'email':
        return (
          <Input
            id={field.id}
            type="email"
            placeholder={field.placeholder || 'email@example.com'}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              'bg-branding0 text-branding100 border border-branding100 focus:border-branding0 focus-visible:ring-branding0 placeholder:text-branding50',
              error && 'border-destructive',
            )}
          />
        )

      case 'dropdown':
        return (
          <Select value={value as string} onValueChange={onChange}>
            <SelectTrigger
              className={cn(
                'bg-branding0 text-branding100 border border-branding100 focus:border-branding0 focus-visible:ring-branding0',
                error && 'border-destructive',
              )}
            >
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="bg-branding0 text-branding100 border border-branding100">
              {field.options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-branding100 focus:bg-branding90 focus:text-branding0"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case 'slider':
        return (
          <div className="space-y-4">
            <Slider
              value={[value as number]}
              onValueChange={(values: number[]) => onChange(values[0])}
              min={field.min || 0}
              max={field.max || 100}
              step={field.step || 1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-branding25">
              <span>{field.min || 0}</span>
              <span className="font-medium">{value}</span>
              <span>{field.max || 100}</span>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={field.id} className="text-sm font-medium text-branding0">
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {renderFieldInput()}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

// Step Component
const QuizFormStep = ({
  step,
  formData,
  errors,
  onFieldChange,
  direction,
}: {
  step: QuizStep
  formData: QuizFormData
  errors: Record<string, string>
  onFieldChange: (fieldId: string, value: string | number | boolean | string[]) => void
  direction: 'forward' | 'backward'
}) => {
  const variants = {
    enter: (direction: 'forward' | 'backward') => ({
      opacity: 0,
      x: direction === 'forward' ? 20 : -20,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: 'forward' | 'backward') => ({
      opacity: 0,
      x: direction === 'forward' ? -20 : 20,
    }),
  }

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-branding0 mb-2">{step.title}</h3>
        {step.subtitle && <p className="text-branding25">{step.subtitle}</p>}
      </div>

      <div className="flex flex-wrap -mx-2">
        {step.fields.map((field) => (
          <div
            key={field.id}
            className={cn('px-2 mb-4', field.width === 'half' ? 'w-full md:w-1/2' : 'w-full')}
          >
            <FormField
              field={field}
              value={
                formData[field.id] ??
                (field.type === 'slider' ? (field.defaultValue ?? field.min ?? 0) : '')
              }
              onChange={(value) => onFieldChange(field.id, value)}
              error={errors[field.id]}
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// Success Component
const SuccessStep = ({
  message,
  cta,
}: {
  message: string
  cta?: { text: string; link: string }
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Check className="w-8 h-8 text-green-100" />
      </motion.div>

      <p className="text-branding50 mb-8 max-w-md mx-auto">{message}</p>
    </motion.div>
  )
}

// Main Quiz Form Component
export const QuizFormBlock = (props: QuizFormBlockProps) => {
  const {
    title = 'Complete Our Quiz',
    subtitle = 'Help us understand your needs better',
    steps,
    submitButtonText = 'Submit',
    successMessage = "Thank you for completing our quiz! We'll be in touch soon.",
    ctaAfterSubmit,
    appearance = {},
  } = props

  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<QuizFormData>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')

  const handleFieldChange = (fieldId: string, value: string | number | boolean | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }))

    // Clear error for this field
    if (errors[fieldId]) {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: '',
      }))
    }
  }

  const validateCurrentStep = (showErrors = true): boolean => {
    const currentStepData = steps[currentStep]
    const newErrors: Record<string, string> = {}

    currentStepData.fields.forEach((field) => {
      const value = formData[field.id]
      let isEmpty = false
      let hasFormatError = false

      // Check if field is empty
      if (value === undefined || value === null) {
        isEmpty = true
      } else if (Array.isArray(value)) {
        isEmpty = value.length === 0
      } else if (typeof value === 'string') {
        isEmpty = value.trim() === ''
      } else if (typeof value === 'number') {
        isEmpty = false // numbers are always valid if present
      } else if (typeof value === 'boolean') {
        isEmpty = false // booleans are always valid (false is a valid state)
      }

      // Check required fields
      if (field.required && isEmpty) {
        newErrors[field.id] = `${field.label} est requis`
      }
      // Check format validation for non-empty fields
      else if (!isEmpty && typeof value === 'string') {
        if (field.type === 'email' && !validateEmail(value)) {
          hasFormatError = true
          newErrors[field.id] = 'Veuillez entrer une adresse e-mail valide'
        } else if (field.type === 'phone' && !validatePhoneNumber(value)) {
          hasFormatError = true
          newErrors[field.id] = 'Veuillez entrer un numéro de téléphone valide'
        }
      }
    })

    if (showErrors) {
      setErrors(newErrors)
    }
    return Object.keys(newErrors).length === 0
  }

  // Validate all steps before final submission
  const validateAllSteps = (
    showErrors = true,
  ): { isValid: boolean; firstErrorStepIndex: number | null } => {
    const newErrors: Record<string, string> = {}
    let firstErrorStepIndex: number | null = null

    steps.forEach((step, stepIndex) => {
      step.fields.forEach((field) => {
        const value = formData[field.id]
        let isEmpty = false

        if (value === undefined || value === null) {
          isEmpty = true
        } else if (Array.isArray(value)) {
          isEmpty = value.length === 0
        } else if (typeof value === 'string') {
          isEmpty = value.trim() === ''
        } else if (typeof value === 'number') {
          isEmpty = false
        } else if (typeof value === 'boolean') {
          isEmpty = false
        }

        if (field.required && isEmpty) {
          newErrors[field.id] = `${field.label} est requis`
          if (firstErrorStepIndex === null) firstErrorStepIndex = stepIndex
        } else if (!isEmpty && typeof value === 'string') {
          if (field.type === 'email' && !validateEmail(value)) {
            newErrors[field.id] = 'Veuillez entrer une adresse e-mail valide'
            if (firstErrorStepIndex === null) firstErrorStepIndex = stepIndex
          } else if (field.type === 'phone' && !validatePhoneNumber(value)) {
            newErrors[field.id] = 'Veuillez entrer un numéro de téléphone valide'
            if (firstErrorStepIndex === null) firstErrorStepIndex = stepIndex
          }
        }
      })
    })

    if (showErrors) setErrors(newErrors)
    return { isValid: Object.keys(newErrors).length === 0, firstErrorStepIndex }
  }

  const handleNext = () => {
    // Only show errors when trying to navigate or submit
    if (validateCurrentStep(true)) {
      if (currentStep < steps.length - 1) {
        setDirection('forward')
        setCurrentStep((prev) => prev + 1)
        // Clear errors when successfully moving to next step
        setErrors({})
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection('backward')
      setCurrentStep((prev) => prev - 1)
      // Clear errors when going back
      setErrors({})
    }
  }

  // Prevent form submission when pressing Enter on non-final steps
  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      if (currentStep < steps.length - 1) {
        e.preventDefault()
        // Optional: attempt next step on Enter if valid
        handleNext()
      }
    }
  }

  // Ensure Next button never triggers form submit implicitly
  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    handleNext()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Only submit if we're on the final step
    if (currentStep !== steps.length - 1) {
      return
    }

    const { isValid, firstErrorStepIndex } = validateAllSteps(true)
    if (!isValid) {
      if (firstErrorStepIndex !== null && firstErrorStepIndex !== currentStep) {
        setDirection(firstErrorStepIndex < currentStep ? 'backward' : 'forward')
        setCurrentStep(firstErrorStepIndex)
      }
      return
    }

    setIsSubmitting(true)

    try {
      // Map formData to Supabase table columns
      const fd = formData as Record<string, any>
      const directRow = {
        firstname: toStringOrNull(
          getFirst(fd, ['firstname', 'first_name', 'firstName', 'prenom', 'prénom']),
        ),
        lastname: toStringOrNull(getFirst(fd, ['lastname', 'last_name', 'lastName', 'nom'])),
        phone: toStringOrNull(getFirst(fd, ['phone', 'telephone', 'tel', 'téléphone'])),
        email: toStringOrNull(getFirst(fd, ['email', 'courriel', 'e-mail'])),
        budget: toNumberOrNull(getFirst(fd, ['budget', 'budget_max', 'price', 'prix', 'montant'])),
        when_interested: toStringOrNull(
          getFirst(fd, [
            'when_interested',
            'whenInterested',
            'delais',
            'délai',
            'timeline',
            'achat_quand',
            'quand',
            'temps',
            'mois',
          ]),
        ),
        type_property: toStringOrNull(
          getFirst(fd, ['type_property', 'propertyType', 'type_property_wanted', 'type']),
        ),
        area_wanted: toStringOrNull(
          getFirst(fd, ['area_wanted', 'city', 'ville', 'area', 'quartier', 'secteur']),
        ),
      }

      // Fallback mapping using steps (types/labels) if direct values are null
      const lower = (s?: string) => (s ? s.toLowerCase() : '')
      const allFields = steps.flatMap((s) => s.fields)
      const valByField = (f?: QuizField) => (f ? (fd as any)[f.id] : undefined)
      const pick = (cond: (f: QuizField) => boolean) => allFields.find(cond)

      const fallback = {
        firstname:
          directRow.firstname ||
          toStringOrNull(valByField(pick((f) => /first|prenom|prénom/i.test(f.id + f.label)))) ||
          null,
        lastname:
          directRow.lastname ||
          toStringOrNull(valByField(pick((f) => /last|nom/i.test(f.id + f.label)))) ||
          null,
        phone:
          directRow.phone ||
          toStringOrNull(valByField(pick((f) => f.type === 'phone'))) ||
          toStringOrNull(valByField(pick((f) => /phone|tel|télé/i.test(f.id + f.label)))) ||
          null,
        email:
          directRow.email ||
          toStringOrNull(valByField(pick((f) => f.type === 'email'))) ||
          toStringOrNull(valByField(pick((f) => /mail|courriel/i.test(f.id + f.label)))) ||
          null,
        budget:
          directRow.budget ??
          toNumberOrNull(valByField(pick((f) => f.type === 'slider'))) ??
          toNumberOrNull(
            valByField(pick((f) => /budget|prix|price|montant/i.test(f.id + f.label))),
          ) ??
          null,
        when_interested:
          directRow.when_interested ||
          toStringOrNull(
            valByField(
              pick((f) =>
                /when|quand|delai|délai|timeline|temps|mois/i.test(lower(f.id) + lower(f.label)),
              ),
            ),
          ) ||
          null,
        type_property:
          directRow.type_property ||
          toStringOrNull(
            valByField(pick((f) => /type|property|propri/i.test(lower(f.id) + lower(f.label)))),
          ) ||
          null,
        area_wanted:
          directRow.area_wanted ||
          toStringOrNull(
            valByField(
              pick((f) =>
                /area|ville|city|secteur|quartier|zone/i.test(lower(f.id) + lower(f.label)),
              ),
            ),
          ) ||
          null,
      }

      const row = fallback

      console.log('[Quiz Submit] Raw formData:', formData)
      console.log('[Quiz Submit] Direct row:', directRow)
      console.log('[Quiz Submit] Fallback row:', row)

      // Send data to n8n webhook via internal API route
      try {
        const webhookResponse = await fetch('/api/quiz-webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: row.firstname,
            lastname: row.lastname,
            phone: row.phone,
            email: row.email,
            budget: row.budget,
            when_interested: row.when_interested,
            type_property: row.type_property,
            area_wanted: row.area_wanted,
          }),
        })

        if (!webhookResponse.ok) {
          const errorData = await webhookResponse.json().catch(() => ({ error: 'Unknown error' }))
          console.error(
            `Webhook failed: ${webhookResponse.status} ${webhookResponse.statusText}`,
            errorData,
          )
        } else {
          const responseData = await webhookResponse.json()
          console.log('[Quiz Submit] Webhook successful:', responseData)
        }
      } catch (fetchError) {
        console.error('[Quiz Submit] Webhook error:', fetchError)
        // Continue execution even if webhook fails - don't block user experience
      }

      setIsCompleted(true)
    } catch (error) {
      console.error('Failed to submit quiz:', error)
      // Still complete the form to not block user experience
      // The webhook error is already logged above
      setIsCompleted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isCompleted) {
    return (
      <section className="py-16 px-4 bg-branding100">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-branding0 border-none">
            <SuccessStep message={successMessage} cta={ctaAfterSubmit} />
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-branding100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-branding0 mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-branding25 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <Card className="p-8 bg-branding90 border-none">
          <ProgressBar current={currentStep} total={steps.length} />

          <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown}>
            <AnimatedHeightWrapper currentStep={currentStep}>
              <AnimatePresence mode="wait" custom={direction}>
                <QuizFormStep
                  key={currentStep}
                  step={steps[currentStep]}
                  formData={formData}
                  errors={errors}
                  onFieldChange={handleFieldChange}
                  direction={direction}
                />
              </AnimatePresence>
            </AnimatedHeightWrapper>

            <div className="flex justify-between items-center mt-8 pt-6">
              <Button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2 bg-branding100 text-branding0"
              >
                <ChevronLeft className="w-4 h-4" />
                Retour
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNextClick}
                  className="flex items-center gap-2 bg-branding0 text-branding100"
                >
                  Continuer
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-accent3static text-branding0"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-4 h-4  rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      ...
                    </>
                  ) : (
                    <>
                      {submitButtonText}
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </section>
  )
}
