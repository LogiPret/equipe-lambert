import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { Button } from '../../blocks/Button/config'

// Real Estate Custom Blocks
import { HeroBlock } from '../../blocks/HeroBlock/config'
import { StatsBlock } from '../../blocks/HomePageBlocks/StatsBlock/config'
import { ServicesBlock } from '../../blocks/HomePageBlocks/ServicesBlock/config'
import { TeamBlock } from '../../blocks/HomePageBlocks/TeamBlock/config'
import { PropertiesBlock } from '../../blocks/HomePageBlocks/PropertiesBlock/config'
import { TestimonialsBlock } from '../../blocks/HomePageBlocks/TestimonialsBlock/config'
import { CTABannerBlock } from '../../blocks/CTABannerBlock/config'
import { ContactBlock } from '../../blocks/HomePageBlocks/ContactBlock/config'
import { HeaderBlock } from '../../blocks/HeaderBlock/config'
import { FooterBlock } from '../../blocks/FooterBlock/config'
import { MapSectionBlock } from '../../blocks/HomePageBlocks/MapSectionBlock/config'
import { BlogCarouselBlock } from '../../blocks/HomePageBlocks/BlogCarouselBlock/config'
import { VendreHeroBlock } from '../../blocks/LandingVendreBlocks/VendreHeroBlock/config'
import { WhyChooseUsBlock } from '../../blocks/LandingVendreBlocks/WhyChooseUsBlock/config'
import { SellingProcessBlock } from '../../blocks/SellingProcessBlock/config'

import { hero } from '@/heros/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                Button,
                // Real Estate Custom Blocks
                HeroBlock,
                StatsBlock,
                ServicesBlock,
                TeamBlock,
                PropertiesBlock,
                TestimonialsBlock,
                CTABannerBlock,
                ContactBlock,
                HeaderBlock,
                FooterBlock,
                MapSectionBlock,
                BlogCarouselBlock,
                VendreHeroBlock,
                WhyChooseUsBlock,
                SellingProcessBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
