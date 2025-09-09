import React, { Fragment } from 'react'
import { QuizFormBlock } from '@/blocks/LandingCommonBlocks/QuizFormBlock/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

// Client-side version of RenderBlocks for popups
// Only includes blocks that are safe for client-side rendering
const clientBlockComponents = {
  quizForm: QuizFormBlock,
  content: ContentBlock,
  mediaBlock: MediaBlock,
}

export const ClientRenderBlocks: React.FC<{
  blocks: any[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in clientBlockComponents) {
            const Block = clientBlockComponents[blockType as keyof typeof clientBlockComponents]

            if (Block) {
              // Create unique ID for each block instance
              const blockId = `${blockType}-${index}`

              return (
                <div key={index} id={blockId}>
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
