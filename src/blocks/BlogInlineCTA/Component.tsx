import React from 'react'
import { CMSLink } from '@/components/Link'

// Local type until payload-types are regenerated
interface BlogInlineCTAProps {
  headline: string
  description?: string | null
  link: {
    type?: 'reference' | 'custom' | 'archive' | null
    newTab?: boolean | null
    reference?: {
      relationTo: 'pages' | 'posts'
      value: any
    } | null
    url?: string | null
    archive?: 'posts' | null
    label?: string | null
    appearance?: 'default' | 'outline' | null
  }
}

const BlogInlineCTA: React.FC<BlogInlineCTAProps> = ({ headline, description, link }) => {
  return (
    <div className="container my-10 text-center border border-brandingtheme p-8 rounded-[0.5rem]">
      <div className="flex flex-col gap-4 md:gap-6 max-w-[64rem]">
        <h3 className="text-4xl md:text-6xl font-bold text-brandingtheme">{headline}</h3>
        {description ? (
          <p className="text-brandingtheme leading-relaxed text-2xl">{description}</p>
        ) : null}
        <div className="pt-2">
          <CMSLink
            appearance="default"
            label={link.label || 'Learn more'}
            newTab={link.newTab}
            reference={link.reference as any}
            type={link.type || 'reference'}
            url={link.url}
            archive={link.archive || null}
            size="xl"
          />
        </div>
      </div>
    </div>
  )
}

export default BlogInlineCTA
