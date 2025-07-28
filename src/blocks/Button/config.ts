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
    link({
      disableLabel: true,
      appearances: ['default', 'outline'],
    }),
  ],
}
