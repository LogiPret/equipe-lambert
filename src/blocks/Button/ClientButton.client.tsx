'use client'
import React, { useState } from 'react'
import EnhancedPopupModal from '@/components/PopupModal/EnhancedPopupModal.client'
import { Button, type ButtonProps } from '@/components/ui/button'

export type ClientButtonProps = {
  text: string
  appearance?: ButtonProps['variant']
  size?: ButtonProps['size']
}

export type SimplePopupData = {
  popupType: 'form'
  title?: string | null
  description?: string | null
  firstNameLabel?: string | null
  lastNameLabel?: string | null
  phoneLabel?: string | null
  emailLabel?: string | null
  includeFirstName?: boolean | null
  includeLastName?: boolean | null
  includePhone?: boolean | null
  includeEmail?: boolean | null
  firstNameRequired?: boolean | null
  lastNameRequired?: boolean | null
  phoneRequired?: boolean | null
  emailRequired?: boolean | null
  firstNameWidth?: 'half' | 'full' | null
  lastNameWidth?: 'half' | 'full' | null
  phoneWidth?: 'half' | 'full' | null
  emailWidth?: 'half' | 'full' | null
  buttonText?: string | null
  successMessage?: string | null
  pdfName?: string | null
  consentLabel?: string | null
}

export type BlocksPopupData = {
  popupType: 'blocks'
  title?: string | null
  content: any[]
}

export type PopupData = SimplePopupData | BlocksPopupData

export const ClientButton: React.FC<ClientButtonProps & { popup?: PopupData | null }> = ({
  text,
  appearance = 'default',
  size,
  popup,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} variant={appearance} size={size}>
        {text}
      </Button>

      {popup && (
        <EnhancedPopupModal
          open={open}
          onClose={() => setOpen(false)}
          {...popup}
          title={popup.title || 'Contact'}
        />
      )}
    </>
  )
}

export default ClientButton
