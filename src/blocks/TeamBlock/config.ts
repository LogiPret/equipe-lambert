import type { Block } from 'payload'

export const TeamBlock: Block = {
  slug: 'team',
  labels: {
    singular: 'Team Section',
    plural: 'Team Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
    },
    {
      name: 'members',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          required: true,
        },
        {
          name: 'speciality',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'experience',
          type: 'text',
          required: true,
        },
      ],
      minRows: 1,
      maxRows: 3,
    },
    {
      name: 'advantages',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'textarea',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: [
                { label: 'Handshake', value: 'handshake' },
                { label: 'Target', value: 'target' },
                { label: 'Shield', value: 'shield' },
              ],
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
          ],
          minRows: 3,
          maxRows: 3,
        },
      ],
    },
  ],
}
