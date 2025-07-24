import type { Block } from 'payload'
import { link } from '@/fields/link'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      required: true,
    },
    {
      name: 'badgeIcon',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'primaryButton',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Button Text',
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Button Icon',
        },
        link({ disableLabel: true }),
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Button Text',
        },
        link({ disableLabel: true }),
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'statsBoxNumber',
      type: 'text',
      required: false,
    },
    {
      name: 'statsBoxText',
      type: 'text',
      required: false,
    },
    {
      name: 'statsBoxDescription',
      type: 'text',
      required: false,
    },
  ],
}
