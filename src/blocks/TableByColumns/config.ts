import type { Block } from 'payload'

export const TableByColumns: Block = {
  slug: 'tableByColumns',
  interfaceName: 'TableByColumnsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Table Title',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Table Description',
      admin: {
        description: 'Optional description text that will appear below the title and above the table',
      },
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Columns',
      admin: {
        initCollapsed: true,
        description: 'Define the columns for your table first',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Column Name',
          required: true,
        },
      ],
      minRows: 1,
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Rows',
      admin: {
        initCollapsed: true,
        description: 'Add rows with values for each column defined above',
      },
      fields: [
        {
          name: 'rowLabel',
          type: 'text',
          label: 'Row Label (Optional)',
          admin: {
            description: 'Optional label for this row',
          },
        },
        {
          name: 'values',
          type: 'array',
          label: 'Cell Values',
          admin: {
            description: 'Add one value for each column defined above',
          },
          fields: [
            {
              name: 'value',
              type: 'text',
              label: 'Cell Value',
            },
          ],
        },
      ],
    },
  ],
}