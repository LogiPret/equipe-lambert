#!/usr/bin/env node

/**
 * Test script for the scraped properties API endpoint
 * Usage: node test-scraper-api.js
 */

const testData = {
  success: true,
  broker: {
    agency: null,
    areaServed: null,
    image: null,
  },
  propertyCount: 3,
  properties: [
    {
      price: '$649,000',
      address: '5150, Rue Préfontaine, Laval (Auteuil)',
      type: 'House for sale',
      link: 'https://www.centris.ca/en/houses~for-sale~laval-auteuil/27301782',
      mlsNumber: '27301782',
      bedrooms: '3',
      bathrooms: '2',
      imageUrl:
        'https://mspublic.centris.ca/media.ashx?id=ADDD250DE84E052DDDDDDDDDD2&t=pi&sm=m&w=1260&h=1024',
    },
    {
      price: '$499,000',
      address: '80, Rue Prince, apt. 203, Montréal (Ville-Marie)',
      type: 'Loft / Studio for sale',
      link: 'https://www.centris.ca/en/lofts-studios~for-sale~montreal-ville-marie/10010582',
      mlsNumber: '10010582',
      bedrooms: '1',
      bathrooms: '1',
      imageUrl:
        'https://mspublic.centris.ca/media.ashx?id=ADDD250DEF5232CDDDDDDDDDDB&t=pi&sm=m&w=1260&h=1024',
    },
    {
      price: '$299,000',
      address: '416, boulevard Morin, Val-des-Sources (Asbestos)',
      type: 'House for sale',
      link: 'https://www.centris.ca/en/houses~for-sale~val-des-sources-asbestos/21879511',
      mlsNumber: '21879511',
      bedrooms: '4',
      bathrooms: '2',
      imageUrl:
        'https://mspublic.centris.ca/media.ashx?id=ADDD250DEF33995DDDDDDDDDDC&t=pi&sm=m&w=1260&h=1024',
    },
  ],
  timestamp: '2025-09-02T14:39:17.475Z',
  scrapedAt: '2025-09-02T14:39:17.476Z',
}

async function testScrapedPropertiesAPI() {
  const API_URL = process.env.API_URL || 'http://localhost:3000'
  const SCRAPER_SECRET =
    process.env.SCRAPER_SECRET || 'scraper_auth_key_2025_equipe_lambert_secure_endpoint'

  console.log('🧪 Testing Scraped Properties API...')
  console.log(`📍 API URL: ${API_URL}/api/scraped-properties`)
  console.log(`🔑 Using auth secret: ${SCRAPER_SECRET.substring(0, 10)}...`)

  try {
    const response = await fetch(`${API_URL}/api/scraped-properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SCRAPER_SECRET}`,
      },
      body: JSON.stringify(testData),
    })

    console.log(`📊 Response status: ${response.status}`)

    const responseData = await response.json()
    console.log('📋 Response data:', JSON.stringify(responseData, null, 2))

    if (response.ok) {
      console.log('✅ API test successful!')

      // Test GET endpoint
      console.log('\n🔍 Testing GET endpoint...')
      const getResponse = await fetch(`${API_URL}/api/scraped-properties`)
      const getResponseData = await getResponse.json()
      console.log('📋 GET Response:', JSON.stringify(getResponseData, null, 2))
    } else {
      console.log('❌ API test failed!')
    }
  } catch (error) {
    console.error('💥 Error testing API:', error.message)
  }
}

// Test without authentication
async function testUnauthorized() {
  const API_URL = process.env.API_URL || 'http://localhost:3000'

  console.log('\n🔒 Testing unauthorized access...')

  try {
    const response = await fetch(`${API_URL}/api/scraped-properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // No authorization header
      },
      body: JSON.stringify(testData),
    })

    console.log(`📊 Response status: ${response.status}`)
    const responseData = await response.json()
    console.log('📋 Response data:', JSON.stringify(responseData, null, 2))

    if (response.status === 401) {
      console.log('✅ Unauthorized test successful! (expected 401)')
    } else {
      console.log('❌ Expected 401 but got:', response.status)
    }
  } catch (error) {
    console.error('💥 Error testing unauthorized:', error.message)
  }
}

if (require.main === module) {
  testScrapedPropertiesAPI()
    .then(() => testUnauthorized())
    .then(() => console.log('\n🎉 All tests completed!'))
}
