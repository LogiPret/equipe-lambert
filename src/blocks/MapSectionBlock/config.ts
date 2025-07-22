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
      defaultValue: 'Nos propriétés sur la carte',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      required: true,
      defaultValue: 'Découvrez notre portefeuille immobilier dans la grande région de Montréal',
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
          defaultValue: 'À vendre',
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
          defaultValue: 'Maison',
        },
      ],
      defaultValue: [
        {
          id: 1,
          address: '123 Rue Saint-Denis, Montréal',
          price: '$875,000',
          status: 'À vendre',
          type: 'Maison',
        },
        {
          id: 2,
          address: '456 Avenue du Parc, Montréal',
          price: '$650,000',
          status: 'À vendre',
          type: 'Condo',
        },
        {
          id: 3,
          address: '789 Boulevard René-Lévesque, Québec',
          price: '$725,000',
          status: 'Vendu',
          type: 'Duplex',
        },
        {
          id: 4,
          address: '321 Rue Sherbrooke, Montréal',
          price: '$950,000',
          status: 'À vendre',
          type: 'Maison',
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
      defaultValue: [
        {
          name: 'Montréal',
          status: 'Actif',
          badgeColor: 'bg-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
        },
        {
          name: 'Laval',
          status: 'Actif',
          badgeColor: 'bg-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
        },
        {
          name: 'Longueuil',
          status: 'Actif',
          badgeColor: 'bg-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
        },
        {
          name: 'Rive-Sud',
          status: 'Expansion',
          badgeColor: 'bg-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
        },
      ],
    },
  ],
}
