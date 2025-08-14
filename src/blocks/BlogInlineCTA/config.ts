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
        },
        validate: (val: any) => {
          if (!val || val.type !== 'reference' || !val.reference) {
            return 'Only internal links are allowed. Choose a Page or Post.'
          }
          return true
        },
      },
    }),
  ],
}
