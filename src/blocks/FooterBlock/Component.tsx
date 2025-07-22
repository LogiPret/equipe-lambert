'use client'
import { Users, Globe, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface FooterSection {
  title: string
  links: Array<{
    label: string
    href: string
  }>
}

interface ContactInfo {
  phone: string
  phoneDescription: string
  email: string
  emailDescription: string
  address: string
  addressLine2: string
  addressDescription: string
}

interface FooterBlockProps {
  logo: {
    title: string
    subtitle: string
    description: string
  }
  sections: FooterSection[]
  contact: ContactInfo
  copyright: string
  legalLinks: Array<{
    label: string
    href: string
  }>
}

function ScrollAnimation({
  children,
  animation = 'fadeIn',
  delay = 0,
}: {
  children: React.ReactNode
  animation?: 'fadeIn' | 'slideUp'
  delay?: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getAnimationClass = () => {
    const baseClass = 'transition-all duration-1000 ease-out'

    if (!isVisible) {
      switch (animation) {
        case 'fadeIn':
          return `${baseClass} opacity-0`
        case 'slideUp':
          return `${baseClass} opacity-0 translate-y-8`
        default:
          return `${baseClass} opacity-0`
      }
    }

    return `${baseClass} opacity-100 translate-y-0`
  }

  return (
    <div ref={ref} className={getAnimationClass()}>
      {children}
    </div>
  )
}

export default function FooterBlock({
  logo,
  sections,
  contact,
  copyright,
  legalLinks,
}: FooterBlockProps) {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <ScrollAnimation animation="fadeIn" delay={200}>
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-[#0f3046] p-2">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-serif font-bold">{logo.title}</span>
                  <div className="text-xs text-blue-200 tracking-wider">{logo.subtitle}</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">{logo.description}</p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-[#0f3046] border border-[#2d5f7f] flex items-center justify-center hover:bg-[#1a4a66] transition-colors">
                  <Globe className="h-4 w-4 text-white" />
                </div>
                <div className="w-8 h-8 bg-[#0f3046] border border-[#2d5f7f] flex items-center justify-center hover:bg-[#1a4a66] transition-colors">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div className="w-8 h-8 bg-[#0f3046] border border-[#2d5f7f] flex items-center justify-center hover:bg-[#1a4a66] transition-colors">
                  <Phone className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {sections.map((section, index) => (
            <ScrollAnimation key={index} animation="fadeIn" delay={400 + index * 200}>
              <div>
                <h4 className="font-serif font-bold mb-6 text-lg text-blue-200">{section.title}</h4>
                <ul className="space-y-3 text-gray-400">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.href} className="hover:text-blue-200 transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
          ))}

          <ScrollAnimation animation="fadeIn" delay={800}>
            <div>
              <h4 className="font-serif font-bold mb-6 text-lg text-blue-200">
                Contact d&apos;équipe
              </h4>
              <div className="space-y-4 text-gray-400">
                <div>
                  <p className="font-medium text-white">{contact.phone}</p>
                  <p className="text-sm">{contact.phoneDescription}</p>
                </div>
                <div>
                  <p className="font-medium text-white">{contact.email}</p>
                  <p className="text-sm">{contact.emailDescription}</p>
                </div>
                <div>
                  <p className="font-medium text-white">{contact.address}</p>
                  <p>{contact.addressLine2}</p>
                  <p className="text-sm">{contact.addressDescription}</p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        <ScrollAnimation animation="fadeIn" delay={1000}>
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <p>{copyright}</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                {legalLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="hover:text-blue-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </footer>
  )
}
