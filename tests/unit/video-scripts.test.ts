import { describe, it, expect } from 'vitest'
import { VideoScripts } from '../../src/collections/VideoScripts'

describe('VideoScripts Collection', () => {
  it('should have correct collection configuration', () => {
    expect(VideoScripts.slug).toBe('video-scripts')
    expect(VideoScripts.admin?.useAsTitle).toBe('title')
  })

  it('should have all required fields', () => {
    const fields = VideoScripts.fields
    const fieldNames = fields.map((field: any) => field.name).filter(Boolean)
    
    expect(fieldNames).toContain('title')
    expect(fieldNames).toContain('hook')
    expect(fieldNames).toContain('contentIdea')
    expect(fieldNames).toContain('cta')
    expect(fieldNames).toContain('staging')
    expect(fieldNames).toContain('scriptNumber')
  })

  it('should have proper field validations', () => {
    const fields = VideoScripts.fields
    const titleField = fields.find((field: any) => field.name === 'title')
    const scriptNumberField = fields.find((field: any) => field.name === 'scriptNumber')
    
    expect(titleField?.required).toBe(true)
    expect(scriptNumberField?.min).toBe(1)
    expect(scriptNumberField?.max).toBe(31)
  })
})