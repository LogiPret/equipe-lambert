import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import ClientButton from '@/blocks/Button/ClientButton.client'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container">
      <div className="bg-card rounded border-border border p-4 my-10 flex flex-col gap-8 lg:flex-row md:flex-col md:justify-between md:items-center">
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map((row: any, i) => {
            const { actionType = 'link', link, popupRef, buttonText } = row
            if (actionType === 'popup') {
              return (
                <ClientButton
                  key={i}
                  text={buttonText || link?.label || 'Learn more'}
                  appearance={(link?.appearance as any) || 'default'}
                  size="lg"
                  popup={(() => {
                    if (!popupRef) {
                      return {
                        popupType: 'form' as const,
                        title: 'Contact',
                        firstNameLabel: 'Prénom',
                        lastNameLabel: 'Nom',
                        phoneLabel: 'Téléphone',
                        buttonText: 'Envoyer',
                        pdfName: null,
                      }
                    }

                    if (popupRef.popupType === 'blocks') {
                      return {
                        popupType: 'blocks' as const,
                        title: popupRef.title ?? 'Contact',
                        content: popupRef.content ?? [],
                      }
                    } else {
                      return {
                        popupType: 'form' as const,
                        title: popupRef.title ?? 'Contact',
                        description: popupRef.description ?? null,
                        firstNameLabel: popupRef.firstNameLabel ?? 'Prénom',
                        lastNameLabel: popupRef.lastNameLabel ?? 'Nom',
                        phoneLabel: popupRef.phoneLabel ?? 'Téléphone',
                        emailLabel: popupRef.emailLabel ?? 'Courriel',
                        includeFirstName: popupRef.includeFirstName ?? true,
                        includeLastName: popupRef.includeLastName ?? true,
                        includePhone: popupRef.includePhone ?? true,
                        includeEmail: popupRef.includeEmail ?? true,
                        firstNameRequired: popupRef.firstNameRequired ?? false,
                        lastNameRequired: popupRef.lastNameRequired ?? false,
                        phoneRequired: popupRef.phoneRequired ?? false,
                        emailRequired: popupRef.emailRequired ?? false,
                        buttonText: popupRef.buttonText ?? 'Envoyer',
                        pdfName: popupRef.pdfName ?? null,
                        successMessage: popupRef.successMessage ?? undefined,
                        consentLabel: (popupRef as any).consentLabel ?? undefined,
                      }
                    }
                  })()}
                />
              )
            }
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
