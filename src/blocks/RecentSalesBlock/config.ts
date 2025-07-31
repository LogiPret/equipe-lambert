import type { Block } from 'payload'

export const RecentSalesBlock: Block = {
  slug: 'recentSales',
  labels: {
    singular: 'Recent Sales Section',
    plural: 'Recent Sales Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Ventes récentes',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      defaultValue:
        'Découvrez nos succès récents dans votre région et voyez comment nous maximisons la valeur de chaque propriété.',
    },
    {
      name: 'sales',
      type: 'array',
      minRows: 1,
      maxRows: 9,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'address',
          type: 'text',
          required: true,
        },
        {
          name: 'soldPrice',
          type: 'text',
          required: true,
          admin: {
            description: 'Prix de vente final (ex: 450 000 $)',
          },
        },
        {
          name: 'daysOnMarket',
          type: 'number',
          required: true,
          admin: {
            description: 'Nombre de jours sur le marché',
          },
        },
      ],
      defaultValue: [
        {
          address: '123 Rue Principale, Ville',
          soldPrice: '450 000 $',
          daysOnMarket: 15,
        },
        {
          address: '456 Avenue des Érables, Ville',
          soldPrice: '525 000 $',
          daysOnMarket: 22,
        },
        {
          address: '789 Boulevard du Parc, Ville',
          soldPrice: '380 000 $',
          daysOnMarket: 18,
        },
      ],
    },
  ],
}
