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
    return (
      <div className="my-8 flex justify-center">
        <ClientButton
          text={text}
          appearance={link.appearance || 'default'}
          size={size}
          popup={{
            title: popup?.title ?? 'Contact',
            firstNameLabel: popup?.firstNameLabel ?? 'Prénom',
            lastNameLabel: popup?.lastNameLabel ?? 'Nom',
            phoneLabel: popup?.phoneLabel ?? 'Téléphone',
            buttonText: popup?.buttonText ?? 'Envoyer',
            pdfName: popup?.pdfName ?? null,
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
