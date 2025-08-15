import type { Block } from 'payload'
import { link } from '@/fields/link'

export const Button: Block = {
  slug: 'button',
  labels: {
    singular: 'Button Block',
    plural: 'Button Blocks',
  },
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
    {
      name: 'text',
      type: 'text',
      required: true,
      label: 'Button Text',
    },
    {
      name: 'size',
      type: 'select',
      label: 'Button Size',
      defaultValue: 'default',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Default', value: 'default' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
    link({
      disableLabel: true,
      appearances: ['default', 'outline'],
      overrides: {
        admin: {
          condition: (_, { actionType }) => actionType !== 'popup',
        },
      },
    }),
    {
      name: 'popupRef',
      type: 'relationship',
      relationTo: 'popups',
      label: 'Popup',
      admin: {
        description: 'Select the popup to display when the button is clicked.',
        condition: (_, { actionType }) => actionType === 'popup',
      },
      required: false,
    },
  ],
}
