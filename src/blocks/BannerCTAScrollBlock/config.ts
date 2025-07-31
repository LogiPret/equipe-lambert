import { Block } from 'payload'

export const BannerCTAScrollBlock: Block = {
  slug: 'bannerCTAScroll',
  labels: {
    singular: 'Banner CTA Scroll Block',
    plural: 'Banner CTA Scroll Blocks',
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
        {
          name: 'scrollTarget',
          type: 'text',
          required: true,
          admin: {
            description:
              'Enter the block ID to scroll to. Common IDs: vendreHero-0, whyChooseUs-1, sellingProcess-2, vendreCTA-3, contact-4, etc. The format is "blockType-index" where index starts at 0.',
          },
        },
      ],
    },
  ],
}
