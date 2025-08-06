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
        description: 'Add rows with values for each column',
      },
      fields: [
        {
          name: 'values',
          type: 'array',
          label: 'Row Values',
          fields: [
            {
              name: 'value',
              type: 'text',
              label: 'Cell Value',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}