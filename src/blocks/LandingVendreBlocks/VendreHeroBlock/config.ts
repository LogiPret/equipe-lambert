import type { Block } from 'payload'

export const VendreHeroBlock: Block = {
  slug: 'vendreHero',
  labels: {
    singular: 'Vendre Hero Section',
    plural: 'Vendre Hero Sections',
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      required: true,
      defaultValue: 'VENDEZ VOTRE PROPRIÉTÉ',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Vendez votre propriété',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'rapidement et au meilleur prix',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        "Notre équipe d'experts vous accompagne dans la vente de votre bien immobilier avec une approche personnalisée et des résultats garantis.",
    },
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { value: '95%', label: 'Taux de satisfaction' },
        { value: '21 jours', label: 'Délai moyen de vente' },
        { value: '500+', label: 'Propriétés vendues' },
      ],
    },
    {
      name: 'primaryButton',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          defaultValue: 'Évaluation gratuite',
        },
        {
          name: 'actionType',
          type: 'select',
          required: true,
          defaultValue: 'scroll',
          options: [
            {
              label: 'Scroll to Block',
              value: 'scroll',
            },
            {
              label: 'Link to Page',
              value: 'link',
            },
          ],
          admin: {
            description:
              'Choose whether this button scrolls to a block on the same page or links to another page.',
          },
        },
        {
          name: 'scrollTarget',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData.actionType === 'scroll',
            components: {
              Field: '@/components/admin/BlockTargetField#BlockTargetField',
            },
            description: 'Select the block to scroll to from the available blocks on this page.',
          },
        },
        {
          name: 'link',
          type: 'group',
          admin: {
            condition: (data, siblingData) => siblingData.actionType === 'link',
            hideGutter: true,
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'type',
                  type: 'radio',
                  admin: {
                    layout: 'horizontal',
                    width: '50%',
                  },
                  defaultValue: 'reference',
                  options: [
                    {
                      label: 'Internal link',
                      value: 'reference',
                    },
                    {
                      label: 'Custom URL',
                      value: 'custom',
                    },
                  ],
                },
                {
                  name: 'newTab',
                  type: 'checkbox',
                  admin: {
                    style: {
                      alignSelf: 'flex-end',
                    },
                    width: '50%',
                  },
                  label: 'Open in new tab',
                },
              ],
            },
            {
              name: 'reference',
              type: 'relationship',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'reference',
              },
              label: 'Document to link to',
              maxDepth: 1,
              relationTo: ['pages'],
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'custom',
              },
              label: 'Custom URL',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          defaultValue: 'En savoir plus',
        },
        {
          name: 'actionType',
          type: 'select',
          required: true,
          defaultValue: 'scroll',
          options: [
            {
              label: 'Scroll to Block',
              value: 'scroll',
            },
            {
              label: 'Link to Page',
              value: 'link',
            },
          ],
          admin: {
            description:
              'Choose whether this button scrolls to a block on the same page or links to another page.',
          },
        },
        {
          name: 'scrollTarget',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData.actionType === 'scroll',
            components: {
              Field: '@/components/admin/BlockTargetField#BlockTargetField',
            },
            description: 'Select the block to scroll to from the available blocks on this page.',
          },
        },
        {
          name: 'link',
          type: 'group',
          admin: {
            condition: (data, siblingData) => siblingData.actionType === 'link',
            hideGutter: true,
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'type',
                  type: 'radio',
                  admin: {
                    layout: 'horizontal',
                    width: '50%',
                  },
                  defaultValue: 'reference',
                  options: [
                    {
                      label: 'Internal link',
                      value: 'reference',
                    },
                    {
                      label: 'Custom URL',
                      value: 'custom',
                    },
                  ],
                },
                {
                  name: 'newTab',
                  type: 'checkbox',
                  admin: {
                    style: {
                      alignSelf: 'flex-end',
                    },
                    width: '50%',
                  },
                  label: 'Open in new tab',
                },
              ],
            },
            {
              name: 'reference',
              type: 'relationship',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'reference',
              },
              label: 'Document to link to',
              maxDepth: 1,
              relationTo: ['pages'],
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'custom',
              },
              label: 'Custom URL',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'formTitle',
      type: 'text',
      required: true,
      defaultValue: 'Obtenez une évaluation gratuite',
    },
    {
      name: 'formFields',
      type: 'group',
      fields: [
        {
          name: 'addressPlaceholder',
          type: 'text',
          required: true,
          defaultValue: 'Adresse de votre propriété *',
        },
        {
          name: 'firstNamePlaceholder',
          type: 'text',
          required: true,
          defaultValue: 'Prénom *',
        },
        {
          name: 'lastNamePlaceholder',
          type: 'text',
          required: true,
          defaultValue: 'Nom de famille *',
        },
        {
          name: 'phonePlaceholder',
          type: 'text',
          required: true,
          defaultValue: 'Téléphone *',
        },
        {
          name: 'emailPlaceholder',
          type: 'text',
          required: true,
          defaultValue: 'Email *',
        },
        {
          name: 'timeframePlaceholder',
          type: 'text',
          required: true,
          defaultValue: 'Délai souhaité pour la vente',
        },
        {
          name: 'submitButtonText',
          type: 'text',
          required: true,
          defaultValue: 'Obtenir mon évaluation gratuite',
        },
        {
          name: 'disclaimerText',
          type: 'text',
          required: true,
          defaultValue: '* Évaluation professionnelle sans engagement',
        },
      ],
    },
    {
      name: 'timeframeOptions',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'option',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { option: 'Moins de 30 jours' },
        { option: '1-3 mois' },
        { option: '3-6 mois' },
        { option: 'Plus de 6 mois' },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
