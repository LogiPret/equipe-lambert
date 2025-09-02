// Ensure SITE_URL always has https protocol
let SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://www.equipelambert.ca'

// Add https:// if missing
if (SITE_URL && !SITE_URL.startsWith('http')) {
  SITE_URL = `https://${SITE_URL}`
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: false, // Disable automatic robots.txt generation
  generateIndexSitemap: false, // Disable automatic sitemap generation completely
  exclude: ['/**'], // Exclude everything from automatic generation
}
