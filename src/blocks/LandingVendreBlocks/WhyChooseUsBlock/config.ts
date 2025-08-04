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
          ],
          defaultValue: 'trendingUp',
        },
        {
          name: 'iconColor',
          type: 'select',
          required: true,
          options: [
            { label: 'Blue', value: 'text-blue-600' },
            { label: 'Green', value: 'text-green-600' },
            { label: 'Orange', value: 'text-orange-600' },
            { label: 'Purple', value: 'text-purple-600' },
            { label: 'Red', value: 'text-red-600' },
            { label: 'White', value: 'text-white' },
          ],
          defaultValue: 'text-blue-600',
        },
        {
          name: 'bgColor',
          type: 'select',
          required: true,
          options: [
            { label: 'Blue Background', value: 'bg-blue-100' },
            { label: 'Green Background', value: 'bg-green-100' },
            { label: 'Orange Background', value: 'bg-orange-100' },
            { label: 'Purple Background', value: 'bg-purple-100' },
            { label: 'Red Background', value: 'bg-red-100' },
            { label: 'Gray Background', value: 'bg-gray-100' },
          ],
          defaultValue: 'bg-blue-100',
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
        {
          name: 'statColor',
          type: 'select',
          required: true,
          options: [
            { label: 'Blue', value: 'text-blue-600' },
            { label: 'Green', value: 'text-green-600' },
            { label: 'Orange', value: 'text-orange-600' },
            { label: 'Purple', value: 'text-purple-600' },
            { label: 'Red', value: 'text-red-600' },
            { label: 'Gray', value: 'text-gray-600' },
          ],
          defaultValue: 'text-blue-600',
        },
        {
          name: 'statBgColor',
          type: 'select',
          required: true,
          options: [
            { label: 'Blue Background', value: 'bg-blue-50' },
            { label: 'Green Background', value: 'bg-green-50' },
            { label: 'Orange Background', value: 'bg-orange-50' },
            { label: 'Purple Background', value: 'bg-purple-50' },
            { label: 'Red Background', value: 'bg-red-50' },
            { label: 'Gray Background', value: 'bg-gray-50' },
          ],
          defaultValue: 'bg-blue-50',
        },
      ],
      defaultValue: [
        {
          icon: 'trendingUp',
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-100',
          title: 'Résultats Exceptionnels',
          description:
            'Notre taux de vente de 95% témoigne de notre expertise et de notre engagement envers nos clients.',
          statValue: '95%',
          statLabel: 'Taux de vente',
          statColor: 'text-blue-600',
          statBgColor: 'bg-blue-50',
        },
        {
          icon: 'clock',
          iconColor: 'text-green-600',
          bgColor: 'bg-green-100',
          title: 'Vente Rapide',
          description:
            'Grâce à notre réseau et notre stratégie marketing, nous vendons en moyenne en 21 jours.',
          statValue: '21 jours',
          statLabel: 'Délai moyen',
          statColor: 'text-green-600',
          statBgColor: 'bg-green-50',
        },
        {
          icon: 'shield',
          iconColor: 'text-orange-600',
          bgColor: 'bg-orange-100',
          title: 'Sécurité Garantie',
          description:
            "Transactions sécurisées et accompagnement juridique complet pour votre tranquillité d'esprit.",
          statValue: '100%',
          statLabel: 'Sécurisé',
          statColor: 'text-orange-600',
          statBgColor: 'bg-orange-50',
        },
      ],
    },
  ],
}
