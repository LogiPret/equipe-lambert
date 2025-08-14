import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { Badge } from '@/components/ui/badge'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative -mt-[10.4rem] flex h-[80vh] items-end">
      {heroImage && typeof heroImage !== 'string' && (
        <Media
          fill
          priority
          imgClassName="-z-10 object-cover bg-brandingtheme-foreground"
          resource={heroImage}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brandingtheme-foreground via-brandingtheme-foreground/60 to-transparent" />
      <div className="container relative z-10 pb-20 text-brandingtheme lg:grid lg:grid-cols-[1fr_64rem_1fr]">
        <div className="col-start-1 col-span-1 lg:col-start-2 lg:col-span-1">
          <div className="mb-6 flex flex-wrap gap-2">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category
                const titleToUse = categoryTitle || 'Untitled category'
                return (
                  <Badge
                    key={index}
                    className="inline-flex items-center gap-2 rounded-full border border-brandingtheme bg-white/10 px-4 py-2 text-sm font-medium text-brandingtheme backdrop-blur-sm"
                  >
                    {titleToUse}
                  </Badge>
                )
              }
              return null
            })}
          </div>

          <div>
            <h1 className="mb-6 text-5xl lg:text-7xl">{title}</h1>
          </div>

          <div className="flex flex-row flex-wrap items-start gap-6 md:gap-16">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Auteur</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date de publication</p>

                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
