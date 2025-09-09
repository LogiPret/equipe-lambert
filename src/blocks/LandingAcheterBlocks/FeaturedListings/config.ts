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
  ],
}
