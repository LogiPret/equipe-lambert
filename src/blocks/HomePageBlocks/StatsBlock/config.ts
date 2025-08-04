import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'stats',
  labels: {
    singular: 'Statistics Section',
    plural: 'Statistics Sections',
  },
  fields: [
    {
      name: 'stats',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'number',
          type: 'number',
          required: true,
        },
        {
          name: 'suffix',
          type: 'text',
          admin: {
            description: 'e.g., +, %, h, etc.',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
      minRows: 2,
      maxRows: 4,
    },
  ],
}
