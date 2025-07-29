import type { Block } from 'payload'

export const BlogCarouselBlock: Block = {
  slug: 'blogCarousel',
  labels: {
    singular: 'Blog Carousel Block',
    plural: 'Blog Carousel Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Carousel Title',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      label: 'Carousel Description',
    },
    {
      name: 'collection',
      type: 'select',
      required: true,
      label: 'Posts Collection',
      options: [
        {
          label: 'Posts',
          value: 'posts',
        },
      ],
      defaultValue: 'posts',
    },
    {
      name: 'postsLimit',
      type: 'number',
      required: false,
      label: 'Number of Posts to Display',
      defaultValue: 6,
      min: 3,
      max: 12,
    },
  ],
}
