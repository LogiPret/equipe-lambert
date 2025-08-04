import type { Block } from 'payload'

export const LandingHeroBlock: Block = {
  slug: 'landingHero',
  labels: {
    singular: 'Landing Hero Section',
    plural: 'Landing Hero Sections',
  },
  fields: [
    {
      name: 'mode',
      type: 'select',
      required: true,
      defaultValue: 'vendre',
      options: [
        {
          label: 'Mode Vendre',
          value: 'vendre',
        },
        {
          label: 'Mode Acheter',
          value: 'acheter',
        },
      ],
      admin: {
        position: 'sidebar',
        description:
          'Select the rendering mode (vendre or acheter) - changes form fields and styling',
      },
    },
    {
      name: 'badgeText',
      type: 'text',
      required: true,
      admin: {
        description:
          'Badge text will automatically adjust based on mode: "VENDEZ VOTRE PROPRIÉTÉ" for vendre mode, "ACCÈS PRIVILÉGIÉ AUX NOUVEAUTÉS" for acheter mode',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description:
          'Title will automatically adjust based on mode: "Vendez votre propriété" for vendre mode, "Trouvez la propriété" for acheter mode',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description:
          'Subtitle will automatically adjust based on mode: "rapidement et au meilleur prix" for vendre mode, "de vos rêves" for acheter mode',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Description will automatically adjust based on the selected mode',
      },
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
        },
        {
          name: 'actionType',
          type: 'select',
          required: true,
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
        },
        {
          name: 'actionType',
          type: 'select',
          required: true,
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
    },
    {
      name: 'formFields',
      type: 'group',
      fields: [
        // Vendre-specific fields
        {
          name: 'addressPlaceholder',
          type: 'text',
          admin: {
            condition: (data, siblingData, { user }) => {
              // Access parent block data to check mode
              const parentData = data || {}
              return parentData.mode === 'vendre'
            },
            description: 'Placeholder for the property address field (Vendre mode only)',
          },
        },
        {
          name: 'timeframePlaceholder',
          type: 'text',
          admin: {
            condition: (data, siblingData, { user }) => {
              const parentData = data || {}
              return parentData.mode === 'vendre'
            },
            description: 'Placeholder for the sale timeframe field (Vendre mode only)',
          },
        },
        // Acheter-specific fields
        {
          name: 'propertyTypePlaceholder',
          type: 'text',
          admin: {
            condition: (data, siblingData, { user }) => {
              const parentData = data || {}
              return parentData.mode === 'acheter'
            },
            description: 'Placeholder for the property type field (Acheter mode only)',
          },
        },
        {
          name: 'cityPlaceholder',
          type: 'text',
          admin: {
            condition: (data, siblingData, { user }) => {
              const parentData = data || {}
              return parentData.mode === 'acheter'
            },
            description: 'Placeholder for the city field (Acheter mode only)',
          },
        },
        // Common fields
        {
          name: 'firstNamePlaceholder',
          type: 'text',
        },
        {
          name: 'lastNamePlaceholder',
          type: 'text',
        },
        {
          name: 'phonePlaceholder',
          type: 'text',
        },
        {
          name: 'emailPlaceholder',
          type: 'text',
        },
        {
          name: 'submitButtonText',
          type: 'text',
        },
        {
          name: 'disclaimerText',
          type: 'text',
        },
      ],
    },
    // Options for vendre mode
    {
      name: 'timeframeOptions',
      type: 'array',
      fields: [
        {
          name: 'option',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        condition: (data, siblingData) => {
          return data?.mode === 'vendre'
        },
        description: 'Available timeframe options for sale (Vendre mode only)',
      },
    },
    // Options for acheter mode
    {
      name: 'propertyTypeOptions',
      type: 'array',
      fields: [
        {
          name: 'option',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        condition: (data, siblingData) => {
          return data?.mode === 'acheter'
        },
        description: 'Available property type options (Acheter mode only)',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Optional background image for the hero section',
      },
    },
  ],
}
