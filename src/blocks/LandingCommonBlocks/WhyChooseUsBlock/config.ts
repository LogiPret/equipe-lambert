import type { Block } from 'payload'

export const WhyChooseUsBlock: Block = {
  slug: 'whyChooseUs',
  labels: {
    singular: 'Why Choose Us Section',
    plural: 'Why Choose Us Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Pourquoi nous choisir',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      defaultValue:
        "Notre expertise et notre engagement envers l'excellence font de nous le partenaire idéal pour la vente de votre propriété.",
    },
    {
      name: 'choices',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Trending Up', value: 'trendingUp' },
            { label: 'Clock', value: 'clock' },
            { label: 'Shield', value: 'shield' },
            { label: 'Target', value: 'target' },
            { label: 'Award', value: 'award' },
            { label: 'Users', value: 'users' },
            { label: 'Bell', value: 'bell' },
          ],
          defaultValue: 'trendingUp',
        },
        {
          name: 'color',
          type: 'select',
          required: true,
          options: [
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
            { label: 'Red', value: 'red' },
            { label: 'Yellow', value: 'yellow' },
            { label: 'Purple', value: 'purple' },
            { label: 'Pink', value: 'pink' },
            { label: 'Indigo', value: 'indigo' },
            { label: 'Emerald', value: 'emerald' },
            { label: 'Teal', value: 'teal' },
            { label: 'Cyan', value: 'cyan' },
          ],
          defaultValue: 'blue',
          admin: {
            description:
              'This color will be used for icons, backgrounds, and statistics in different shades.',
          },
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
        {
          name: 'statValue',
          type: 'text',
          required: true,
        },
        {
          name: 'statLabel',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        {
          icon: 'trendingUp',
          color: 'blue',
          title: 'Résultats Exceptionnels',
          description:
            'Notre taux de vente de 95% témoigne de notre expertise et de notre engagement envers nos clients.',
          statValue: '95%',
          statLabel: 'Taux de vente',
        },
        {
          icon: 'clock',
          color: 'green',
          title: 'Vente Rapide',
          description:
            'Grâce à notre réseau et notre stratégie marketing, nous vendons en moyenne en 21 jours.',
          statValue: '21 jours',
          statLabel: 'Délai moyen',
        },
        {
          icon: 'shield',
          color: 'yellow',
          title: 'Sécurité Garantie',
          description:
            "Transactions sécurisées et accompagnement juridique complet pour votre tranquillité d'esprit.",
          statValue: '100%',
          statLabel: 'Sécurisé',
        },
      ],
    },
  ],
}
