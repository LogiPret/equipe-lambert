import { NextRequest, NextResponse } from 'next/server'

const RAW_N8N_URL = process.env.N8N_WEBHOOK_URL
const N8N_WEBHOOK_URL = RAW_N8N_URL
  ? (() => {
      const base = RAW_N8N_URL.replace(/\/$/, '')
      return base.endsWith('/lead-blog') ? base : `${base}/lead-blog`
    })()
  : undefined

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Support both direct object payloads and FormBuilder-like { submissionData: [] }
    let formData: any = {}

    if (body && body.submissionData && Array.isArray(body.submissionData)) {
      // Handle FormBuilder format (like other forms)
      body.submissionData.forEach((field: any) => {
        const fieldName = field.field || field.name
        const fieldValue = field.value

        if (fieldName && fieldValue !== undefined) {
          formData[fieldName] = fieldValue
        }
      })
    } else if (body && typeof body === 'object') {
      // Handle direct object format (from popup form)
      formData = body
    } else {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
    }

    // Validate required fields
    if (
      !formData.pageslug ||
      !formData.pdfname ||
      !formData.firstname ||
      !formData.lastname ||
      !formData.phone
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!N8N_WEBHOOK_URL) {
      console.error('N8N_WEBHOOK_URL env var missing')
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    }

    // Prepare payload for n8n
    const payload = {
      pageSlug: formData.pageslug,
      pdfName: formData.pdfname,
      firstName: formData.firstname,
      lastName: formData.lastname,
      phone: formData.phone,
    }

    // Send to n8n webhook
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('n8n webhook failed', res.status, text)
      return NextResponse.json({ error: 'Failed to send to n8n' }, { status: 502 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Popup form submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
