import { getPayload } from 'payload'
import config from '@payload-config'

// Interface for the transformed property data used by the Interactive Block
export interface TransformedProperty {
  id: string
  image: string | { url?: string; alt?: string }
  price: number
  address: string
  beds: number
  baths: number
  sqft: string
  propType:
    | 'maison'
    | 'condo'
    | 'townhouse'
    | 'loft'
    | 'duplex'
    | 'triplex'
    | 'quadruplex'
    | 'immeuble'
    | 'chalet'
    | 'commerce'
  propStatus: 'a_vendre' | 'vendu' | 'option_achat'
  description?: string
  url?: string
  photoCount?: number
}

// Function to map Centris property types to our internal types
export function mapPropertyType(centrisType: string): TransformedProperty['propType'] {
  const type = centrisType.toLowerCase()

  if (type.includes('house') || type.includes('maison')) return 'maison'
  if (type.includes('condo') || type.includes('apartment')) return 'condo'
  if (type.includes('townhouse') || type.includes('town house')) return 'townhouse'
  if (type.includes('loft') || type.includes('studio')) return 'loft'
  if (type.includes('duplex')) return 'duplex'
  if (type.includes('triplex')) return 'triplex'
  if (type.includes('quadruplex')) return 'quadruplex'
  if (type.includes('income') || type.includes('multi') || type.includes('building'))
    return 'immeuble'
  if (type.includes('cottage') || type.includes('chalet')) return 'chalet'
  if (type.includes('commercial') || type.includes('business')) return 'commerce'

  // Default fallback
  return 'maison'
}

// Function to extract numeric price from string
function extractPrice(priceString: string): number {
  // Remove $ and commas, then parse
  const cleaned = priceString.replace(/[$,]/g, '')
  const price = parseInt(cleaned, 10)
  return isNaN(price) ? 0 : price
}

// Function to generate estimated square footage based on property type and price
function estimateSquareFeet(price: number, type: string, beds: number): string {
  // Basic estimation logic - you can refine this
  let baseSize = 1000

  if (type.includes('condo') || type.includes('loft')) {
    baseSize = 800
  } else if (type.includes('townhouse')) {
    baseSize = 1200
  } else if (type.includes('duplex') || type.includes('triplex')) {
    baseSize = 1500
  }

  // Add size based on bedrooms
  const bedroomSize = beds * 200

  // Add size based on price (rough estimation)
  const priceSize = Math.floor(price / 1000)

  const estimatedSize = baseSize + bedroomSize + priceSize

  return estimatedSize.toLocaleString()
}

export async function fetchScrapedProperties(limit: number = 12): Promise<TransformedProperty[]> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'scrapedProperties',
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: '-scrapedAt',
      limit: limit,
    })

    // Transform scraped properties to match the expected interface
    const transformedProperties: TransformedProperty[] = result.docs.map((property) => {
      const beds = parseInt(property.bedrooms || '0', 10) || 0
      const baths = parseInt(property.bathrooms || '0', 10) || 0
      const price = extractPrice(property.price)

      // Use lotArea if available, otherwise estimate square feet
      let sqft: string
      if (property.lotArea && property.lotArea !== 'null' && property.lotArea.trim() !== '') {
        // Clean and format the lotArea string
        const cleanedLotArea = property.lotArea.toString().trim()
        // If it already has commas for formatting, keep them
        // If it's just a number, add commas for readability
        if (cleanedLotArea.includes(',')) {
          sqft = cleanedLotArea
        } else {
          // Add commas to large numbers
          const numericValue = parseInt(cleanedLotArea.replace(/[^\d]/g, ''), 10)
          if (!isNaN(numericValue) && numericValue > 0) {
            sqft = numericValue.toLocaleString()
          } else {
            sqft = estimateSquareFeet(price, property.type, beds)
          }
        }
      } else {
        // Fall back to estimation if no lotArea
        sqft = estimateSquareFeet(price, property.type, beds)
      }

      return {
        id: property.id.toString(),
        image: property.imageUrl,
        price: price,
        address: property.address,
        beds: beds,
        baths: baths,
        sqft: sqft,
        propType: mapPropertyType(property.type),
        propStatus: 'a_vendre', // All scraped properties are for sale
        description: `${property.type} à ${property.address.split(',').slice(-1)[0]?.trim() || 'Montréal'}`,
        url: property.link,
        photoCount: property.photoCount || undefined,
      }
    })

    return transformedProperties
  } catch (error) {
    console.error('Error fetching scraped properties:', error)
    return [] // Return empty array on error
  }
}

// Fallback mock data (same as before, for when scraped data is unavailable)
export const mockProperties: TransformedProperty[] = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop&crop=house',
    price: 650000,
    address: '123 Rue Saint-Denis, Montréal',
    beds: 3,
    baths: 2,
    sqft: '1,850',
    propType: 'maison',
    propStatus: 'a_vendre',
    description: 'Magnifique maison familiale dans un quartier recherché',
    url: 'https://expquebec.com/en/brokers/david-lambert/',
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&crop=apartment',
    price: 425000,
    address: '456 Ave du Parc, Montréal',
    beds: 2,
    baths: 1,
    sqft: '1,200',
    propType: 'condo',
    propStatus: 'a_vendre',
    description: 'Condo moderne avec vue sur le parc',
    url: 'https://expquebec.com/en/brokers/david-lambert/',
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop&crop=townhouse',
    price: 750000,
    address: '789 Rue Sherbrooke, Westmount',
    beds: 4,
    baths: 3,
    sqft: '2,400',
    propType: 'townhouse',
    propStatus: 'a_vendre',
    description: 'Maison de ville luxueuse avec garage',
    url: 'https://expquebec.com/en/brokers/david-lambert/',
  },
]
