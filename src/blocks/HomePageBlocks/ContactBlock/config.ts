import { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'contact',
  labels: {
    singular: 'Contact Block',
    plural: 'Contact Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
    },
    {
      name: 'contactInfo',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Phone',
              value: 'phone',
            },
            {
              label: 'Email',
              value: 'mail',
            },
            {
              label: 'Location',
              value: 'location',
            },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'primary',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
    {
      name: 'officeImage',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'form',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'formFields',
          type: 'array',
          label: 'Form Fields',
          required: true,
          minRows: 1,
          maxRows: 15,
          fields: [
            {
              name: 'fieldType',
              type: 'select',
              label: 'Field Type',
              required: true,
              options: [
                {
                  label: 'Text Input',
                  value: 'text',
                },
                {
                  label: 'Email Input',
                  value: 'email',
                },
                {
                  label: 'Phone Input',
                  value: 'tel',
                },
                {
                  label: 'Number Input',
                  value: 'number',
                },
                {
                  label: 'Textarea',
                  value: 'textarea',
                },
                {
                  label: 'Select Dropdown',
                  value: 'select',
                },
                {
                  label: 'Checkbox',
                  value: 'checkbox',
                },
              ],
            },
            {
              name: 'name',
              type: 'text',
              label: 'Field Name (used for form submission)',
              required: true,
              admin: {
                description: 'Unique identifier for this field (e.g., firstName, email, message)',
              },
            },
            {
              name: 'label',
              type: 'text',
              label: 'Field Label',
              required: true,
              admin: {
                description: 'Display label for the field',
              },
            },
            {
              name: 'placeholder',
              type: 'text',
              label: 'Placeholder Text',
              admin: {
                condition: (data, siblingData) =>
                  ['text', 'email', 'tel', 'number', 'textarea'].includes(siblingData.fieldType),
              },
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Required Field',
              defaultValue: false,
            },
            {
              name: 'width',
              type: 'select',
              label: 'Field Width',
              defaultValue: 'full',
              options: [
                {
                  label: 'Full Width',
                  value: 'full',
                },
                {
                  label: 'Half Width',
                  value: 'half',
                },
              ],
            },
            {
              name: 'options',
              type: 'array',
              label: 'Select Options',
              minRows: 1,
              maxRows: 10,
              admin: {
                condition: (data, siblingData) => siblingData.fieldType === 'select',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'rows',
              type: 'number',
              label: 'Number of Rows',
              defaultValue: 4,
              min: 2,
              max: 10,
              admin: {
                condition: (data, siblingData) => siblingData.fieldType === 'textarea',
              },
            },
          ],
        },
        {
          name: 'submitButton',
          type: 'group',
          label: 'Submit Button',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Button Text',
              required: true,
              defaultValue: 'Envoyer le message',
            },
            {
              name: 'loadingText',
              type: 'text',
              label: 'Loading Text',
              defaultValue: 'Envoi en cours...',
            },
          ],
        },
        {
          name: 'checkboxText',
          type: 'text',
          label: 'Checkbox Agreement Text',
          required: false,
          defaultValue: 'I agree to the terms and conditions',
          admin: {
            description:
              'Text that appears next to the checkbox (e.g., "I agree to the terms and conditions")',
          },
        },
        {
          name: 'successMessage',
          type: 'textarea',
          label: 'Success Message',
          required: false,
          defaultValue: 'Merci pour votre message ! Nous reviendrons vers vous bientôt.',
          admin: {
            description: 'Message displayed after successful form submission',
          },
        },
        {
          name: 'disclaimer',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
