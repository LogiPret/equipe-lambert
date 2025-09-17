import React from 'react'
import { CMSLink } from '@/components/Link'
import type { Page, Post, Popup } from '@/payload-types'
import ClientButton from './ClientButton.client'

interface ButtonBlockProps {
  text: string
  size?: 'sm' | 'default' | 'lg' | 'xl'
  actionType?: 'link' | 'popup'
  link: {
    type?: 'custom' | 'reference' | 'archive' | 'scroll' | null
    newTab?: boolean | null
    reference?: {
      relationTo: 'pages' | 'posts'
      value: Page | Post | string | number
    } | null
    url?: string | null
    scrollTarget?: string | null
    appearance?: 'default' | 'outline'
  }
  popupRef?: number | Popup | null
}

export const ButtonBlock: React.FC<ButtonBlockProps> = ({
  text,
  link,
  size = 'default',
  actionType = 'link',
  popupRef,
}) => {
  if (actionType === 'popup') {
    const popup = typeof popupRef === 'object' ? popupRef : null

    if (popup) {
      // Handle both popup types
      if (popup.popupType === 'blocks') {
        return (
          <div className="my-8 flex justify-center">
            <ClientButton
              text={text}
              appearance={link.appearance || 'default'}
              size={size}
              popup={{
                popupType: 'blocks',
                title: popup.title ?? 'Contact',
                content: popup.content ?? [],
              }}
            />
          </div>
        )
      } else {
        // Default to form popup for backwards compatibility
        return (
          <div className="my-8 flex justify-center">
            <ClientButton
              text={text}
              appearance={link.appearance || 'default'}
              size={size}
              popup={{
                popupType: 'form',
                title: popup.title ?? 'Contact',
                description: popup.description ?? null,
                firstNameLabel: popup.firstNameLabel ?? 'Prénom',
                lastNameLabel: popup.lastNameLabel ?? 'Nom',
                phoneLabel: popup.phoneLabel ?? 'Téléphone',
                emailLabel: popup.emailLabel ?? 'Courriel',
                includeFirstName: popup.includeFirstName ?? true,
                includeLastName: popup.includeLastName ?? true,
                includePhone: popup.includePhone ?? true,
                includeEmail: popup.includeEmail ?? true,
                firstNameRequired: popup.firstNameRequired ?? false,
                lastNameRequired: popup.lastNameRequired ?? false,
                phoneRequired: popup.phoneRequired ?? false,
                emailRequired: popup.emailRequired ?? false,
                firstNameWidth: (popup as any).firstNameWidth ?? 'half',
                lastNameWidth: (popup as any).lastNameWidth ?? 'half',
                phoneWidth: (popup as any).phoneWidth ?? 'full',
                emailWidth: (popup as any).emailWidth ?? 'full',
                buttonText: popup.buttonText ?? 'Envoyer',
                pdfName: popup.pdfName ?? null,
                successMessage: popup.successMessage ?? undefined,
                consentLabel: (popup as any).consentLabel ?? undefined,
              }}
            />
          </div>
        )
      }
    }

    // Fallback if popup is null
    return (
      <div className="my-8 flex justify-center">
        <ClientButton
          text={text}
          appearance={link.appearance || 'default'}
          size={size}
          popup={{
            popupType: 'form',
            title: 'Contact',
            firstNameLabel: 'Prénom',
            lastNameLabel: 'Nom',
            phoneLabel: 'Téléphone',
            emailLabel: 'Courriel',
            includeFirstName: true,
            includeLastName: true,
            includePhone: true,
            includeEmail: true,
            firstNameRequired: false,
            lastNameRequired: false,
            phoneRequired: false,
            emailRequired: false,
            buttonText: 'Envoyer',
            pdfName: null,
          }}
        />
      </div>
    )
  }

  return (
    <div className="my-8 flex justify-center">
      <CMSLink
        type={link.type}
        reference={link.reference}
        url={link.url}
        scrollTarget={link.scrollTarget}
        newTab={link.newTab}
        appearance={link.appearance || 'default'}
        size={size}
        className="inline-flex items-center justify-center no-underline"
      >
        {text}
      </CMSLink>
    </div>
  )
}

export default ButtonBlock
