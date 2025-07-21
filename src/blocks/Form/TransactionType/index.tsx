import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Controller } from 'react-hook-form'

import { Error } from '../Error'
import { Width } from '../Width'

export type TransactionTypeField = FormFieldBlock & {
  blockType: 'transactionType'
  option1?: string
  option2?: string
}

export const TransactionType: React.FC<
  TransactionTypeField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({
  name,
  label,
  required,
  option1 = 'Vendre',
  option2 = 'Acheter',
  control,
  errors,
  width,
  defaultValue,
}) => {
  return (
    <Width width={width}>
      <fieldset>
        <legend className="mb-3 block text-sm font-medium">
          {label}
          {required && (
            <span className="required text-red-500 ml-1">
              * <span className="sr-only">(required)</span>
            </span>
          )}
        </legend>
        <Controller
          control={control}
          defaultValue={defaultValue}
          name={name}
          render={({ field: { onChange, value } }) => (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`${name}-${option1}`}
                  value={option1}
                  checked={value === option1}
                  onChange={(e) => onChange(e.target.value)}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <Label htmlFor={`${name}-${option1}`} className="cursor-pointer">
                  {option1}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`${name}-${option2}`}
                  value={option2}
                  checked={value === option2}
                  onChange={(e) => onChange(e.target.value)}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <Label htmlFor={`${name}-${option2}`} className="cursor-pointer">
                  {option2}
                </Label>
              </div>
            </div>
          )}
          rules={{ required }}
        />
      </fieldset>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
