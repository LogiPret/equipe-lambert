import type { Block } from 'payload'

export const VendreCTABlock: Block = {
  slug: 'vendreCTA',
  labels: {
    singular: 'Vendre CTA Section',
    plural: 'Vendre CTA Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Prêt à vendre votre propriété?',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      defaultValue:
        "Contactez-nous dès aujourd'hui pour une évaluation gratuite et découvrez comment nous pouvons vous aider à obtenir le meilleur prix pour votre propriété.",
    },
    {
      name: 'primaryButtonText',
      type: 'text',
      required: true,
      defaultValue: 'Évaluation gratuite',
    },
    {
      name: 'primaryButtonTarget',
      type: 'text',
      admin: {
        description:
          'Enter the block ID to scroll to when the primary button is clicked. Common IDs: vendreHero-0, whyChooseUs-1, sellingProcess-2, contact-3, etc. Format: "blockType-index"',
      },
    },
    {
      name: 'secondaryButtonText',
      type: 'text',
      required: true,
      defaultValue: 'Appelez-nous',
    },
    {
      name: 'secondaryButtonTarget',
      type: 'text',
      admin: {
        description:
          'Enter the block ID to scroll to when the secondary button is clicked, or leave empty to use phone number. Format: "blockType-index"',
      },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      defaultValue: '514-123-4567',
      admin: {
        condition: (data, siblingData) => !siblingData.secondaryButtonTarget,
        description:
          'Phone number to call when secondary button is clicked (only used if no target section is selected)',
      },
    },
  ],
}
