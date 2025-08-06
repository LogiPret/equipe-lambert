import React from 'react'
import type { TableByRowsBlock as TableByRowsBlockProps } from '@/payload-types'

export const TableByRowsBlock: React.FC<TableByRowsBlockProps> = (props) => {
  const { title, rows, columns } = props

  if (!rows || rows.length === 0) {
    return (
      <div className="container my-16">
        <div className="text-center text-gray-500">
          <p>No rows defined for this table.</p>
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
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                {/* Empty header for row names */}
              </th>
              {columns && columns.length > 0 ? (
                columns.map((column, colIndex) => (
                  <th
                    key={colIndex}
                    className="border border-gray-300 px-4 py-2 text-left font-semibold"
                  >
                    Column {colIndex + 1}
                  </th>
                ))
              ) : (
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  No columns
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold bg-gray-50">
                  {row.name}
                </td>
                {columns && columns.length > 0 ? (
                  columns.map((column, colIndex) => {
                    const cellValue = column.values && column.values[rowIndex]?.value
                    return (
                      <td
                        key={colIndex}
                        className="border border-gray-300 px-4 py-2"
                      >
                        {cellValue || ''}
                      </td>
                    )
                  })
                ) : (
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                    No data
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}