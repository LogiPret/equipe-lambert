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
    <div className="relative -mt-[10.4rem] lg:h-[60rem] h-[45rem] flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_64rem_1fr] text-brandingtheme">
        <div className="col-start-1 col-span-1 lg:col-start-2 lg:col-span-1">
          <div className="mb-6 flex flex-wrap gap-2">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category
                const titleToUse = categoryTitle || 'Untitled category'
                return (
                  <Badge
                    key={index}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-brandingtheme text-sm font-medium text-brandingtheme"
                  >
                    {titleToUse}
                  </Badge>
                )
              }
              return null
            })}
          </div>

          <div className="">
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
      <div className="h-[60vh] select-none">
        {heroImage && typeof heroImage !== 'string' && (
          <Media
            fill
            priority
            imgClassName="-z-10 object-cover bg-brandingtheme-foreground"
            resource={heroImage}
          />
        )}
        <div className="absolute mb-40 pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-brandingtheme-foreground to-transparent" />
      </div>
      <div className="h-40 bg-brandingtheme-foreground absolute bottom-0 left-0 right-0" />
    </div>
  )
}
