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
  firstNameLabel?: string | null
  lastNameLabel?: string | null
  phoneLabel?: string | null
  buttonText?: string | null
  pdfName?: string | null
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
