import { InteractivePropertiesBlockComponent } from './Component'
import {
  fetchScrapedProperties,
  mockProperties,
  TransformedProperty,
} from '@/utilities/scrapedPropertiesUtils'

interface InteractivePropertiesBlockProps {
  title?: string
  subtitle?: string
  buttonInfo: string
  props?: TransformedProperty[] // CMS properties (if any)
  calculatorBlockId?: string
  hoverButtonIcon?: 'eye' | 'external-link' | 'arrow-right' | 'plus' | 'heart'
  useScrapedData?: boolean
}

export const InteractivePropertiesBlock: React.FC<InteractivePropertiesBlockProps> = async ({
  title,
  subtitle,
  buttonInfo,
  props: cmsProperties,
  calculatorBlockId,
  hoverButtonIcon,
  useScrapedData = true,
}) => {
  let properties: TransformedProperty[] = []

  if (useScrapedData) {
    // Try to fetch scraped properties first
    try {
      const scrapedProperties = await fetchScrapedProperties(12)

      if (scrapedProperties.length > 0) {
        properties = scrapedProperties
        console.log(`Using ${scrapedProperties.length} scraped properties`)
      } else {
        // Fall back to CMS properties or mock data
        properties = cmsProperties && cmsProperties.length > 0 ? cmsProperties : mockProperties
        console.log('No scraped properties found, using fallback data')
      }
    } catch (error) {
      console.error('Error fetching scraped properties, using fallback:', error)
      properties = cmsProperties && cmsProperties.length > 0 ? cmsProperties : mockProperties
    }
  } else {
    // Use CMS properties or mock data
    properties = cmsProperties && cmsProperties.length > 0 ? cmsProperties : mockProperties
  }

  return (
    <InteractivePropertiesBlockComponent
      title={title}
      subtitle={subtitle}
      buttonInfo={buttonInfo}
      props={properties}
      calculatorBlockId={calculatorBlockId}
      hoverButtonIcon={hoverButtonIcon}
    />
  )
}

export default InteractivePropertiesBlock
