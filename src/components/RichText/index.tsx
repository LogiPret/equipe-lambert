import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { ButtonBlock } from '@/blocks/Button/Component'
import { TableByColumnsBlock } from '@/blocks/TableByColumns/Component'
import BlogInlineCTA from '@/blocks/BlogInlineCTA/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  TableByColumnsBlock as TableByColumnsBlockProps,
} from '@/payload-types'

// Local type definition for ButtonBlock until payload-types is regenerated
interface ButtonBlockProps {
  text: string
  size?: 'sm' | 'default' | 'lg' | 'xl'
  link: {
    type?: 'custom' | 'reference' | null
    newTab?: boolean | null
    reference?: {
      relationTo: 'pages' | 'posts'
      value: any
    } | null
    url?: string | null
    appearance?: 'default' | 'outline'
  }
}
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | ButtonBlockProps
      | TableByColumnsBlockProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    button: ({ node }: { node: SerializedBlockNode<ButtonBlockProps> }) => (
      <ButtonBlock {...node.fields} />
    ),
    tableByColumns: ({ node }: { node: SerializedBlockNode<TableByColumnsBlockProps> }) => (
      <TableByColumnsBlock {...node.fields} />
    ),
    blogInlineCTA: ({ node }: { node: SerializedBlockNode<any> }) => (
      <BlogInlineCTA {...(node as any).fields} />
    ),
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
