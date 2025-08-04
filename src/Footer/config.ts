import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Description qui apparaîtra sous le logo',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'resources',
      type: 'array',
      label: 'Ressources',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre',
          required: true,
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          label: 'Fichier',
          required: true,
        },
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Informations de contact',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Numéro de téléphone',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Adresse e-mail',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Adresse',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
