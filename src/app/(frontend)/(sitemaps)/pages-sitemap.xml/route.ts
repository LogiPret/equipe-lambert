import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    let SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://www.equipelambert.ca'

    // Add https:// if missing
    if (SITE_URL && !SITE_URL.startsWith('http')) {
      SITE_URL = `https://${SITE_URL}`
    }

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const defaultSitemap = [
      {
        loc: `${SITE_URL}/search`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/posts`,
        lastmod: dateFallback,
      },
    ]

    const sitemap = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug))
          .map((page) => {
            return {
              loc: page?.slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${page?.slug}`,
              lastmod: page.updatedAt || dateFallback,
            }
          })
      : []

    return getServerSideSitemap([...defaultSitemap, ...sitemap])
  } catch (error) {
    console.error('Pages sitemap error:', error)
    
    // Return basic sitemap on error
    const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.equipelambert.ca'
    return getServerSideSitemap([
      { loc: `${SITE_URL}/`, lastmod: new Date().toISOString() },
      { loc: `${SITE_URL}/search`, lastmod: new Date().toISOString() },
      { loc: `${SITE_URL}/posts`, lastmod: new Date().toISOString() },
    ])
  }
}