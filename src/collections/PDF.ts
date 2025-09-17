import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const PDF: CollectionConfig = {
  slug: 'pdf',
  labels: {
    singular: 'PDF',
    plural: 'PDFs',
  },
  admin: {
    group: 'Media',
    useAsTitle: 'title',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    ...slugField(),
  ],
  upload: {
    mimeTypes: ['application/pdf'],
    adminThumbnail: ({ doc }) => {
      // For PDFs, we'll show the filename since there's no thumbnail for PDFs
      return (doc.filename as string) || 'PDF'
    },
  },
}
