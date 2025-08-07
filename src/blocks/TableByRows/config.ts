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
      name: 'description',
      type: 'textarea',
      label: 'Table Description',
      admin: {
        description:
          'Optional description text that will appear below the title and above the table',
      },
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
        description: 'Add columns with values for each row defined above',
      },
      fields: [
        {
          name: 'columnLabel',
          type: 'text',
          label: 'Column Label (Optional)',
          admin: {
            description: 'Optional label for this column',
          },
        },
        {
          name: 'values',
          type: 'array',
          label: 'Cell Values',
          admin: {
            description: 'Add one value for each row defined above',
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
