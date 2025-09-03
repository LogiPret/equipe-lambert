import type { Block } from 'payload'

export const FeaturedListingsBlock: Block = {
  slug: 'featuredListings',
  interfaceName: 'FeaturedListingsBlock',
  labels: {
    singular: 'Inscriptions vedettes',
    plural: 'Blocs Inscriptions vedettes',
  },
  admin: {
    components: {
      Block: '@/blocks/LandingAcheterBlocks/FeaturedListings/ServerWrapper',
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre',
      defaultValue: 'Inscriptions vedettes',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Sous-titre',
    },
    {
      name: 'selectedProperties',
      type: 'relationship',
      label: 'Propriétés à afficher',
      relationTo: 'scrapedProperties',
      hasMany: true,
      required: true,
      admin: {
        description: 'Choisissez jusqu’à 4 propriétés (l’ordre sera respecté).',
      },
      maxRows: 4,
    },
  ],
}
