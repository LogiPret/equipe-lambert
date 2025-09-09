import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Equipe Lambert Website',
  images: [
    {
      url: `${getServerSideURL()}/equipelambert_logo.png`,
    },
  ],
  siteName: 'Equipe Lambert',
  title: 'Equipe Lambert',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
