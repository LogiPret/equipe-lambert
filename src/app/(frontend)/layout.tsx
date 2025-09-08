import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import ThemeToggle from '@/components/ThemeToggle'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { Analytics } from '@vercel/analytics/next'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <meta
          name="google-site-verification"
          content="ubJWhCFHH81FWokcg86zoqxallVYcc0bT37LSAOc340"
        />
        <link href="/favicon.svg" rel="icon" sizes="32x32" type="image/svg+xml" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/favicon.svg" rel="shortcut icon" type="image/svg+xml" />
        <link href="/equipelambert_logo.png" rel="apple-touch-icon" sizes="180x180" />
        <meta name="theme-color" content="#1a1a1a" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          <main className="flex-1">
            {children}
            <Analytics />
          </main>
          <Footer />
          <ThemeToggle />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Équipe Lambert - Courtiers Immobiliers Montréal',
    template: '%s | Équipe Lambert',
  },
  description:
    'Équipe Lambert - Courtiers immobiliers professionnels à Montréal. Achat, vente et accompagnement personnalisé pour tous vos projets immobiliers.',
  openGraph: mergeOpenGraph({
    title: 'Équipe Lambert - Courtiers Immobiliers Montréal',
    description:
      'Équipe Lambert - Courtiers immobiliers professionnels à Montréal. Achat, vente et accompagnement personnalisé pour tous vos projets immobiliers.',
    images: [
      {
        url: '/equipelambert_logo.png',
        width: 1200,
        height: 630,
        alt: 'Équipe Lambert - Courtiers Immobiliers Montréal',
      },
    ],
    siteName: 'Équipe Lambert',
    locale: 'fr_CA',
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'Équipe Lambert - Courtiers Immobiliers Montréal',
    description:
      'Équipe Lambert - Courtiers immobiliers professionnels à Montréal. Achat, vente et accompagnement personnalisé pour tous vos projets immobiliers.',
    images: ['/equipelambert_logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'ubJWhCFHH81FWokcg86zoqxallVYcc0bT37LSAOc340',
  },
}
