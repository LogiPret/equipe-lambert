import type { Block } from 'payload'
import { link as linkField } from '@/fields/link'

export const LandingResourceBlock: Block = {
  slug: 'resourceBlock',
  labels: {
    singular: 'Landing Resource Section',
    plural: 'Landing Resource Sections',
  },
  fields: [
    {
      name: 'mode',
      type: 'select',
      required: true,
      defaultValue: 'acheter',
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
          'Select the rendering mode (vendre or acheter) - changes content, colors, and styling',
      },
    },
    {
      name: 'imagePosition',
      type: 'select',
      required: true,
      defaultValue: 'left',
      options: [
        {
          label: 'Image à gauche',
          value: 'left',
        },
        {
          label: 'Image à droite',
          value: 'right',
        },
      ],
      admin: {
        position: 'sidebar',
        description: 'Choose whether the main image appears on the left or right side',
      },
    },
    {
      name: 'mainContent',
      type: 'group',
      label: 'Contenu Principal',
      fields: [
        {
          name: 'badgeText',
          type: 'text',
          admin: {
            description:
              'Badge text will automatically adjust based on mode: "VENDEZ INTELLIGEMMENT" for vendre mode, "ACHETEZ COMME UN PRO" for acheter mode. Leave empty to use default.',
          },
        },
        {
          name: 'title',
          type: 'text',
          admin: {
            description:
              'Title will automatically adjust based on mode. Leave empty to use default mode-specific text.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description:
              'Main description will automatically adjust based on mode. Leave empty to use default.',
          },
        },
        {
          name: 'highlight',
          type: 'text',
          admin: {
            description:
              'Highlighted text (shown in bold). Will auto-adjust based on mode if left empty.',
          },
        },
        {
          name: 'buttonText',
          type: 'text',
          admin: {
            description:
              'Button text will automatically adjust based on mode: "Obtenir mes ressources" for vendre, "Recevoir mes ressources" for acheter. Leave empty to use default.',
          },
        },
        // Action type selector for the main button
        {
          name: 'actionType',
          type: 'radio',
          label: 'Button Action Type',
          defaultValue: 'link',
          options: [
            {
              label: 'Link',
              value: 'link',
            },
            {
              label: 'Popup',
              value: 'popup',
            },
          ],
          admin: {
            description: 'Choose whether the button should navigate to a link or open a popup.',
          },
        },
        // New: universal link field for button behavior (internal, external, scroll)
        linkField({
          overrides: {
            name: 'link',
            label: 'CTA Link',
            admin: {
              description:
                'Configure where the main button points to (internal page, custom URL, or scroll to section).',
              condition: (data: any, siblingData: any) => siblingData?.actionType === 'link',
            },
          },
          dbNames: {
            group: 'lnk',
            type: 't',
            reference: 'ref',
            url: 'url',
            archive: 'arc',
            scrollTarget: 'scr',
            appearance: 'app',
          },
          appearances: false,
          disableLabel: true,
        }),
        // Popup reference field
        {
          name: 'popupRef',
          type: 'relationship',
          relationTo: 'popups',
          label: 'Select Popup',
          admin: {
            condition: (data, siblingData) => siblingData?.actionType === 'popup',
            description: 'Choose which popup to display when the button is clicked.',
          },
        },
        {
          name: 'buttonAction',
          type: 'text',
          admin: {
            description:
              'Action to perform when button is clicked (e.g., scroll target, external URL, etc.)',
          },
        },
      ],
    },
    {
      name: 'imageContent',
      type: 'group',
      label: 'Image et Légendes',
      fields: [
        {
          name: 'mainImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description:
              'Main image for the resource section. Will use placeholder if not provided.',
          },
        },
        {
          name: 'imageAlt',
          type: 'text',
          admin: {
            description: 'Alt text for the image. Will auto-generate based on mode if left empty.',
          },
        },
        {
          name: 'imageCaption',
          type: 'text',
          admin: {
            description:
              'Caption overlay on the image. Will auto-adjust based on mode if left empty.',
          },
        },
        {
          name: 'imageSubcaption',
          type: 'text',
          admin: {
            description:
              'Subcaption overlay on the image. Will auto-adjust based on mode if left empty.',
          },
        },
      ],
    },
    {
      name: 'resources',
      type: 'group',
      label: 'Ressources',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description:
              'Title for the resources section. Will auto-adjust based on mode if left empty.',
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          admin: {
            description:
              'Subtitle for the resources section. Will auto-adjust based on mode if left empty.',
          },
        },
        {
          name: 'items',
          type: 'array',
          minRows: 0,
          maxRows: 6,
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: [
                {
                  label: 'Téléchargement',
                  value: 'download',
                },
                {
                  label: 'Document',
                  value: 'fileText',
                },
                {
                  label: 'Calculateur',
                  value: 'calculator',
                },
                {
                  label: 'Checklist',
                  value: 'checkSquare',
                },
              ],
            },
            {
              name: 'color',
              type: 'select',
              required: true,
              options: [
                {
                  label: 'Bleu',
                  value: 'blue',
                },
                {
                  label: 'Émeraude',
                  value: 'emerald',
                },
                {
                  label: 'Indigo',
                  value: 'indigo',
                },
                {
                  label: 'Ambre',
                  value: 'amber',
                },
                {
                  label: 'Rouge',
                  value: 'red',
                },
              ],
            },
            {
              name: 'buttonText',
              type: 'text',
              admin: {
                description: 'Button text for this resource. Defaults to "Télécharger" if empty.',
              },
            },
            // Action type selector for resource buttons
            {
              name: 'actionType',
              type: 'radio',
              label: 'Button Action Type',
              defaultValue: 'link',
              options: [
                {
                  label: 'Link',
                  value: 'link',
                },
                {
                  label: 'Popup',
                  value: 'popup',
                },
              ],
              admin: {
                description: 'Choose whether the button should navigate to a link or open a popup.',
              },
            },
            // New: universal link field for each resource
            linkField({
              overrides: {
                name: 'link',
                label: 'Resource Link',
                admin: {
                  description:
                    'Configure where this resource button points to (internal page, custom URL, or scroll to section).',
                  condition: (data: any, siblingData: any) => siblingData?.actionType === 'link',
                },
              },
              dbNames: {
                group: 'lnk',
                type: 't',
                reference: 'ref',
                url: 'url',
                archive: 'arc',
                scrollTarget: 'scr',
                appearance: 'app',
              },
              appearances: false,
              disableLabel: true,
            }),
            // Popup reference field for resources
            {
              name: 'popupRef',
              type: 'relationship',
              relationTo: 'popups',
              label: 'Select Popup',
              admin: {
                condition: (data: any, siblingData: any) => siblingData?.actionType === 'popup',
                description: 'Choose which popup to display when the resource button is clicked.',
              },
            },
            {
              name: 'buttonAction',
              type: 'text',
              admin: {
                description:
                  'Action to perform when this resource button is clicked (e.g., download URL, scroll target, etc.)',
              },
            },
          ],
          admin: {
            description: 'Add resources to display in cards below the main content.',
          },
        },
      ],
    },
  ],
}
