import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  // Use Équipe Lambert logo as default instead of Payload template
  let url = serverUrl + '/equipelambert_logo.png'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  type?: 'page' | 'post'
}): Promise<Metadata> => {
  const { doc, type } = args

  const ogImage = getImageURL(doc?.meta?.image)

  let title: string
  if (doc?.meta?.title) {
    // Only add "| Équipe Lambert" for posts
    // Pages and homepage use only the admin panel title
    title = type === 'post' ? `${doc.meta.title} | Équipe Lambert` : doc.meta.title
  } else {
    title = 'Équipe Lambert - Courtiers Immobiliers Montréal'
  }

  const description =
    doc?.meta?.description ||
    'Équipe Lambert - Courtiers immobiliers professionnels à Montréal. Achat, vente et accompagnement personnalisé pour tous vos projets immobiliers.'

  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      title,
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
      type: type === 'post' ? 'article' : 'website',
      siteName: 'Équipe Lambert',
    }),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    // Additional meta tags for better SEO
    other: {
      'og:locale': 'fr_CA',
      'og:region': 'QC',
      'og:country-name': 'Canada',
    },
  }
}
