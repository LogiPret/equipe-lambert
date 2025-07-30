import type { Block } from 'payload'

export const MapSectionBlock: Block = {
  slug: 'mapSectionBlock',
  interfaceName: 'MapSectionBlock',
  labels: {
    singular: 'Map Section Block',
    plural: 'Map Section Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      required: true,
    },
    {
      name: 'properties',
      type: 'array',
      label: 'Properties',
      fields: [
        {
          name: 'id',
          type: 'number',
          label: 'ID',
          required: true,
        },
        {
          name: 'address',
          type: 'text',
          label: 'Address',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          label: 'Price',
          required: true,
        },
        {
          name: 'status',
          type: 'select',
          label: 'Status',
          options: [
            {
              label: 'À vendre',
              value: 'À vendre',
            },
            {
              label: 'Vendu',
              value: 'Vendu',
            },
          ],
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          label: 'Property Type',
          options: [
            {
              label: 'Maison',
              value: 'Maison',
            },
            {
              label: 'Condo',
              value: 'Condo',
            },
            {
              label: 'Duplex',
              value: 'Duplex',
            },
            {
              label: 'Triplex',
              value: 'Triplex',
            },
            {
              label: 'Commercial',
              value: 'Commercial',
            },
          ],
          required: true,
        },
      ],
    },
    {
      name: 'serviceAreas',
      type: 'array',
      label: 'Service Areas',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Area Name',
          required: true,
        },
        {
          name: 'status',
          type: 'text',
          label: 'Status',
          required: true,
        },
        {
          name: 'badgeColor',
          type: 'text',
          label: 'Badge Color (CSS class)',
          admin: {
            description: 'Optional: CSS class for badge color',
          },
        },
        {
          name: 'bgColor',
          type: 'text',
          label: 'Background Color (CSS class)',
          admin: {
            description: 'Optional: CSS class for background color',
          },
        },
        {
          name: 'borderColor',
          type: 'text',
          label: 'Border Color (CSS class)',
          admin: {
            description: 'Optional: CSS class for border color',
          },
        },
      ],
    },
  ],
}
