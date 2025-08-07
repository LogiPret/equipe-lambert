import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Phone, Mail, MapPin, Download } from 'lucide-react'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const resources = footerData?.resources || []
  const contactInfo = footerData?.contactInfo || {}
  const description = footerData?.description || ''

  return (
    <footer className="mt-auto border-t border-border bg-branding100 text-branding0">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and Description */}
          <div className="space-y-4">
            <Link className="flex items-center" href="/">
              <Logo />
            </Link>
            {description && (
              <p className="text-branding25 text-sm leading-relaxed pt-9">{description}</p>
            )}
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-branding0">Navigation</h3>
            <nav className="flex flex-col space-y-3">
              {navItems.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  className="text-branding25 hover:text-branding0 transition-colors duration-200 text-sm"
                  {...link}
                />
              ))}
            </nav>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-branding0">Ressources</h3>
            <div className="flex flex-col space-y-3">
              {resources.map((resource, i) => {
                const fileUrl =
                  typeof resource.file === 'object' && resource.file?.url ? resource.file.url : '#'

                return (
                  <a
                    key={i}
                    href={fileUrl}
                    download
                    className="text-branding25 hover:text-branding0 transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <Download className="h-4 w-4 group-hover:text-accent3static transition-colors" />
                    {resource.title}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-branding0">Contact</h3>
            <div className="flex flex-col space-y-3">
              {contactInfo.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-accent3static mt-0.5 flex-shrink-0" />
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              )}

              {contactInfo.email && (
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              )}

              {contactInfo.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <address className="text-gray-300 text-sm not-italic leading-relaxed">
                    {contactInfo.address.split('\n').map((line, index, array) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < array.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </address>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom section with theme selector */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Équipe Lambert. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
