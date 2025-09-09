import type { Block } from 'payload'

export const QuizFormBlock: Block = {
  slug: 'quizForm',
  interfaceName: 'QuizFormBlock',
  labels: {
    singular: 'Quiz Form',
    plural: 'Quiz Forms',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Complete Our Quiz',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      defaultValue: 'Help us understand your needs better',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Quiz Steps',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'id',
          type: 'text',
          label: 'Step ID',
          required: true,
          admin: {
            description: 'Unique identifier for this step',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Step Title',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Step Subtitle',
        },
        {
          name: 'fields',
          type: 'array',
          label: 'Form Fields',
          required: true,
          minRows: 1,
          fields: [
            {
              name: 'id',
              type: 'text',
              label: 'Field ID',
              required: true,
              admin: {
                description: 'Unique identifier for this field',
              },
            },
            {
              name: 'type',
              type: 'select',
              label: 'Field Type',
              required: true,
              options: [
                { label: 'Text Input', value: 'text' },
                { label: 'Phone Number', value: 'phone' },
                { label: 'Email Address', value: 'email' },
                { label: 'Dropdown', value: 'dropdown' },
                { label: 'Number Slider', value: 'slider' },
                { label: 'Checkbox Group (Multiple Choice)', value: 'checkboxGroup' },
              ],
            },
            {
              name: 'label',
              type: 'text',
              label: 'Field Label',
              required: true,
            },
            {
              name: 'placeholder',
              type: 'text',
              label: 'Placeholder Text',
              admin: {
                condition: (data, siblingData) =>
                  siblingData.type === 'text' ||
                  siblingData.type === 'phone' ||
                  siblingData.type === 'email',
              },
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Required Field',
            },
            {
              name: 'width',
              type: 'select',
              label: 'Field Width',
              required: true,
              defaultValue: 'full',
              options: [
                { label: 'Full Width', value: 'full' },
                { label: 'Half Width', value: 'half' },
              ],
            },
            // Dropdown specific fields
            {
              name: 'options',
              type: 'array',
              label: 'Dropdown Options',
              admin: {
                condition: (data, siblingData) => siblingData.type === 'dropdown',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Option Label',
                  required: true,
                },
                {
                  name: 'value',
                  type: 'text',
                  label: 'Option Value',
                  required: true,
                },
              ],
            },
            // Slider specific fields
            {
              name: 'min',
              type: 'number',
              label: 'Minimum Value',
              defaultValue: 0,
              admin: {
                condition: (data, siblingData) => siblingData.type === 'slider',
              },
            },
            {
              name: 'max',
              type: 'number',
              label: 'Maximum Value',
              defaultValue: 100,
              admin: {
                condition: (data, siblingData) => siblingData.type === 'slider',
              },
            },
            {
              name: 'step',
              type: 'number',
              label: 'Step Size',
              defaultValue: 1,
              admin: {
                condition: (data, siblingData) => siblingData.type === 'slider',
              },
            },
            {
              name: 'defaultValue',
              type: 'number',
              label: 'Default Value',
              admin: {
                condition: (data, siblingData) => siblingData.type === 'slider',
              },
            },
            // Checkbox group specific fields (simplified - label only)
            {
              name: 'checkboxOptions',
              type: 'array',
              label: 'Checkbox Options',
              admin: {
                condition: (data, siblingData) => siblingData.type === 'checkboxGroup',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Option Label',
                  required: true,
                },
              ],
            },
            {
              name: 'allowMultiple',
              type: 'checkbox',
              label: 'Allow Multiple Selections',
              defaultValue: true,
              admin: {
                condition: (data, siblingData) => siblingData.type === 'checkboxGroup',
                description:
                  'When disabled, only one option can be selected at a time (radio-like behavior)',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'submitButtonText',
      type: 'text',
      label: 'Submit Button Text',
      defaultValue: 'Submit',
    },
    {
      name: 'successMessage',
      type: 'text',
      label: 'Success Message',
      defaultValue: "Thank you for completing our quiz! We'll be in touch soon.",
    },
    {
      name: 'ctaAfterSubmit',
      type: 'group',
      label: 'CTA After Submit',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'CTA Text',
        },
        {
          name: 'link',
          type: 'text',
          label: 'CTA Link',
        },
      ],
    },
    {
      name: 'appearance',
      type: 'group',
      label: 'Appearance Settings',
      fields: [
        {
          name: 'primaryColor',
          type: 'text',
          label: 'Primary Color (CSS)',
          admin: {
            description: 'CSS color value (e.g., #3B82F6, rgb(59, 130, 246))',
          },
        },
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Background Color (CSS)',
          admin: {
            description: 'CSS color value for the form background',
          },
        },
        {
          name: 'borderRadius',
          type: 'select',
          label: 'Border Radius',
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
        },
      ],
    },
  ],
}
