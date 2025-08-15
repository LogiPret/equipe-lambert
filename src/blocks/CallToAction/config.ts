import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'links',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      maxRows: 2,
      fields: [
        {
          name: 'actionType',
          type: 'radio',
          label: 'Action Type',
          defaultValue: 'link',
          options: [
            { label: 'Link', value: 'link' },
            { label: 'Popup', value: 'popup' },
          ],
          admin: {
            layout: 'horizontal',
          },
        },
        link({
          appearances: ['default', 'outline'],
          overrides: {
            admin: {
              condition: (_, { actionType }) => actionType !== 'popup',
            },
          },
        }),
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Text',
          admin: {
            description: 'Text shown on the button when using Popup action.',
            condition: (_, { actionType }) => actionType === 'popup',
          },
        },
        {
          name: 'popupRef',
          type: 'relationship',
          relationTo: 'popups',
          label: 'Popup',
          admin: {
            description: 'Select the popup to display when the button is clicked.',
            condition: (_, { actionType }) => actionType === 'popup',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
