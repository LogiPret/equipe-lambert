'use client'
import React, { useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { ClientRenderBlocks } from './ClientRenderBlocks'

type SimpleFormPopupProps = {
  popupType: 'form'
  title: string
  firstNameLabel?: string | null
  lastNameLabel?: string | null
  phoneLabel?: string | null
  buttonText?: string | null
  pdfName?: string | null
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

export const EnhancedPopupModal: React.FC<EnhancedPopupModalProps> = ({
  open,
  onClose,
  ...props
}) => {
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

  if (!open) return null

  const renderContent = () => {
    if (props.popupType === 'form') {
      const {
        title,
        firstNameLabel = 'Prénom',
        lastNameLabel = 'Nom',
        phoneLabel = 'Téléphone',
        buttonText = 'Envoyer',
        pdfName,
      } = props

      return (
        <>
          <div className="flex items-start justify-between mb-8">
            <h3 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">{title}</h3>
            <button
              aria-label="Close"
              onClick={onClose}
              className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-2xl text-brandingtheme hover:bg-brandingtheme/10 transition-colors"
            >
              ×
            </button>
          </div>

          <form
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            onSubmit={async (e) => {
              e.preventDefault()
              const form = e.currentTarget as HTMLFormElement
              const formData = new FormData(form)
              const payload = {
                pageslug: formData.get('pageslug'),
                pdfname: formData.get('pdfname'),
                firstname: formData.get('firstname'),
                lastname: formData.get('lastname'),
                phone: formData.get('phone'),
              }
              try {
                const res = await fetch('/api/popup-form', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload),
                })
                if (!res.ok) {
                  console.error('Failed to submit popup form')
                }
              } catch (err) {
                console.error('Popup form submission error', err)
              } finally {
                onClose()
              }
            }}
          >
            {/* Context: originating page slug */}
            <input type="hidden" name="pageslug" value={pageSlug} />
            {/* Context: selected PDF name from popup config */}
            {pdfName ? <input type="hidden" name="pdfname" value={pdfName} /> : null}
            <label className="flex flex-col gap-2">
              <span className="text-base text-brandingtheme">{firstNameLabel}</span>
              <input
                name="firstname"
                type="text"
                required
                className="rounded-lg border border-brandingtheme bg-brandingtheme-foreground px-4 py-3 text-base outline-none focus:ring-2 focus:ring-brandingtheme/50"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-base text-brandingtheme">{lastNameLabel}</span>
              <input
                name="lastname"
                type="text"
                required
                className="rounded-lg border border-brandingtheme bg-brandingtheme-foreground px-4 py-3 text-base outline-none focus:ring-2 focus:ring-brandingtheme/50"
              />
            </label>
            <label className="col-span-1 flex flex-col gap-2 sm:col-span-2">
              <span className="text-base text-brandingtheme">{phoneLabel}</span>
              <input
                name="phone"
                type="tel"
                required
                className="rounded-lg border border-brandingtheme bg-brandingtheme-foreground px-4 py-3 text-base outline-none focus:ring-2 focus:ring-brandingtheme/50"
              />
            </label>
            <div className="col-span-1 sm:col-span-2">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-xl bg-brandingtheme px-6 py-3 text-base font-semibold text-brandingtheme-foreground shadow-sm hover:bg-brandingtheme/90 transition-colors"
              >
                {buttonText}
              </button>
            </div>
          </form>
        </>
      )
    }

    if (props.popupType === 'blocks') {
      const { title, content } = props

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
        className={`relative z-10 w-full max-h-[90vh] overflow-y-auto ${
          props.popupType === 'blocks'
            ? 'popup-blocks-type max-w-3xl rounded-xl' // Remove padding, background, rounded corners for blocks
            : 'popup-form-type max-w-4xl rounded-2xl bg-brandingtheme-foreground p-8 shadow-2xl sm:p-10 md:p-12'
        }`}
      >
        {renderContent()}
      </div>
    </div>
  )
}

export default EnhancedPopupModal
