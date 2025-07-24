import { Block } from 'payload'
import { link } from '@/fields/link'

export const PropertiesBlock: Block = {
  slug: 'properties',
  labels: {
    singular: 'Properties Block',
    plural: 'Properties Blocks',
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
      name: 'properties',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          required: true,
        },
        {
          name: 'address',
          type: 'text',
          required: true,
        },
        {
          name: 'beds',
          type: 'number',
          required: true,
          min: 0,
        },
        {
          name: 'baths',
          type: 'number',
          required: true,
          min: 0,
        },
        {
          name: 'sqft',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Maison',
              value: 'maison',
            },
            {
              label: 'Condo',
              value: 'condo',
            },
            {
              label: 'Townhouse',
              value: 'townhouse',
            },
            {
              label: 'Loft',
              value: 'loft',
            },
          ],
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          options: [
            {
              label: 'À vendre',
              value: 'a_vendre',
            },
            {
              label: 'Vendu',
              value: 'vendu',
            },
            {
              label: "Option d'achat",
              value: 'option_achat',
            },
          ],
        },
      ],
    },
    {
      name: 'showAllButton',
      type: 'group',
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
}
