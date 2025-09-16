import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

// Real Estate Custom Blocks
import HeroBlock from '@/blocks/HeroBlock/Component'
import StatsBlock from '@/blocks/HomePageBlocks/StatsBlock/Component'
import ServicesBlock from '@/blocks/HomePageBlocks/ServicesBlock/Component'
import TeamBlock from '@/blocks/HomePageBlocks/TeamBlock/Component'
import PropertiesBlock from '@/blocks/HomePageBlocks/PropertiesBlock/Component'
import TestimonialsBlock from '@/blocks/HomePageBlocks/TestimonialsBlock/Component'
import CTABannerBlock from '@/blocks/CTABannerBlock/Component'
import BannerCTAScrollBlock from '@/blocks/BannerCTAScrollBlock/Component'
import ContactBlock from '@/blocks/HomePageBlocks/ContactBlock/Component'
import HeaderBlock from '@/blocks/HeaderBlock/Component'
import FooterBlock from '@/blocks/FooterBlock/Component'
import MapSectionBlock from '@/blocks/HomePageBlocks/MapSectionBlock/Component'
import ButtonBlock from '@/blocks/Button/Component'
import BlogCarouselBlock from '@/blocks/HomePageBlocks/BlogCarouselBlock/ServerComponent'
import WhyChooseUsBlock from '@/blocks/LandingCommonBlocks/WhyChooseUsBlock/Component'
import LandingProcessBlock from '@/blocks/LandingCommonBlocks/LandingProcessBlock/Component'
import LandingFAQBlock from '@/blocks/LandingCommonBlocks/LandingFAQBlock/Component'
import MortgageCalculatorBlock from '@/blocks/LandingAcheterBlocks/MortgageCalculatorBlock/Component'
import { LandingCTABlockComponent } from '@/blocks/LandingCommonBlocks/LandingCTABlock/Component'
import { LandingResourceBlockComponent } from '@/blocks/LandingCommonBlocks/LandingResourceBlock/Component'
import EvaluationGratuiteBlock from './LandingVendreBlocks/EvaluationGratuiteBlock/Component'
import LandingHeroBlock from '@/blocks/LandingCommonBlocks/LandingHeroBlock/Component'
import InteractivePropertiesBlock from '@/blocks/InteractivePropertiesBlock/ServerWrapper'
import FeaturedListingsBlock from '@/blocks/LandingAcheterBlocks/FeaturedListings/ServerWrapper'
import { TableByColumnsBlock } from '@/blocks/TableByColumns/Component'
import { TableByRowsBlock } from '@/blocks/TableByRows/Component'
import BlogInlineCTA from '@/blocks/BlogInlineCTA/Component'
import { QuizFormBlock } from '@/blocks/LandingCommonBlocks/QuizFormBlock/Component'
// import { QuizFormBlock } from '@/blocks/LandingCommonBlocks/QuizFormBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  hero: HeroBlock,
  stats: StatsBlock,
  services: ServicesBlock,
  team: TeamBlock,
  properties: PropertiesBlock,
  testimonials: TestimonialsBlock,
  ctaBanner: CTABannerBlock,
  bannerCTAScroll: BannerCTAScrollBlock,
  contact: ContactBlock,
  header: HeaderBlock,
  footer: FooterBlock,
  mapSectionBlock: MapSectionBlock,
  button: ButtonBlock,
  blogCarousel: BlogCarouselBlock,
  whyChooseUs: WhyChooseUsBlock,
  landingProcess: LandingProcessBlock,
  landingFAQBlock: LandingFAQBlock,
  blogInlineCTA: BlogInlineCTA,
  mortgageCalculator: MortgageCalculatorBlock,
  vendreWhyChooseUs: WhyChooseUsBlock,
  landingCTA: LandingCTABlockComponent,
  resourceBlock: LandingResourceBlockComponent,
  evaluationGratuite: EvaluationGratuiteBlock,
  landingHero: LandingHeroBlock,
  interactivePropBlock: InteractivePropertiesBlock,
  featuredListings: FeaturedListingsBlock,
  tableByColumns: TableByColumnsBlock,
  tableByRows: TableByRowsBlock,
  quizForm: QuizFormBlock,
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
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              // Create unique ID for each block instance
              const blockId = `${blockType}-${index}`

              // Remove all spacing for now - will add back selectively later
              return (
                <div key={index} id={blockId} data-block-type={blockType} data-block-index={index}>
                  {/* @ts-expect-error Block component props mismatch with server component types */}
                  <Block {...block} blockId={blockId} disableInnerContainer />
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
