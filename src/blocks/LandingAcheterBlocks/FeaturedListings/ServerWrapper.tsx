import { InteractivePropertiesBlockComponent } from '@/blocks/InteractivePropertiesBlock/Component'
import { getPayload } from 'payload'
import config from '@payload-config'
import { TransformedProperty, mapPropertyType } from '@/utilities/scrapedPropertiesUtils'

interface FeaturedListingsProps {
  title?: string
  subtitle?: string
  selectedProperties: string[] | { id: string }[]
}

// Minimal helper to normalize relationship values to ids
function toIds(input: FeaturedListingsProps['selectedProperties']): string[] {
  if (!Array.isArray(input)) return []
  return input.map((v: any) => (typeof v === 'string' ? v : v?.id)).filter(Boolean)
}

export const FeaturedListingsBlock: React.FC<FeaturedListingsProps> = async ({
  title = 'Inscriptions vedettes',
  subtitle,
  selectedProperties,
}) => {
  const ids = toIds(selectedProperties).slice(0, 4)
  let properties: TransformedProperty[] = []

  if (ids.length === 0) {
    return (
      <InteractivePropertiesBlockComponent
        title={title}
        subtitle={subtitle}
        buttonInfo=""
        props={[]}
        hoverButtonIcon="eye"
      />
    )
  }

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'scrapedProperties',
      where: {
        id: { in: ids },
        isActive: { equals: true },
      },
      limit: 4,
      pagination: false,
    })

    properties = result.docs.map((property: any) => {
      const beds = parseInt(property.bedrooms || '0', 10) || 0
      const baths = parseInt(property.bathrooms || '0', 10) || 0
      const price = Number((property.price || '').replace(/[^\d]/g, '')) || 0

      let sqft: string
      const lotArea = property.lotArea
      if (lotArea && typeof lotArea === 'string' && lotArea.trim() !== '' && lotArea !== 'null') {
        const cleaned = lotArea.includes(',')
          ? lotArea
          : (() => {
              const n = parseInt(lotArea.replace(/[^\d]/g, ''), 10)
              return isNaN(n) ? '' : n.toLocaleString()
            })()
        sqft = cleaned || '0'
      } else {
        // fallback simple estimate similar to utils
        const base = 500
        sqft = (base + beds * 200 + Math.floor(price / 1000)).toLocaleString()
      }

      return {
        id: property.id.toString(),
        image: property.imageUrl,
        price,
        address: property.address,
        beds,
        baths,
        sqft,
        propType: mapPropertyType(property.type),
        propStatus: 'a_vendre',
        description: `${property.type} à ${property.address.split(',').slice(-1)[0]?.trim() || 'Québec'}`,
        url: property.link,
        photoCount: property.photoCount || undefined,
      }
    })
  } catch (e) {
    console.error('FeaturedListings: fetch error', e)
  }

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
