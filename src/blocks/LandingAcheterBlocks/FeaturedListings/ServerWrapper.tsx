import { InteractivePropertiesBlockComponent } from '@/blocks/InteractivePropertiesBlock/Component'
import { fetchScrapedProperties, TransformedProperty } from '@/utilities/scrapedPropertiesUtils'

interface FeaturedListingsProps {
  title?: string
  subtitle?: string
}

export const FeaturedListingsBlock: React.FC<FeaturedListingsProps> = async ({
  title = 'Inscriptions vedettes',
  subtitle,
}) => {
  // Always use latest 6 scraped properties (active, sorted by scrapedAt desc)
  const properties: TransformedProperty[] = await fetchScrapedProperties(6)

  return (
    <InteractivePropertiesBlockComponent
      title={title}
      subtitle={subtitle}
      buttonInfo=""
      props={properties}
      hoverButtonIcon="eye"
      gridColsClass="grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
    />
  )
}

export default FeaturedListingsBlock
