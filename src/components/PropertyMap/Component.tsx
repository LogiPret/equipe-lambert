'use client'

import { useEffect, useRef } from 'react'

interface PropertyLocation {
  lat: number
  lng: number
  title: string
  price: string
  status: string
}

interface PropertyMapProps {
  properties: Array<{
    id: number
    address: string
    price: string
    status: string
    type: string
  }>
}

declare global {
  interface Window {
    L: any
  }
}

export default function PropertyMap({ properties }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  const propertyLocations: PropertyLocation[] = [
    {
      lat: 45.5152,
      lng: -73.5795,
      title: '123 Rue Saint-Denis',
      price: '$875,000',
      status: 'À vendre',
    },
    {
      lat: 45.5088,
      lng: -73.5878,
      title: '456 Avenue du Parc',
      price: '$650,000',
      status: 'À vendre',
    },
    {
      lat: 46.8139,
      lng: -71.208,
      title: '789 Boulevard René-Lévesque',
      price: '$725,000',
      status: 'Vendu',
    },
    {
      lat: 45.5048,
      lng: -73.5772,
      title: '321 Rue Sherbrooke',
      price: '$950,000',
      status: 'À vendre',
    },
    {
      lat: 46.9334,
      lng: -71.3102,
      title: '555 Chemin du Lac',
      price: '$1,200,000',
      status: 'À vendre',
    },
    {
      lat: 45.5017,
      lng: -73.5673,
      title: '888 Rue de la Commune',
      price: '$580,000',
      status: 'À vendre',
    },
  ]

  const focusProperty = (index: number) => {
    if (mapInstanceRef.current && propertyLocations[index]) {
      const location = propertyLocations[index]
      mapInstanceRef.current.setView([location.lat, location.lng], 15)

      // Open the popup for this marker
      if (markersRef.current[index]) {
        markersRef.current[index].openPopup()
      }
    }
  }

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.L) return

      // Initialize the map
      const map = window.L.map(mapRef.current).setView([45.5017, -73.5673], 9)

      // Add OpenStreetMap tiles
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      mapInstanceRef.current = map

      // Custom icons for different property statuses
      const availableIcon = window.L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 24px; 
            height: 24px; 
            background-color: #0f3046; 
            border: 3px solid white; 
            border-radius: 50%; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      const soldIcon = window.L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 24px; 
            height: 24px; 
            background-color: #6B7280; 
            border: 3px solid white; 
            border-radius: 50%; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      // Add property markers
      markersRef.current = propertyLocations.map((location, index) => {
        const marker = window.L.marker([location.lat, location.lng], {
          icon: location.status === 'À vendre' ? availableIcon : soldIcon,
        }).addTo(map)

        const popupContent = `
          <div style="padding: 12px; min-width: 220px; font-family: system-ui, -apple-system, sans-serif;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #111827;">${location.title}</h3>
            <p style="margin: 0 0 6px 0; font-size: 18px; color: #0f3046; font-weight: 700;">${location.price}</p>
            <div style="display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500; 
                       background-color: ${location.status === 'À vendre' ? '#DBEAFE' : '#F3F4F6'}; 
                       color: ${location.status === 'À vendre' ? '#0f3046' : '#6B7280'};">
              ${location.status}
            </div>
          </div>
        `

        marker.bindPopup(popupContent)
        return marker
      })

      // Add service area circles
      const serviceAreas = [
        { center: [45.5017, -73.5673], radius: 30000, name: 'Montréal', color: '#0f3046' },
        { center: [45.6066, -73.7124], radius: 18000, name: 'Laval', color: '#059669' },
        { center: [45.5312, -73.5185], radius: 22000, name: 'Longueuil', color: '#DC2626' },
      ]

      serviceAreas.forEach((area) => {
        window.L.circle(area.center, {
          color: area.color,
          fillColor: area.color,
          fillOpacity: 0.08,
          weight: 2,
          opacity: 0.4,
          radius: area.radius,
        }).addTo(map)
      })
    }

    // Load Leaflet CSS and JS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
      link.crossOrigin = ''
      document.head.appendChild(link)
    }

    if (!window.L) {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
      script.crossOrigin = ''
      script.onload = initMap
      document.head.appendChild(script)
    } else {
      initMap()
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return <div ref={mapRef} className="w-full h-96 bg-gray-100 rounded-lg"></div>
}
