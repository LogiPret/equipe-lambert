import { Block } from 'payload'

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
      defaultValue: "Portfolio d'équipe",
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      defaultValue: "Découvrez notre sélection de propriétés d'exception gérées par notre équipe",
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
        {
          name: 'text',
          type: 'text',
          defaultValue: "Voir toutes nos propriétés d'équipe",
        },
      ],
    },
  ],
}
