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
    }),
  ],
}
