import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { fallbackPostsSitemap } from '@/lib/fallback-sitemap'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  try {
    // Set a timeout for the database query
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Database query timeout')), 10000),
    )

    const payload = await getPayload({ config })
    let SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://www.equipelambert.ca'

    // Add https:// if missing
    if (SITE_URL && !SITE_URL.startsWith('http')) {
      SITE_URL = `https://${SITE_URL}`
    }

    const queryPromise = payload.find({
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

    // Race the query against the timeout
    const results = (await Promise.race([queryPromise, timeout])) as any

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((post: any) => Boolean(post?.slug))
          .map((post: any) => ({
            loc: `${SITE_URL}/posts/${post?.slug}`,
            lastmod: post.updatedAt || dateFallback,
          }))
      : []

    return getServerSideSitemap(sitemap)
  } catch (error) {
    console.error('Posts sitemap error:', error)

    // Return fallback sitemap on error
    return getServerSideSitemap(fallbackPostsSitemap)
  }
}
