import type { Post } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import BlogCarouselComponent from './Component'

interface BlogCarouselBlockProps {
  title: string
  subtitle: string
  collection: 'posts'
  postsLimit?: number
}

export default async function BlogCarouselBlock(props: BlogCarouselBlockProps) {
  const { title, subtitle, collection, postsLimit } = props

  const limit = postsLimit || 6
  let posts: Post[] = []

  try {
    const payload = await getPayload({ config: configPromise })

    const fetchedPosts = await payload.find({
      collection: collection || 'posts',
      depth: 2,
      limit,
      where: {
        _status: {
          equals: 'published',
        },
      },
      sort: '-publishedAt',
    })

    posts = fetchedPosts.docs || []
  } catch (error) {
    console.error('Error fetching posts for BlogCarouselBlock:', error)
    posts = []
  }

  return <BlogCarouselComponent title={title} subtitle={subtitle} posts={posts} />
}
