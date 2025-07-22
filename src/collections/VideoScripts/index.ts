import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const VideoScripts: CollectionConfig<'video-scripts'> = {
  slug: 'video-scripts',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    hook: true,
    cta: true,
  },
  admin: {
    defaultColumns: ['title', 'hook', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre',
    },
    {
      name: 'hook',
      type: 'text',
      required: true,
      label: 'Hook',
    },
    {
      name: 'contentIdea',
      type: 'text',
      required: true,
      label: 'Idée générale de l\'histoire / du contenu',
    },
    {
      name: 'cta',
      type: 'text',
      required: true,
      label: 'CTA (Call To Action)',
    },
    {
      name: 'staging',
      type: 'text',
      required: true,
      label: 'Mise en scène',
    },
    {
      name: 'scriptNumber',
      type: 'number',
      required: true,
      label: 'Numéro du script',
      min: 1,
      max: 31,
    },
    ...slugField(),
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
}