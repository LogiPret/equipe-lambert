import React from 'react'
import { CMSLink } from '@/components/Link'
import ClientButton from '@/blocks/Button/ClientButton.client'

// Local type until payload-types are regenerated
interface BlogInlineCTAProps {
  headline: string
  description?: string | null
  actionType?: 'link' | 'popup'
  link: {
    type?: 'reference' | 'custom' | 'archive' | null
    newTab?: boolean | null
    reference?: {
      relationTo: 'pages' | 'posts'
      value: any
    } | null
    url?: string | null
    archive?: 'posts' | null
    label?: string | null
    appearance?: 'default' | 'outline' | null
  }
  buttonText?: string | null
  popupRef?: any
}

const BlogInlineCTA: React.FC<BlogInlineCTAProps> = ({
  headline,
  description,
  link,
  actionType = 'link',
  buttonText,
  popupRef,
}) => {
  return (
    <div className="container my-10 text-center border border-brandingtheme p-8 rounded-[0.5rem]">
      <div className="flex flex-col gap-4 md:gap-6 max-w-[64rem]">
        <h3 className="text-4xl md:text-6xl font-bold text-brandingtheme">{headline}</h3>
        {description ? (
          <p className="text-brandingtheme leading-relaxed text-2xl">{description}</p>
        ) : null}
        <div className="pt-2">
          {actionType === 'popup' ? (
            <ClientButton
              text={buttonText || link.label || 'Learn more'}
              appearance={(link.appearance as any) || 'default'}
              size="xl"
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
          ) : (
            <CMSLink
              appearance="default"
              label={link.label || 'Learn more'}
              newTab={link.newTab}
              reference={link.reference as any}
              type={link.type || 'reference'}
              url={link.url}
              archive={link.archive || null}
              size="xl"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogInlineCTA
