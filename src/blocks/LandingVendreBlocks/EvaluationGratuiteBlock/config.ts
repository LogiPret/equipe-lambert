import type { Block } from 'payload'

export const EvaluationGratuiteBlock: Block = {
  slug: 'evaluationGratuite',
  labels: {
    singular: 'Évaluation Gratuite Section',
    plural: 'Évaluations Gratuites Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Obtenez votre évaluation gratuite',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        "Notre équipe d'experts vous offre une évaluation complète et personnalisée de votre propriété.",
    },
    {
      name: 'closingStatement',
      type: 'textarea',
      required: true,
      defaultValue: "Contactez-nous dès aujourd'hui pour commencer.",
    },
    {
      name: 'ctaText',
      type: 'text',
      required: true,
      defaultValue: 'Obtenir mon évaluation',
    },
    {
      name: 'ctaTarget',
      type: 'text',
      admin: {
        description:
          'Enter the block ID to scroll to when the primary button is clicked. Common IDs: vendreHero-0, whyChooseUs-1, sellingProcess-2, contact-3, etc. Format: "blockType-index"',
      },
    },
    {
      name: 'benefitsTitle',
      type: 'text',
      required: true,
      defaultValue: 'Pourquoi choisir notre évaluation?',
    },
    {
      name: 'benefits',
      type: 'array',
      maxRows: 6,
      required: true,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { text: 'Évaluation professionnelle gratuite' },
        { text: 'Analyse de marché détaillée' },
        { text: 'Conseils personnalisés' },
        { text: 'Stratégie de vente optimisée' },
      ],
    },
    {
      name: 'deliverablesTitle',
      type: 'text',
      required: true,
      defaultValue: 'Ce que vous recevrez:',
    },
    {
      name: 'deliverables',
      type: 'array',
      maxRows: 6,
      required: true,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Home', value: 'home' },
            { label: 'Trending Up', value: 'trendingUp' },
            { label: 'Users', value: 'users' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        {
          icon: 'home',
          title: "Rapport d'évaluation",
          description: 'Document détaillé avec la valeur estimée de votre propriété',
        },
        {
          icon: 'trendingUp',
          title: 'Analyse de marché',
          description: 'Étude comparative des ventes récentes dans votre secteur',
        },
        {
          icon: 'users',
          title: 'Consultation personnalisée',
          description: 'Rencontre avec un de nos experts pour discuter de votre projet',
        },
      ],
    },
  ],
}
