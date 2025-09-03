import type { Block } from 'payload'

export const LandingFAQBlock: Block = {
  slug: 'landingFAQBlock',
  labels: {
    singular: 'Landing FAQ',
    plural: 'Landing FAQs',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Frequently asked questions',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'lorem ipsum',
      required: true,
    },
    {
      name: 'faqs',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
      defaultValue: [
        { question: 'question 1', answer: 'answer 1' },
        { question: 'question 2', answer: 'answer 2' },
        { question: 'question 3', answer: 'answer 3' },
        { question: 'question 4', answer: 'answer 4' },
      ],
    },
  ],
}
