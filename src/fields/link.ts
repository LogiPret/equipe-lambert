import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances = 'default' | 'outline'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField & { dbName?: string }>
  // Optional compact database names to avoid Postgres 63-char identifier limit
  dbNames?: Partial<
    Record<
      'group' | 'type' | 'reference' | 'url' | 'archive' | 'scrollTarget' | 'newTab' | 'appearance',
      string
    >
  >
}) => Field

export const link: LinkType = ({
  appearances,
  disableLabel = false,
  overrides = {},
  dbNames = {},
} = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    ...(dbNames.group ? { dbName: dbNames.group } : {}),
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            ...(dbNames.type ? { dbName: dbNames.type } : {}),
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
              {
                label: 'Archive page',
                value: 'archive',
              },
              {
                label: 'Scroll to section',
                value: 'scroll',
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
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      ...(dbNames.reference ? { dbName: dbNames.reference } : {}),
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      relationTo: ['pages', 'posts'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      ...(dbNames.url ? { dbName: dbNames.url } : {}),
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
    },
    {
      name: 'archive',
      type: 'select',
      ...(dbNames.archive ? { dbName: dbNames.archive } : {}),
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'archive',
      },
      label: 'Archive page',
      options: [
        {
          label: 'Posts Archive',
          value: 'posts',
        },
      ],
      required: true,
    },
    {
      name: 'scrollTarget',
      type: 'text',
      ...(dbNames.scrollTarget ? { dbName: dbNames.scrollTarget } : {}),
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'scroll',
        description:
          'Enter the ID of the section to scroll to (e.g., contact-block, services, testimonials)',
      },
      label: 'Section ID to scroll to',
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      ...(dbNames.appearance ? { dbName: dbNames.appearance } : {}),
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(linkResult, overrides)
}
