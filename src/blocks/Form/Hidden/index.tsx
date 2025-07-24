import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import React from 'react'

export type HiddenField = {
  blockType: 'hidden'
  name: string
  value?: string
}

export const Hidden: React.FC<
  HiddenField & {
    errors: Partial<FieldErrorsImpl<FieldValues>>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, value = '', register }) => {
  return <input type="hidden" defaultValue={value} {...register(name)} />
}
