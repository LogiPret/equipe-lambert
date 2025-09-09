export type FieldType =
  | 'text'
  | 'phone'
  | 'email'
  | 'dropdown'
  | 'slider'
  | 'checkbox'
  | 'checkboxGroup'
export type FieldWidth = 'full' | 'half'

export interface DropdownOption {
  label: string
  value: string
}

export interface CheckboxOption {
  label: string
}

export interface QuizField {
  id: string
  type: FieldType
  label: string
  placeholder?: string
  required?: boolean
  width: FieldWidth
  // Dropdown specific
  options?: DropdownOption[]
  // Slider specific
  min?: number
  max?: number
  step?: number
  defaultValue?: number
  // Single checkbox specific
  defaultChecked?: boolean
  // Checkbox group specific
  checkboxOptions?: CheckboxOption[]
  allowMultiple?: boolean // for checkbox groups
}

export interface QuizStep {
  id: string
  title: string
  subtitle?: string
  fields: QuizField[]
}

export interface QuizFormBlockProps {
  blockType: 'quizForm'
  title?: string
  subtitle?: string
  steps: QuizStep[]
  submitButtonText?: string
  successMessage?: string
  ctaAfterSubmit?: {
    text: string
    link: string
  }
  appearance?: {
    primaryColor?: string
    backgroundColor?: string
    borderRadius?: 'small' | 'medium' | 'large'
  }
}

export interface QuizFormData {
  [fieldId: string]: string | number | boolean | string[]
}
