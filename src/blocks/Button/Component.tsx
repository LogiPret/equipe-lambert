import React from 'react'
import { CMSLink } from '@/components/Link'
import type { Page, Post } from '@/payload-types'

interface ButtonBlockProps {
  text: string
  link: {
    type?: 'custom' | 'reference' | null
    newTab?: boolean | null
    reference?: {
      relationTo: 'pages' | 'posts'
      value: Page | Post | string | number
    } | null
    url?: string | null
    appearance?: 'default' | 'outline'
  }
}

export const ButtonBlock: React.FC<ButtonBlockProps> = ({ text, link }) => {
  return (
    <div className="my-8 flex justify-center">
      <CMSLink
        type={link.type}
        reference={link.reference}
        url={link.url}
        newTab={link.newTab}
        appearance={link.appearance || 'default'}
        className="inline-flex items-center justify-center no-underline"
      >
        {text}
      </CMSLink>
    </div>
  )
}

export default ButtonBlock
