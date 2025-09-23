import React from 'react'
import type { TableByColumnsBlock as TableByColumnsBlockProps } from '@/payload-types'

export const TableByColumnsBlock: React.FC<TableByColumnsBlockProps> = (props) => {
  const { title, description, columns, rows } = props

  if (!columns || columns.length === 0) {
    return (
      <div className="w-full my-16">
        <div className="text-center text-branding75">
          <p>No columns defined for this table.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full my-4">
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      {description && (
        <div className="mb-1 text-branding75">
          <p>{description}</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-brandingtheme">
          <thead>
            <tr className="bg-brandingtheme text-brandingtheme-foreground">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="border border-brandingtheme-foreground px-4 py-2 text-left font-semibold text-brandingtheme-foreground"
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows && rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-brandingtheme hover:text-brandingtheme-foreground"
                >
                  {columns.map((column, colIndex) => {
                    const cellValue = row.values && row.values[colIndex]?.value
                    return (
                      <td
                        key={colIndex}
                        className="border border-brnadingtheme-foreground px-4 py-2"
                      >
                        {cellValue || ''}
                      </td>
                    )
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="border border-brandingtheme px-4 py-2 text-center text-brandingtheme-foreground"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
