import { Block } from 'payload'

export const FooterBlock: Block = {
  slug: 'footer',
  labels: {
    singular: 'Footer Block',
    plural: 'Footer Blocks',
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
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
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
      ],
    },
    {
      name: 'contact',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'phoneDescription',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'text',
          required: true,
        },
        {
          name: 'emailDescription',
          type: 'text',
          required: true,
        },
        {
          name: 'address',
          type: 'text',
          required: true,
        },
        {
          name: 'addressLine2',
          type: 'text',
          required: true,
        },
        {
          name: 'addressDescription',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      required: true,
    },
    {
      name: 'legalLinks',
      type: 'array',
      maxRows: 5,
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
  ],
}
