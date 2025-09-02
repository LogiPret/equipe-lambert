/**
 * Fallback sitemap data in case the database is unavailable
 */

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.equipelambert.ca'

export const fallbackPagesSitemap = [
  { loc: `${SITE_URL}/`, lastmod: new Date().toISOString() },
  { loc: `${SITE_URL}/search`, lastmod: new Date().toISOString() },
  { loc: `${SITE_URL}/posts`, lastmod: new Date().toISOString() },
  { loc: `${SITE_URL}/acheter`, lastmod: new Date().toISOString() },
  { loc: `${SITE_URL}/vendre`, lastmod: new Date().toISOString() },
  { loc: `${SITE_URL}/contact-acheter`, lastmod: new Date().toISOString() },
  { loc: `${SITE_URL}/contact-vendre`, lastmod: new Date().toISOString() },
]

export const fallbackPostsSitemap = [
  // Empty array as fallback for posts - they are too dynamic to hardcode
]
