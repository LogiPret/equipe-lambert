import { NextRequest, NextResponse } from 'next/server'
import { sendContactFormEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { submissionData, origin, destination, n8nWebhookUrl } = body

    if (!submissionData || !Array.isArray(submissionData)) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
    }

    // Convert array data to object
    const formData: { [key: string]: string } = {}
    submissionData.forEach((field: { name: string; value: string }) => {
      formData[field.name] = field.value
    })

    // Validate required fields
    const firstName =
      formData.prenom || formData.firstname || formData.firstName || formData.first_name
    const lastName = formData.nom || formData.lastname || formData.lastName || formData.last_name

    if (!firstName || !lastName) {
      return NextResponse.json({ error: 'Missing required name fields' }, { status: 400 })
    }

    // Build payload
    const dynamicPayload: Record<string, any> = {}
    const fieldNameMappings: Record<string, string> = { projectType: 'type' }

    Object.keys(formData).forEach((key) => {
      const value = formData[key]
      if (value && value.trim() !== '') {
        dynamicPayload[fieldNameMappings[key] || key] = value
      }
    })

    if (origin) dynamicPayload.origin = origin

    // Send to n8n webhook if configured
    if (destination === 'n8n' && n8nWebhookUrl) {
      try {
        const n8nResponse = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dynamicPayload),
        })

        if (!n8nResponse.ok) {
          const responseText = await n8nResponse.text()
          return NextResponse.json(
            { error: 'n8n webhook failed', details: responseText },
            { status: 500 },
          )
        }
      } catch (n8nError: any) {
        return NextResponse.json(
          { error: 'n8n webhook request failed', details: n8nError?.message },
          { status: 500 },
        )
      }
    } else {
      // Send via email
      try {
        await sendContactFormEmail(dynamicPayload, origin)
      } catch (error: any) {
        console.error('[Contact] Email failed | Data:', JSON.stringify(dynamicPayload))
      }
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('[Contact] Error:', error?.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
