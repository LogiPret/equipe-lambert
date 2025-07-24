import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

// Real Estate Custom Blocks
import HeroBlock from '@/blocks/HeroBlock/Component'
import StatsBlock from '@/blocks/StatsBlock/Component'
import ServicesBlock from '@/blocks/ServicesBlock/Component'
import TeamBlock from '@/blocks/TeamBlock/Component'
import PropertiesBlock from '@/blocks/PropertiesBlock/Component'
import TestimonialsBlock from '@/blocks/TestimonialsBlock/Component'
import CTABannerBlock from '@/blocks/CTABannerBlock/Component'
import ContactBlock from '@/blocks/ContactBlock/Component'
import HeaderBlock from '@/blocks/HeaderBlock/Component'
import FooterBlock from '@/blocks/FooterBlock/Component'
import MapSectionBlock from '@/blocks/MapSectionBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  // Real Estate Custom Blocks
  hero: HeroBlock,
  stats: StatsBlock,
  services: ServicesBlock,
  team: TeamBlock,
  properties: PropertiesBlock,
  testimonials: TestimonialsBlock,
  ctaBanner: CTABannerBlock,
  contact: ContactBlock,
  header: HeaderBlock,
  footer: FooterBlock,
  mapSectionBlock: MapSectionBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              // Remove all spacing for now - will add back selectively later
              return (
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
