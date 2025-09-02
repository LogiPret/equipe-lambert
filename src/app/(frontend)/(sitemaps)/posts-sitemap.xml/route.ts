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
      collection: 'posts',
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

    const sitemap = results.docs
      ? results.docs
          .filter((post) => Boolean(post?.slug))
          .map((post) => ({
            loc: `${SITE_URL}/posts/${post?.slug}`,
            lastmod: post.updatedAt || dateFallback,
          }))
      : []

    return getServerSideSitemap(sitemap)
  } catch (error) {
    console.error('Posts sitemap error:', error)
    
    // Return empty sitemap on error
    return getServerSideSitemap([])
  }
}
