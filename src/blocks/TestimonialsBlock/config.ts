import { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials Block',
    plural: 'Testimonials Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Témoignages clients',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      defaultValue:
        'La confiance de nos clients envers notre équipe est le fondement de notre réputation',
    },
    {
      name: 'testimonials',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
          required: true,
        },
        {
          name: 'rating',
          type: 'number',
          required: true,
          min: 1,
          max: 5,
          defaultValue: 5,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      maxRows: 3,
      fields: [
        {
          name: 'rating',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
