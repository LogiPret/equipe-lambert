import type { Block } from 'payload'

import { link } from '@/fields/link'

export const BlogInlineCTA: Block = {
  slug: 'blogInlineCTA',
  interfaceName: 'BlogInlineCTA',
  labels: {
    singular: 'Blog Inline CTA',
    plural: 'Blog Inline CTAs',
  },
  fields: [
    {
      name: 'actionType',
      type: 'radio',
      label: 'Action Type',
      defaultValue: 'link',
      options: [
        { label: 'Link', value: 'link' },
        { label: 'Popup', value: 'popup' },
      ],
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Headline',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    // Single button using the shared link field. Includes built-in `label` for button text.
    link({
      appearances: ['default', 'outline'],
      overrides: {
        admin: {
          description: 'Select a Page or Post. Only internal links are allowed for this button.',
          condition: (_, { actionType }) => actionType !== 'popup',
        },
        validate: (val: any) => {
          if (!val || val.type !== 'reference' || !val.reference) {
            return 'Only internal links are allowed. Choose a Page or Post.'
          }
          return true
        },
      },
    }),
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      admin: {
        description: 'Text shown on the CTA button when using Popup action.',
        condition: (_, { actionType }) => actionType === 'popup',
      },
    },
    {
      name: 'popupRef',
      type: 'relationship',
      relationTo: 'popups',
      label: 'Popup',
      admin: {
        description: 'Select the popup to display when the button is clicked.',
        condition: (_, { actionType }) => actionType === 'popup',
      },
      required: false,
    },
  ],
}
