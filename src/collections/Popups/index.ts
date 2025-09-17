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
      name: 'description',
      label: 'Description',
      type: 'textarea',
      admin: { condition: (data) => data.popupType === 'form' },
    },
    {
      name: 'consentLabel',
      label: 'Consent checkbox label',
      type: 'textarea',
      defaultValue:
        "J'accepte de recevoir des communications concernant des contenus et services d’Équipe Lambert.",
      admin: {
        condition: (data) => data.popupType === 'form',
        description:
          'Text displayed next to the required consent checkbox. The submit button is enabled only when this is checked.',
      },
    },
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
      validate: (_: unknown, { data }: any) => {
        if (data.popupType !== 'form') return true
        const atLeastOneRequired =
          data.firstNameRequired ||
          data.lastNameRequired ||
          data.phoneRequired ||
          data.emailRequired
        return atLeastOneRequired ? true : 'At least one field must be required'
      },
    },
    // Configure which fields to include, labels, and which are required
    {
      type: 'row',
      admin: {
        condition: (data) => data.popupType === 'form',
      },
      fields: [
        {
          name: 'includeFirstName',
          type: 'checkbox',
          label: 'Include first name',
          defaultValue: true,
        },
        { name: 'firstNameRequired', type: 'checkbox', label: 'Required', defaultValue: false },
        { name: 'firstNameLabel', label: 'First name label', type: 'text', defaultValue: 'Prénom' },
        {
          name: 'firstNameWidth',
          label: 'First name width',
          type: 'select',
          defaultValue: 'half',
          options: [
            { label: 'Half width', value: 'half' },
            { label: 'Full width', value: 'full' },
          ],
        },
      ],
    },
    {
      type: 'row',
      admin: { condition: (data) => data.popupType === 'form' },
      fields: [
        {
          name: 'includeLastName',
          type: 'checkbox',
          label: 'Include last name',
          defaultValue: true,
        },
        { name: 'lastNameRequired', type: 'checkbox', label: 'Required', defaultValue: false },
        { name: 'lastNameLabel', label: 'Last name label', type: 'text', defaultValue: 'Nom' },
        {
          name: 'lastNameWidth',
          label: 'Last name width',
          type: 'select',
          defaultValue: 'half',
          options: [
            { label: 'Half width', value: 'half' },
            { label: 'Full width', value: 'full' },
          ],
        },
      ],
    },
    {
      type: 'row',
      admin: { condition: (data) => data.popupType === 'form' },
      fields: [
        { name: 'includePhone', type: 'checkbox', label: 'Include phone', defaultValue: true },
        { name: 'phoneRequired', type: 'checkbox', label: 'Required', defaultValue: false },
        { name: 'phoneLabel', label: 'Phone label', type: 'text', defaultValue: 'Téléphone' },
        {
          name: 'phoneWidth',
          label: 'Phone width',
          type: 'select',
          defaultValue: 'full',
          options: [
            { label: 'Half width', value: 'half' },
            { label: 'Full width', value: 'full' },
          ],
        },
      ],
    },
    {
      type: 'row',
      admin: { condition: (data) => data.popupType === 'form' },
      fields: [
        { name: 'includeEmail', type: 'checkbox', label: 'Include email', defaultValue: true },
        { name: 'emailRequired', type: 'checkbox', label: 'Required', defaultValue: false },
        { name: 'emailLabel', label: 'Email label', type: 'text', defaultValue: 'Courriel' },
        {
          name: 'emailWidth',
          label: 'Email width',
          type: 'select',
          defaultValue: 'full',
          options: [
            { label: 'Half width', value: 'half' },
            { label: 'Full width', value: 'full' },
          ],
        },
      ],
    },
    {
      name: 'successMessage',
      label: 'Success message (shown after submit)',
      type: 'textarea',
      defaultValue:
        "Merci! Nous avons bien reçu vos informations. Un membre de l'équipe vous contactera bientôt.",
      admin: { condition: (data) => data.popupType === 'form' },
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
