'use client'

import { useState, FormEvent, useRef, useEffect } from 'react'
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
import { Checkbox } from '@/components/ui/checkbox'
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
        <span className="text-sm font-medium text-muted-foreground">
          Step {current + 1} of {total}
        </span>
        <span className="text-sm font-medium text-muted-foreground">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2.5">
        <motion.div
          className="bg-primary h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
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
}) => {
  const renderFieldInput = () => {
    switch (field.type) {
      case 'text':
        return (
          <Input
            id={field.id}
            placeholder={field.placeholder}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className={cn(error && 'border-destructive')}
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
            className={cn(error && 'border-destructive')}
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
            className={cn(error && 'border-destructive')}
          />
        )

      case 'dropdown':
        return (
          <Select value={value as string} onValueChange={onChange}>
            <SelectTrigger className={cn(error && 'border-destructive')}>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
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
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{field.min || 0}</span>
              <span className="font-medium">{value}</span>
              <span>{field.max || 100}</span>
            </div>
          </div>
        )

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id={field.id} checked={value as boolean} onCheckedChange={onChange} />
            <Label
              htmlFor={field.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {field.label}
            </Label>
          </div>
        )

      case 'checkboxGroup':
        const currentValues = Array.isArray(value) ? value : []

        // Use checkbox options directly (label as both label and value)
        const checkboxOptions = field.checkboxOptions || []

        const handleCheckboxGroupChange = (optionLabel: string, checked: boolean) => {
          if (field.allowMultiple !== false) {
            // Multiple selection allowed
            if (checked) {
              onChange([...currentValues, optionLabel])
            } else {
              onChange(currentValues.filter((v) => v !== optionLabel))
            }
          } else {
            // Single selection (radio-like behavior)
            if (checked) {
              onChange([optionLabel])
            } else {
              onChange([])
            }
          }
        }

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {checkboxOptions.map((option: any) => {
              const isSelected = currentValues.includes(option.label)
              return (
                <div
                  key={option.label}
                  className={cn(
                    'relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200',
                    'hover:border-blue-300 hover:shadow-md',
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white',
                  )}
                  onClick={() => handleCheckboxGroupChange(option.label, !isSelected)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={cn(
                          'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                          isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300 bg-white',
                        )}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                      </div>
                      <span
                        className={cn(
                          'text-base font-medium transition-colors',
                          isSelected ? 'text-blue-900' : 'text-gray-700',
                        )}
                      >
                        {option.label}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-2 w-full">
      {field.type !== 'checkbox' && (
        <Label htmlFor={field.id} className="text-sm font-medium">
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
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
        <h3 className="text-2xl font-bold text-foreground mb-2">{step.title}</h3>
        {step.subtitle && <p className="text-muted-foreground">{step.subtitle}</p>}
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
                (field.type === 'checkboxGroup'
                  ? [] // Start with empty array for checkbox groups
                  : field.type === 'checkbox'
                    ? (field.defaultChecked ?? false)
                    : field.type === 'slider'
                      ? (field.defaultValue ?? field.min ?? 0)
                      : '')
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
        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Check className="w-8 h-8 text-green-600" />
      </motion.div>

      <h3 className="text-2xl font-bold text-foreground mb-4">Thank You!</h3>

      <p className="text-muted-foreground mb-8 max-w-md mx-auto">{message}</p>

      {cta && (
        <Button asChild size="lg">
          <a href={cta.link} target="_blank" rel="noopener noreferrer">
            {cta.text}
          </a>
        </Button>
      )}
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
        isEmpty = false // checkboxes are always valid (can be unchecked)
      }

      // Check required fields
      if (field.required && isEmpty) {
        newErrors[field.id] = `${field.label} est requis`
      }
      // Check format validation for non-empty fields
      else if (!isEmpty && typeof value === 'string') {
        if (field.type === 'email' && !validateEmail(value)) {
          hasFormatError = true
          newErrors[field.id] = 'Please enter a valid email address'
        } else if (field.type === 'phone' && !validatePhoneNumber(value)) {
          hasFormatError = true
          newErrors[field.id] = 'Please enter a valid phone number'
        }
      }
    })

    if (showErrors) {
      setErrors(newErrors)
    }
    return Object.keys(newErrors).length === 0
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateCurrentStep(true)) {
      return
    }

    setIsSubmitting(true)

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log('Quiz form data:', formData)
      setIsCompleted(true)
    } catch (error) {
      console.error('Failed to submit quiz:', error)
      // Handle error appropriately
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isCompleted) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <SuccessStep message={successMessage} cta={ctaAfterSubmit} />
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        <Card className="p-8">
          <ProgressBar current={currentStep} total={steps.length} />

          <form onSubmit={handleSubmit}>
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

            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={handleNext} className="flex items-center gap-2">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Submitting...
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
