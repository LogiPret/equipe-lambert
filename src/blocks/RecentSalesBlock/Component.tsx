import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import { ScrollAnimation } from '@/components/scroll-animations'
import type { Media } from '@/payload-types'

interface Sale {
  image: Media | string
  address: string
  soldPrice: string
  daysOnMarket: number
}

interface RecentSalesBlockProps {
  title?: string
  subtitle?: string
  sales?: Sale[]
}

export default function RecentSalesBlock({ title, subtitle, sales }: RecentSalesBlockProps) {
  const validSales = Array.isArray(sales) ? sales : []

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#0f3046] h-1 w-24 mb-6"></div>
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">{title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-3 gap-8">
          {validSales.map((sale, index) => {
            const imageUrl =
              typeof sale.image === 'object' && sale.image?.url
                ? sale.image.url
                : '/placeholder.svg'

            return (
              <ScrollAnimation key={index} animation="slideUp" delay={300 + index * 200}>
                <Card className="overflow-hidden border border-gray-200 hover:shadow-lg transition-all">
                  <Image
                    src={imageUrl}
                    alt={sale.address}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-emerald-600 text-white">VENDU</Badge>
                      <div className="text-sm text-gray-500">{sale.daysOnMarket} jours</div>
                    </div>
                    <p className="text-gray-600 mb-4 flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-[#0f3046]" />
                      {sale.address}
                    </p>
                    <div className="text-center">
                      <div className="text-gray-600 text-sm mb-1">Prix de vente:</div>
                      <div className="font-bold text-emerald-600 text-xl">{sale.soldPrice}</div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            )
          })}
        </div>
      </div>
    </section>
  )
}
