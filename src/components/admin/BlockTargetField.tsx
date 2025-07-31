'use client'

import React, { useEffect, useState } from 'react'
import { useFormFields, useField } from '@payloadcms/ui'

export const BlockTargetField: React.FC<{
  path: string
  label?: string
  required?: boolean
}> = ({ path, label = 'Block Target', required = false }) => {
  const { setValue, value } = useField<string>({ path })
  const [allFields] = useFormFields(([fields]) => [fields])
  const [availableBlocks, setAvailableBlocks] = useState<Array<{ label: string; value: string }>>(
    [],
  )

  useEffect(() => {
    // Try to get the layout blocks from the form data
    const layoutBlocks = allFields?.layout?.value

    if (Array.isArray(layoutBlocks)) {
      const blocks = layoutBlocks.map((block: any, index: number) => ({
        label: `${block.blockType} (${index})`,
        value: `${block.blockType}-${index}`,
      }))
      setAvailableBlocks(blocks)
    }
  }, [allFields])

  return (
    <div className="field-type text">
      <label className="field-label">
        {label}
        {required && <span className="required">*</span>}
      </label>

      {availableBlocks.length > 0 && (
        <div
          className="field-description"
          style={{
            marginBottom: '8px',
            padding: '8px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
          }}
        >
          <strong>Available blocks on this page:</strong>
          <ul style={{ margin: '4px 0', paddingLeft: '16px' }}>
            {availableBlocks.map((block) => (
              <li key={block.value} style={{ fontSize: '12px', fontFamily: 'monospace' }}>
                <code
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    color: '#0066cc',
                  }}
                  onClick={() => setValue(block.value)}
                >
                  {block.value}
                </code>{' '}
                - {block.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      <input
        type="text"
        value={value || ''}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter block ID (e.g., vendreHero-0)"
        className="field-input"
        required={required}
      />

      <div className="field-description">
        Enter the ID of the block to scroll to. Click on any ID above to auto-fill.
      </div>
    </div>
  )
}
