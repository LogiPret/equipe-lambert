import { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'contact',
  labels: {
    singular: 'Contact Block',
    plural: 'Contact Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Contactez notre équipe',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      defaultValue:
        "Discutons de votre projet immobilier avec l'expertise coordonnée de notre équipe",
    },
    {
      name: 'contactInfo',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Phone',
              value: 'phone',
            },
            {
              label: 'Email',
              value: 'mail',
            },
            {
              label: 'Location',
              value: 'location',
            },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'primary',
          type: 'text',
          required: true,
        },
        {
          name: 'secondary',
          type: 'text',
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'officeImage',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'form',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Planifiez votre consultation gratuite',
        },
        {
          name: 'disclaimer',
          type: 'textarea',
          required: true,
          defaultValue:
            'Nous respectons votre vie privée. Vos informations ne seront jamais partagées.',
        },
      ],
    },
  ],
}
