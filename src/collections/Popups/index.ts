import type { CollectionConfig } from 'payload'

export const Popups: CollectionConfig = {
  slug: 'popups',
  labels: {
    singular: 'Popup',
    plural: 'Popups',
  },
  admin: {
    useAsTitle: 'title',
    description:
      'Manage reusable popups. Buttons configured with type "Popup" can reference one of these.',
    defaultColumns: ['title', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  timestamps: true,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'pdfName',
      label: 'PDF Name',
      type: 'text',
      admin: {
        description: 'Name of the PDF associated to this popup (not rendered, sent to n8n).',
      },
      validate: (val: unknown) =>
        val && String(val).trim().length ? true : 'PDF Name is required',
    },
    {
      name: 'buttonText',
      label: 'Submit Button Text',
      type: 'text',
      required: true,
      defaultValue: 'Envoyer',
    },
    // The three input fields are fixed in the UI component, but we allow optional label overrides
    {
      type: 'row',
      fields: [
        { name: 'firstNameLabel', label: 'First name label', type: 'text', defaultValue: 'Prénom' },
        { name: 'lastNameLabel', label: 'Last name label', type: 'text', defaultValue: 'Nom' },
      ],
    },
    { name: 'phoneLabel', label: 'Phone label', type: 'text', defaultValue: 'Téléphone' },
  ],
}

export default Popups
