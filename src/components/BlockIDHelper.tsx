'use client'

import { useEffect, useState } from 'react'

export function BlockIDHelper({ isDraft = false }: { isDraft?: boolean }) {
  const [blockIds, setBlockIds] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const ids = Array.from(document.querySelectorAll('[id]'))
      .map((el) => el.id)
      .filter((id) => id && id.includes('-')) // Only show our block IDs
      .sort()
    setBlockIds(ids)
  }, [])

  // Only show in draft/preview mode (admin only)
  if (!isDraft) {
    return null
  }

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-md text-sm z-50 shadow-lg hover:bg-blue-700"
      >
        {isVisible ? 'Hide' : 'Show'} Block IDs
      </button>

      {isVisible && (
        <div className="fixed bottom-16 right-4 bg-black bg-opacity-90 text-white p-4 rounded-lg text-xs max-w-xs z-50 max-h-64 overflow-y-auto">
          <h4 className="font-bold mb-2">Available Block IDs:</h4>
          <ul className="space-y-1">
            {blockIds.map((id) => (
              <li
                key={id}
                className="font-mono cursor-pointer hover:bg-white hover:bg-opacity-20 p-1 rounded"
                onClick={() => navigator.clipboard.writeText(id)}
                title="Click to copy to clipboard"
              >
                {id}
              </li>
            ))}
          </ul>
          <div className="text-xs text-gray-300 mt-2 border-t border-gray-600 pt-2">
            Click any ID to copy to clipboard
          </div>
        </div>
      )}
    </>
  )
}
