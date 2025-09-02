import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// Interface for the scraped property data
interface ScrapedProperty {
  price: string
  address: string
  type: string
  link: string
  mlsNumber: string
  bedrooms: string | null
  bathrooms: string | null
  imageUrl: string
  lotArea: string | null
  photoCount: number
}

interface ScraperData {
  success: boolean
  broker: {
    agency: string | null
    areaServed: string | null
    image: string | null
  }
  propertyCount: number
  properties: ScrapedProperty[]
  timestamp: string
  scrapedAt: string
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    let scraperData: ScraperData
    try {
      scraperData = await request.json()
    } catch (_error) {
      return NextResponse.json({ error: 'Invalid JSON data' }, { status: 400 })
    }

    // Validate required fields
    if (!scraperData.success || !scraperData.properties || !Array.isArray(scraperData.properties)) {
      return NextResponse.json(
        { error: 'Invalid data format - missing required fields' },
        { status: 400 },
      )
    }

    // Get Payload instance
    const payload = await getPayload({ config })

    // Step 1: Delete all existing scraped properties (daily replacement)
    console.log('Deleting existing scraped properties...')
    const existingProperties = await payload.find({
      collection: 'scrapedProperties',
      limit: 1000,
      pagination: false,
    })

    // Delete existing properties in batches
    for (const property of existingProperties.docs) {
      await payload.delete({
        collection: 'scrapedProperties',
        id: property.id,
      })
    }

    console.log(`Deleted ${existingProperties.docs.length} existing properties`)

    // Step 2: Insert new properties
    const insertedProperties = []
    const scrapedAt = new Date(scraperData.scrapedAt || scraperData.timestamp)

    for (const property of scraperData.properties) {
      // Validate required fields for each property
      if (!property.mlsNumber || !property.price || !property.address || !property.imageUrl) {
        console.warn(`Skipping property with missing required fields:`, property)
        continue
      }

      try {
        const newProperty = await payload.create({
          collection: 'scrapedProperties',
          data: {
            mlsNumber: property.mlsNumber,
            price: property.price,
            address: property.address,
            type: property.type,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            imageUrl: property.imageUrl,
            link: property.link,
            lotArea: property.lotArea,
            photoCount: property.photoCount,
            isActive: true,
            scrapedAt: scrapedAt.toISOString(),
            rawData: JSON.parse(JSON.stringify(property)), // Store original data for debugging
          },
        })

        insertedProperties.push(newProperty)
      } catch (error) {
        console.error(`Error inserting property ${property.mlsNumber}:`, error)
        // Continue with next property instead of failing entire batch
      }
    }

    // Log summary
    console.log(
      `Successfully processed ${insertedProperties.length} properties out of ${scraperData.properties.length}`,
    )

    // Return success response
    return NextResponse.json({
      success: true,
      message: `Successfully updated ${insertedProperties.length} properties`,
      data: {
        deletedCount: existingProperties.docs.length,
        insertedCount: insertedProperties.length,
        totalReceived: scraperData.properties.length,
        scrapedAt: scrapedAt,
      },
    })
  } catch (error) {
    console.error('Error in scraped-properties API:', error)

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}

// Optional: Add GET method to retrieve scraped properties
export async function GET(_request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    const properties = await payload.find({
      collection: 'scrapedProperties',
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: '-scrapedAt',
      limit: 100,
    })

    return NextResponse.json({
      success: true,
      properties: properties.docs,
      totalCount: properties.totalDocs,
    })
  } catch (error) {
    console.error('Error fetching scraped properties:', error)

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
