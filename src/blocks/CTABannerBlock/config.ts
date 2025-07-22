import { Block } from 'payload'
import { link } from '@/fields/link'

export const CTABannerBlock: Block = {
  slug: 'ctaBanner',
  labels: {
    singular: 'CTA Banner Block',
    plural: 'CTA Banner Blocks',
  },
  fields: [
    {
      name: 'backgroundColor',
      type: 'select',
      required: true,
      defaultValue: 'gradient_blue',
      options: [
        {
          label: 'Gradient Blue',
          value: 'gradient_blue',
        },
        {
          label: 'Dark Blue',
          value: 'dark_blue',
        },
        {
          label: 'Navy',
          value: 'navy',
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'button',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            {
              label: 'Dollar Sign',
              value: 'dollar_sign',
            },
            {
              label: 'Key',
              value: 'key',
            },
            {
              label: 'Phone',
              value: 'phone',
            },
            {
              label: 'Mail',
              value: 'mail',
            },
          ],
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: [
            {
              label: 'Primary',
              value: 'primary',
            },
            {
              label: 'Secondary',
              value: 'secondary',
            },
          ],
        },
        link({ disableLabel: true }),
      ],
    },
  ],
}
