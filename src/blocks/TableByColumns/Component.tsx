import React from 'react'
import type { TableByColumnsBlock as TableByColumnsBlockProps } from '@/payload-types'

export const TableByColumnsBlock: React.FC<TableByColumnsBlockProps> = (props) => {
  const { title, columns, rows } = props

  if (!columns || columns.length === 0) {
    return (
      <div className="container my-16">
        <div className="text-center text-gray-500">
          <p>No columns defined for this table.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container my-16">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 text-left font-semibold"
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows && rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((_, colIndex) => {
                    const cellValue = row.values && row.values[colIndex]?.value
                    return (
                      <td
                        key={colIndex}
                        className="border border-gray-300 px-4 py-2"
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
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
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