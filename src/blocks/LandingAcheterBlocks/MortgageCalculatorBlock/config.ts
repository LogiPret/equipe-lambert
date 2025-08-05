import type { Block } from 'payload'

export const MortgageCalculatorBlock: Block = {
  slug: 'mortgageCalculator',
  labels: {
    singular: 'Mortgage Calculator Section',
    plural: 'Mortgage Calculator Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Calculateur Hypothécaire',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      defaultValue: 'Estimez vos paiements mensuels',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Utilisez notre calculateur pour estimer vos paiements hypothécaires mensuels et planifier votre achat immobilier.',
    },
    {
      name: 'defaultValues',
      type: 'group',
      label: 'Valeurs par défaut',
      fields: [
        {
          name: 'homePrice',
          type: 'number',
          label: 'Prix de la propriété par défaut',
          defaultValue: 500000,
          min: 0,
        },
        {
          name: 'downPayment',
          type: 'number',
          label: 'Mise de fonds par défaut',
          defaultValue: 100000,
          min: 0,
        },
        {
          name: 'interestRate',
          type: 'number',
          label: "Taux d'intérêt par défaut (%)",
          defaultValue: 5.25,
          min: 0,
          max: 20,
        },
        {
          name: 'loanTerm',
          type: 'number',
          label: "Période d'amortissement par défaut (années)",
          defaultValue: 30,
          min: 25,
          max: 35,
        },
      ],
    },
  ],
}
