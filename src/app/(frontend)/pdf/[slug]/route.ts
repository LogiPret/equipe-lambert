import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const payload = await getPayload({ config })

    // Find the PDF by slug
    const pdfs = await payload.find({
      collection: 'pdf',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    if (!pdfs.docs.length) {
      return new NextResponse('PDF not found', { status: 404 })
    }

    const pdf = pdfs.docs[0]

    if (!pdf.url) {
      return new NextResponse('PDF URL not available', { status: 404 })
    }

    // If the URL is already a full URL (blob storage), redirect to it
    if (pdf.url.startsWith('http')) {
      return NextResponse.redirect(pdf.url)
    }

    // If it's a relative URL, construct the full URL and redirect
    if (pdf.url.startsWith('/')) {
      const origin = request.nextUrl.origin
      const fullUrl = `${origin}${pdf.url}`
      return NextResponse.redirect(fullUrl)
    }

    return new NextResponse('Invalid PDF URL', { status: 404 })
  } catch (error) {
    console.error('Error serving PDF:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
