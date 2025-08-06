import type { Block } from 'payload'

export const TableByRows: Block = {
  slug: 'tableByRows',
  interfaceName: 'TableByRowsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Table Title',
      required: true,
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Rows',
      admin: {
        initCollapsed: true,
        description: 'Define the rows for your table first',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Row Name',
          required: true,
        },
      ],
      minRows: 1,
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Columns',
      admin: {
        initCollapsed: true,
        description: 'Add columns with values for each row',
      },
      fields: [
        {
          name: 'values',
          type: 'array',
          label: 'Column Values',
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