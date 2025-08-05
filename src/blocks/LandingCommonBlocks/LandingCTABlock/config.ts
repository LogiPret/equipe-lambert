import type { Block } from 'payload'

export const LandingCTABlock: Block = {
  slug: 'landingCTA',
  labels: {
    singular: 'Landing CTA Section',
    plural: 'Landing CTA Sections',
  },
  fields: [
    {
      name: 'mode',
      type: 'select',
      required: true,
      defaultValue: 'vendre',
      options: [
        {
          label: 'Mode Vendre',
          value: 'vendre',
        },
        {
          label: 'Mode Acheter',
          value: 'acheter',
        },
      ],
      admin: {
        position: 'sidebar',
        description:
          'Select the rendering mode (vendre or acheter) - changes button text, colors, and styling',
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description:
          'Title will automatically adjust based on mode: "Prêt à vendre votre propriété?" for vendre mode, "Prêt à trouver votre propriété idéale ?" for acheter mode. Leave empty to use default.',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      admin: {
        description:
          'Subtitle will automatically adjust based on mode. Leave empty to use default mode-specific text.',
      },
    },
    {
      name: 'primaryButtonText',
      type: 'text',
      admin: {
        description:
          'Primary button text will automatically adjust based on mode: "Évaluation gratuite" for vendre mode, "Commencer ma recherche" for acheter mode. Leave empty to use default.',
      },
    },
    {
      name: 'primaryButtonTarget',
      type: 'text',
      admin: {
        description:
          'Enter the block ID to scroll to when the primary button is clicked. Common IDs: landingHero-0, whyChooseUs-1, sellingProcess-2, contact-3, etc. Format: "blockType-index"',
      },
    },
    {
      name: 'secondaryButtonText',
      type: 'text',
      admin: {
        description:
          'Secondary button text will automatically adjust based on mode: "Appelez-nous" for vendre mode, "Consultation gratuite" for acheter mode. Leave empty to use default.',
      },
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
