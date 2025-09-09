import type { CollectionConfig } from 'payload'

// Import the blocks that can be used in popups
import { QuizFormBlock } from '../../blocks/LandingCommonBlocks/QuizFormBlock/config'
import { Content } from '../../blocks/Content/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'

export const Popups: CollectionConfig = {
  slug: 'popups',
  labels: {
    singular: 'Popup',
    plural: 'Popups',
  },
  admin: {
    useAsTitle: 'title',
    description:
      'Manage reusable popups. You can create simple form popups or use blocks for more complex content.',
    defaultColumns: ['title', 'popupType', 'updatedAt'],
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
      name: 'popupType',
      type: 'select',
      required: true,
      defaultValue: 'form',
      options: [
        {
          label: 'Simple Form Popup',
          value: 'form',
        },
        {
          label: 'Block-based Popup',
          value: 'blocks',
        },
      ],
      admin: {
        position: 'sidebar',
        description:
          'Choose between a simple form popup or a block-based popup for more complex content',
      },
    },
    // Fields for simple form popups
    {
      name: 'pdfName',
      label: 'PDF Name',
      type: 'text',
      admin: {
        condition: (data) => data.popupType === 'form',
        description: 'Name of the PDF associated to this popup (not rendered, sent to n8n).',
      },
      validate: (val: unknown, { data }: any) => {
        if (data.popupType === 'form') {
          return val && String(val).trim().length ? true : 'PDF Name is required for form popups'
        }
        return true
      },
    },
    {
      name: 'buttonText',
      label: 'Submit Button Text',
      type: 'text',
      defaultValue: 'Envoyer',
      admin: {
        condition: (data) => data.popupType === 'form',
      },
    },
    // The three input fields are fixed in the UI component, but we allow optional label overrides
    {
      type: 'row',
      admin: {
        condition: (data) => data.popupType === 'form',
      },
      fields: [
        { name: 'firstNameLabel', label: 'First name label', type: 'text', defaultValue: 'Prénom' },
        { name: 'lastNameLabel', label: 'Last name label', type: 'text', defaultValue: 'Nom' },
      ],
    },
    {
      name: 'phoneLabel',
      label: 'Phone label',
      type: 'text',
      defaultValue: 'Téléphone',
      admin: {
        condition: (data) => data.popupType === 'form',
      },
    },
    // Fields for block-based popups
    {
      name: 'content',
      type: 'blocks',
      blocks: [QuizFormBlock, Content, MediaBlock],
      admin: {
        condition: (data) => data.popupType === 'blocks',
        description:
          'Add blocks to create your popup content. You can combine different blocks like Quiz Forms, Content, and Media.',
      },
      validate: (val: unknown, { data }: any) => {
        if (data.popupType === 'blocks') {
          return val && Array.isArray(val) && val.length > 0
            ? true
            : 'At least one block is required for block-based popups'
        }
        return true
      },
    },
  ],
}

export default Popups
