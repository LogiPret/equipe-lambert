import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides: {
      hooks: {
        afterChange: [
          async ({ doc, req, operation }: any) => {
            // Only process new submissions (create operation) for contact forms
            if (operation === 'create' && doc.form && typeof doc.form === 'object') {
              const formTitle = doc.form.title

              // Check if it's one of our contact forms
              if (
                formTitle === 'Formulaire Vendre' ||
                formTitle === 'Formulaire Acheter' ||
                formTitle === 'Contact Form' ||
                formTitle === 'vendreHeroForm' ||
                doc.form === 'vendreHeroForm' // Also check by form ID
              ) {
                try {
                  const { insertContactSubmission } = await import('../lib/supabase')

                  // Extract form data from submission
                  const formData: any = {}
                  if (doc.submissionData && Array.isArray(doc.submissionData)) {
                    doc.submissionData.forEach((field: any) => {
                      const fieldName = field.field || field.name
                      const fieldValue = field.value

                      if (fieldName && fieldValue !== undefined) {
                        formData[fieldName] = fieldValue
                      }
                    })
                  }

                  // Determine type based on form title or form ID
                  let type = 'CONTACT'
                  if (formTitle === 'Formulaire Vendre' || doc.form === 'vendreHeroForm') {
                    type = 'VENDRE'
                  } else if (formTitle === 'Formulaire Acheter') {
                    type = 'ACHETER'
                  }

                  // Map the form data to Supabase format
                  const supabaseData = {
                    prenom: formData.prenom || '',
                    nom: formData.nom || '',
                    email: formData.email || formData.Email || '', // Handle both cases
                    phone: formData.phone || '',
                    type: type,
                    vendre_address: formData.vendre_address || undefined, // Include property address
                    vendre_delais: formData.vendre_delais || undefined, // Include the new field
                  }

                  // Only send to Supabase if we have the required fields
                  if (supabaseData.prenom && supabaseData.nom && supabaseData.email) {
                    const result = await insertContactSubmission(supabaseData)
                    if (result.success) {
                      req.payload.logger.info(
                        `${type} form submission sent to Supabase successfully`,
                      )
                    } else {
                      req.payload.logger.warn(`Supabase submission skipped: ${result.reason}`)
                    }
                  }
                } catch (error: any) {
                  req.payload.logger.error('Failed to send form submission to Supabase:', error)
                  // Don't throw error to avoid breaking the main form submission
                }
              }
            }
            return doc
          },
        ],
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  payloadCloudPlugin(),
]
