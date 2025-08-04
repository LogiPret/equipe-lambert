import type { Block } from 'payload'

export const InteractivePropertiesBlock: Block = {
  slug: 'interactivePropBlock',
  interfaceName: 'InteractivePropertiesBlock',
  labels: {
    singular: 'Propriétés Interactives',
    plural: 'Blocs Propriétés Interactives',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre',
      defaultValue: 'Propriétés Disponibles',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Sous-titre',
      defaultValue:
        'Découvrez notre sélection de propriétés et calculez vos paiements hypothécaires instantanément',
    },
    {
      name: 'calculatorBlockId',
      type: 'text',
      label: 'ID du bloc calculatrice',
      admin: {
        description: "L'ID du bloc calculatrice hypothécaire (ex: mortgageCalculator)",
      },
      defaultValue: 'mortgageCalculator',
    },
    {
      name: 'props',
      type: 'array',
      label: 'Propriétés',
      admin: {
        description: 'Laissez vide pour utiliser les données mock par défaut',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image principale',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          label: 'Prix',
          required: true,
          admin: {
            step: 1000,
          },
        },
        {
          name: 'address',
          type: 'text',
          label: 'Adresse',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description courte',
        },
        {
          name: 'beds',
          type: 'number',
          label: 'Chambres',
          required: true,
          min: 0,
          max: 10,
        },
        {
          name: 'baths',
          type: 'number',
          label: 'Salles de bain',
          required: true,
          min: 0,
          max: 10,
        },
        {
          name: 'sqft',
          type: 'text',
          label: 'Superficie (pi²)',
          required: true,
          admin: {
            description: 'Ex: 1,850',
          },
        },
        {
          name: 'propType',
          type: 'select',
          label: 'Type de propriété',
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
              label: 'Maison de ville',
              value: 'townhouse',
            },
            {
              label: 'Loft',
              value: 'loft',
            },
          ],
          defaultValue: 'maison',
        },
        {
          name: 'propStatus',
          type: 'select',
          label: 'Statut',
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
          defaultValue: 'a_vendre',
        },
      ],
    },
  ],
}
