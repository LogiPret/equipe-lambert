import type { Block } from 'payload'

export const LandingProcessBlock: Block = {
  slug: 'landingProcess',
  labels: {
    singular: 'Landing Process Section',
    plural: 'Landing Process Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Notre processus de vente en 4 étapes',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      defaultValue:
        'Une méthode éprouvée qui maximise la valeur de votre propriété et accélère le processus de vente.',
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Home', value: 'home' },
            { label: 'Search', value: 'search' },
            { label: 'Camera', value: 'camera' },
            { label: 'Users', value: 'users' },
            { label: 'Dollar Sign', value: 'dollarSign' },
            { label: 'Key', value: 'key' },
            { label: 'Calendar', value: 'calendar' },
            { label: 'Check Circle', value: 'checkCircle' },
            { label: 'Star', value: 'star' },
            { label: 'Target', value: 'target' },
            { label: 'Clipboard List', value: 'clipboardList' },
            { label: 'Handshake', value: 'handshake' },
          ],
          defaultValue: 'home',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
      defaultValue: [
        {
          icon: 'search',
          title: 'Évaluation gratuite',
          description:
            'Nous analysons votre propriété et le marché local pour déterminer le prix optimal.',
        },
        {
          icon: 'camera',
          title: 'Marketing professionnel',
          description: 'Photos de qualité, visite virtuelle et promotion sur tous les canaux.',
        },
        {
          icon: 'users',
          title: 'Visites organisées',
          description: 'Nous gérons toutes les visites et négocions en votre nom.',
        },
        {
          icon: 'key',
          title: 'Finalisation',
          description: "Accompagnement complet jusqu'à la remise des clés.",
        },
      ],
    },
  ],
}
