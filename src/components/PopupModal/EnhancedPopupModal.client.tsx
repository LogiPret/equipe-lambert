'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ClientRenderBlocks } from './ClientRenderBlocks'
import { Send } from 'lucide-react'

type SimpleFormPopupProps = {
  popupType: 'form'
  title: string
  description?: string | null
  firstNameLabel?: string | null
  lastNameLabel?: string | null
  phoneLabel?: string | null
  emailLabel?: string | null
  includeFirstName?: boolean | null
  includeLastName?: boolean | null
  includePhone?: boolean | null
  includeEmail?: boolean | null
  firstNameRequired?: boolean | null
  lastNameRequired?: boolean | null
  phoneRequired?: boolean | null
  emailRequired?: boolean | null
  firstNameWidth?: 'half' | 'full' | null
  lastNameWidth?: 'half' | 'full' | null
  phoneWidth?: 'half' | 'full' | null
  emailWidth?: 'half' | 'full' | null
  buttonText?: string | null
  successMessage?: string | null
  pdfName?: string | null
  consentLabel?: string | null
}

type BlocksPopupProps = {
  popupType: 'blocks'
  title: string
  content: any[] // The blocks array
}

type EnhancedPopupModalProps = {
  open: boolean
  onClose: () => void
} & (SimpleFormPopupProps | BlocksPopupProps)

// Phone formatter matching the quiz behavior: (XXX) XXX-XXXX as you type
const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '')
  const limited = cleaned.substring(0, 10)

  if (limited.length === 0) return ''
  if (limited.length <= 3) return `(${limited}`
  if (limited.length <= 6) return `(${limited.slice(0, 3)}) ${limited.slice(3)}`
  return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`
}

export const EnhancedPopupModal: React.FC<EnhancedPopupModalProps> = ({
  open,
  onClose,
  ...props
}) => {
  // Local state only for phone input to enable live formatting
  const [phoneValue, setPhoneValue] = useState('')
  // Local state for other fields to control button enabled state
  const [firstNameValue, setFirstNameValue] = useState('')
  const [lastNameValue, setLastNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  // Agreement checkbox (UI-only, not sent to API)
  const [agreeChecked, setAgreeChecked] = useState(false)
  // Show lightweight confirmation UI after submit
  const [sent, setSent] = useState(false)
  // Track in-flight submit to disable the button and prevent double submit
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Fade-out animation state before closing
  const [fading, setFading] = useState(false)
  const closeTimerRef = useRef<number | null>(null)
  const fadeTimerRef = useRef<number | null>(null)
  const pathname = usePathname()
  const pageSlug = useMemo(() => {
    if (!pathname) return 'home'
    const parts = pathname.split('/').filter(Boolean)
    return parts[parts.length - 1] || 'home'
  }, [pathname])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Reset phone field whenever the modal is opened/closed to avoid stale values
  useEffect(() => {
    if (!open) {
      setPhoneValue('')
      setFirstNameValue('')
      setLastNameValue('')
      setEmailValue('')
      setAgreeChecked(false)
      setSent(false)
      setFading(false)
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current)
        closeTimerRef.current = null
      }
      if (fadeTimerRef.current) {
        window.clearTimeout(fadeTimerRef.current)
        fadeTimerRef.current = null
      }
    }
  }, [open])

  if (!open) return null

  const renderContent = () => {
    if (props.popupType === 'form') {
      const {
        title,
        description,
        firstNameLabel = 'Prénom',
        lastNameLabel = 'Nom',
        phoneLabel = 'Téléphone',
        emailLabel = 'Courriel',
        includeFirstName = true,
        includeLastName = true,
        includePhone = true,
        includeEmail = true,
        firstNameRequired = false,
        lastNameRequired = false,
        phoneRequired = false,
        emailRequired = false,
        firstNameWidth = 'half',
        lastNameWidth = 'half',
        phoneWidth = 'full',
        emailWidth = 'full',
        buttonText = 'Envoyer',
        successMessage,
        pdfName,
        consentLabel,
      } = props

      return (
        <>
          {!sent && (
            <div className="flex items-start justify-between mb-8">
              <h3 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                {title}
              </h3>
              <button
                aria-label="Close"
                onClick={onClose}
                className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-2xl text-brandingtheme hover:bg-brandingtheme/10 transition-colors"
              >
                ×
              </button>
            </div>
          )}
          {!sent && description ? (
            <p className="text-brandingtheme mb-6 leading-relaxed text-xl">{description}</p>
          ) : null}

          <form
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            onSubmit={async (e) => {
              e.preventDefault()
              const form = e.currentTarget as HTMLFormElement
              const formData = new FormData(form)
              const payload: Record<string, any> = {
                pageslug: formData.get('pageslug'),
                pdfname: formData.get('pdfname'),
              }
              if (includeFirstName) payload.firstname = formData.get('firstname')
              if (includeLastName) payload.lastname = formData.get('lastname')
              if (includePhone) payload.phone = formData.get('phone')
              if (includeEmail) payload.email = formData.get('email')
              try {
                setIsSubmitting(true)
                const res = await fetch('/api/popup-form', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload),
                })
                if (!res.ok) console.error('Failed to submit popup form')
              } catch (err) {
                console.error('Popup form submission error', err)
              } finally {
                setIsSubmitting(false)
                // Only show confirmation after server responds
                setSent(true)
                // Show sent UI for ~2s, then fade and close
                closeTimerRef.current = window.setTimeout(() => {
                  setFading(true)
                  fadeTimerRef.current = window.setTimeout(() => {
                    onClose()
                  }, 300)
                }, 2000)
              }
            }}
          >
            {/* Context: originating page slug */}
            <input type="hidden" name="pageslug" value={pageSlug} />
            {/* Context: selected PDF name from popup config */}
            {pdfName ? <input type="hidden" name="pdfname" value={pdfName} /> : null}
            {!sent && includeFirstName && (
              <label
                className={`flex flex-col gap-2 ${
                  // If lastName is not included, promote firstname to full width
                  !includeLastName
                    ? 'sm:col-span-2'
                    : firstNameWidth === 'full'
                      ? 'sm:col-span-2'
                      : ''
                }`}
              >
                <span className="text-base text-brandingtheme">{firstNameLabel}</span>
                <input
                  name="firstname"
                  type="text"
                  required={!!firstNameRequired}
                  value={firstNameValue}
                  onChange={(e) => setFirstNameValue(e.target.value)}
                  className="rounded-lg border border-brandingtheme bg-brandingtheme-foreground px-4 py-3 text-base outline-none focus:ring-2 focus:ring-brandingtheme/50"
                />
              </label>
            )}
            {!sent && includeLastName && (
              <label
                className={`flex flex-col gap-2 ${lastNameWidth === 'full' ? 'sm:col-span-2' : ''}`}
              >
                <span className="text-base text-brandingtheme">{lastNameLabel}</span>
                <input
                  name="lastname"
                  type="text"
                  required={!!lastNameRequired}
                  value={lastNameValue}
                  onChange={(e) => setLastNameValue(e.target.value)}
                  className="rounded-lg border border-brandingtheme bg-brandingtheme-foreground px-4 py-3 text-base outline-none focus:ring-2 focus:ring-brandingtheme/50"
                />
              </label>
            )}
            {!sent && includePhone && (
              <label
                className={`col-span-1 flex flex-col gap-2 ${
                  phoneWidth === 'full' ? 'sm:col-span-2' : ''
                }`}
              >
                <span className="text-base text-brandingtheme">{phoneLabel}</span>
                <input
                  name="phone"
                  type="tel"
                  placeholder="(000) 000-0000"
                  value={phoneValue}
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value)
                    setPhoneValue(formatted)
                  }}
                  required={!!phoneRequired}
                  maxLength={14}
                  className="rounded-lg border border-brandingtheme bg-brandingtheme-foreground px-4 py-3 text-base outline-none focus:ring-2 focus:ring-brandingtheme/50"
                />
              </label>
            )}
            {!sent && includeEmail && (
              <label
                className={`col-span-1 flex flex-col gap-2 ${
                  emailWidth === 'full' ? 'sm:col-span-2' : ''
                }`}
              >
                <span className="text-base text-brandingtheme">{emailLabel}</span>
                <input
                  name="email"
                  type="email"
                  required={!!emailRequired}
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  className="rounded-lg border border-brandingtheme bg-brandingtheme-foreground px-4 py-3 text-base outline-none focus:ring-2 focus:ring-brandingtheme/50"
                />
              </label>
            )}
            {!sent && (
              <div className="col-span-1 sm:col-span-2 flex items-start gap-3">
                <input
                  id="popup-agree"
                  name="popup-agree"
                  type="checkbox"
                  className="mt-1 h-5 w-5 rounded border-brandingtheme text-brandingtheme focus:ring-brandingtheme"
                  checked={agreeChecked}
                  onChange={(e) => setAgreeChecked(e.target.checked)}
                />
                <label
                  htmlFor="popup-agree"
                  className="text-sm text-brandingtheme/80 leading-relaxed"
                >
                  {consentLabel ||
                    "J'accepte de recevoir des communications concernant des contenus et services d’Équipe Lambert."}
                </label>
              </div>
            )}
            {!sent ? (
              <div className="col-span-1 sm:col-span-2">
                {(() => {
                  // Compute if form is ready: all included fields filled and checkbox checked
                  const phoneDigits = phoneValue.replace(/\D/g, '')
                  const firstOk = !includeFirstName || firstNameValue.trim().length > 0
                  const lastOk = !includeLastName || lastNameValue.trim().length > 0
                  const phoneOk = !includePhone || phoneDigits.length === 10
                  const emailOk = !includeEmail || emailValue.trim().length > 0
                  const isReady = agreeChecked && firstOk && lastOk && phoneOk && emailOk
                  return (
                    <button
                      type="submit"
                      disabled={isSubmitting || !isReady}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-brandingtheme px-6 py-3 text-base font-semibold text-brandingtheme-foreground shadow-sm hover:bg-brandingtheme/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {buttonText}
                    </button>
                  )
                })()}
              </div>
            ) : (
              <div className="col-span-1 sm:col-span-2">
                <div className="flex w-full items-center justify-center gap-3 rounded-xl px-6 py-6 sm:text-2xl text-lg font-semibold text-brandingtheme">
                  <Send className="h-5 w-5 text-blue-500" />
                  <span>{successMessage || 'Merci! Votre demande a été envoyée.'}</span>
                </div>
              </div>
            )}
          </form>
        </>
      )
    }

    if (props.popupType === 'blocks') {
      const { content } = props
      return (
        <>
          {/* Close button positioned absolutely for blocks */}
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full text-2xl text-white bg-black/50 hover:bg-black/70 transition-colors"
          >
            ×
          </button>

          {/* Render blocks directly without wrapper */}
          <ClientRenderBlocks blocks={content} />
        </>
      )
    }

    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={props.title}
        className={`relative z-10 w-full max-h-[90vh] overflow-y-auto transition-opacity duration-300 ${
          props.popupType === 'blocks'
            ? 'popup-blocks-type max-w-3xl rounded-xl' // Remove padding, background, rounded corners for blocks
            : 'popup-form-type max-w-2xl rounded-2xl bg-brandingtheme-foreground p-8 shadow-2xl sm:p-10 md:p-12'
        } ${fading ? 'opacity-0' : 'opacity-100'}`}
      >
        {renderContent()}
      </div>
    </div>
  )
}

export default EnhancedPopupModal
