'use client'
import React, { useState } from 'react'
import PopupModal from '@/components/PopupModal/Component.client'
import { Button, type ButtonProps } from '@/components/ui/button'

export type ClientButtonProps = {
  text: string
  appearance?: ButtonProps['variant']
  size?: ButtonProps['size']
}

export type PopupData = {
  title?: string | null
  firstNameLabel?: string | null
  lastNameLabel?: string | null
  phoneLabel?: string | null
  buttonText?: string | null
  pdfName?: string | null
}

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

      <PopupModal
        open={open}
        onClose={() => setOpen(false)}
        title={popup?.title || 'Contact'}
        firstNameLabel={popup?.firstNameLabel || 'Prénom'}
        lastNameLabel={popup?.lastNameLabel || 'Nom'}
        phoneLabel={popup?.phoneLabel || 'Téléphone'}
        buttonText={popup?.buttonText || 'Envoyer'}
        pdfName={popup?.pdfName || undefined}
      />
    </>
  )
}

export default ClientButton
