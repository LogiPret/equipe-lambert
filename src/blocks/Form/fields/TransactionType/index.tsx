import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import React from 'react'

import { Label } from '../../../../components/ui/label'

import { Error } from '../../Error'
import { Width } from '../../Width'

export type TransactionTypeField = {
  blockType: 'transactionType'
  name: string
  label?: string
  required?: boolean
  width?: string
  option1?: string
  option2?: string
}

export const TransactionType: React.FC<
  TransactionTypeField & {
    errors: Partial<FieldErrorsImpl<FieldValues>>
    register: UseFormRegister<FieldValues>
  }
> = ({
  name,
  label,
  required,
  option1 = 'Vendre',
  option2 = 'Acheter',
  register,
  errors,
  width,
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
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id={`${name}-${option1}`}
              value={option1}
              {...register(name, { required })}
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
              {...register(name, { required })}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <Label htmlFor={`${name}-${option2}`} className="cursor-pointer">
              {option2}
            </Label>
          </div>
        </div>
      </fieldset>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
