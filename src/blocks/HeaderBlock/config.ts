import { Block } from 'payload'

export const HeaderBlock: Block = {
  slug: 'header',
  labels: {
    singular: 'Header Block',
    plural: 'Header Blocks',
  },
  fields: [
    {
      name: 'logo',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Équipe Lambert',
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          defaultValue: 'COURTIERS IMMOBILIERS AGRÉÉS',
        },
      ],
    },
    {
      name: 'navigation',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'contactButton',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          defaultValue: '(514) 555-0123',
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          defaultValue: '(514) 555-0123',
        },
      ],
    },
  ],
}
