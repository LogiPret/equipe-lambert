import type { CollectionConfig } from 'payload'

export const ScrapedProperties: CollectionConfig = {
  slug: 'scrapedProperties',
  admin: {
    useAsTitle: 'address',
    defaultColumns: ['address', 'price', 'type', 'isActive', 'scrapedAt'],
    description: 'Properties automatically scraped from Centris',
  },
  access: {
    read: () => true, // Public read access for frontend
    create: ({ req: { user } }) => Boolean(user), // Only authenticated users can create
    update: ({ req: { user } }) => Boolean(user), // Only authenticated users can update
    delete: ({ req: { user } }) => Boolean(user), // Only authenticated users can delete
  },
  fields: [
    {
      name: 'mlsNumber',
      type: 'text',
      label: 'MLS Number',
      required: true,
      unique: true,
      admin: {
        description: 'Unique MLS identifier from Centris',
      },
    },
    {
      name: 'price',
      type: 'text',
      label: 'Price',
      required: true,
      admin: {
        description: 'Price as scraped from Centris (e.g., "$649,000")',
      },
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
      required: true,
    },
    {
      name: 'type',
      type: 'text',
      label: 'Property Type',
      required: true,
      admin: {
        description: 'Type as scraped from Centris (e.g., "House for sale")',
      },
    },
    {
      name: 'bedrooms',
      type: 'text',
      label: 'Bedrooms',
      admin: {
        description: 'Number of bedrooms (can be null from scraper)',
      },
    },
    {
      name: 'bathrooms',
      type: 'text',
      label: 'Bathrooms',
      admin: {
        description: 'Number of bathrooms (can be null from scraper)',
      },
    },
    {
      name: 'lotArea',
      type: 'text',
      label: 'Lot Area',
      admin: {
        description: 'Lot area in square feet (can be null from scraper)',
      },
    },
    {
      name: 'photoCount',
      type: 'number',
      label: 'Photo Count',
      admin: {
        description: 'Number of photos available for this property',
      },
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Image URL',
      required: true,
      admin: {
        description: 'Direct URL to property image from Centris',
      },
    },
    {
      name: 'link',
      type: 'text',
      label: 'Centris Link',
      required: true,
      admin: {
        description: 'Link to the property on Centris website',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active',
      defaultValue: true,
      admin: {
        description: 'Whether this property should be displayed on the website',
      },
    },
    {
      name: 'scrapedAt',
      type: 'date',
      label: 'Scraped At',
      required: true,
      admin: {
        description: 'When this property was last scraped from Centris',
        date: {
          displayFormat: 'yyyy-MM-dd HH:mm:ss',
        },
      },
    },
    {
      name: 'rawData',
      type: 'json',
      label: 'Raw Scraped Data',
      admin: {
        description: 'Original data from scraper for debugging',
        readOnly: true,
      },
    },
  ],
  timestamps: true,
}
