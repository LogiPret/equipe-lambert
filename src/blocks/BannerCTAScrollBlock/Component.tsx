'use client'

import { DollarSign, Key, Phone, Mail } from 'lucide-react'

interface BannerCTAScrollBlockProps {
  backgroundColor: 'gradient_blue' | 'dark_blue' | 'navy'
  title: string
  subtitle?: string
  button: {
    text: string
    icon?: 'dollar_sign' | 'key' | 'phone' | 'mail'
    variant?: 'primary' | 'secondary'
    scrollTarget?: string
  }
}

const backgroundClasses = {
  gradient_blue: 'bg-gradient-to-r from-[#2d5f7f] to-[#4a7ba7]',
  dark_blue: 'bg-[#0f3046]',
  navy: 'bg-[#1a365d]',
}

const iconMap = {
  dollar_sign: DollarSign,
  key: Key,
  phone: Phone,
  mail: Mail,
}

const scrollToBlock = (blockId: string) => {
  const element = document.getElementById(blockId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  } else {
    console.warn(
      `Block with ID "${blockId}" not found. Available IDs:`,
      Array.from(document.querySelectorAll('[id]')).map((el) => el.id),
    )
  }
}

export default function BannerCTAScrollBlock({
  backgroundColor = 'gradient_blue',
  title,
  subtitle,
  button,
}: BannerCTAScrollBlockProps) {
  const IconComponent = button.icon ? iconMap[button.icon] : undefined

  const handleClick = () => {
    if (button.scrollTarget) {
      scrollToBlock(button.scrollTarget)
    }
  }

  return (
    <div className={`${backgroundClasses[backgroundColor]} py-4`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-branding0">
          <div className="text-center md:text-left">
            <span className="text-lg font-medium">{title}</span>
            {subtitle && <span className="text-accent1static ml-2">{subtitle}</span>}
          </div>
          <button
            onClick={handleClick}
            className="bg-branding0 text-branding100 hover:bg-accent1static font-medium px-6 py-2 rounded-lg transition-colors duration-200 flex items-center"
          >
            {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
            {button.text}
          </button>
        </div>
      </div>
    </div>
  )
}
