import { NextRequest, NextResponse } from 'next/server'
import { sendContactFormEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  console.log('[Contact Form API] Starting POST request processing')

  try {
    const body = await request.json()
    console.log('[Contact Form API] Received body:', JSON.stringify(body, null, 2))

    // Extract form data and configuration from the request
    const { submissionData, origin, destinationTable, destination, n8nWebhookUrl } = body
    console.log('[Contact Form API] Extracted fields:', {
      submissionData: submissionData?.length || 'undefined',
      origin,
      destinationTable,
      destination,
      n8nWebhookUrl: n8nWebhookUrl ? '***PROVIDED***' : 'undefined',
    })

    if (!submissionData || !Array.isArray(submissionData)) {
      console.error('[Contact Form API] Invalid form data - not array:', submissionData)
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
    }

    // Convert array data to object
    const formData: { [key: string]: string } = {}
    submissionData.forEach((field: { name: string; value: string }) => {
      formData[field.name] = field.value
    })

    console.log('[Contact Form API] Converted form data:', JSON.stringify(formData, null, 2))
    console.log('[Contact Form API] Form data keys:', Object.keys(formData))
    console.log('[Contact Form API] Form data values:', Object.values(formData))

    // Validate required fields - be flexible with field names
    console.log('[Contact Form API] Validating required fields...')

    // Get first name from various possible field names
    const firstName =
      formData.prenom || formData.firstname || formData.firstName || formData.first_name
    // Get last name from various possible field names
    const lastName = formData.nom || formData.lastname || formData.lastName || formData.last_name
    // Email is optional for some forms (like vendre), so we won't require it universally
    const email = formData.email || formData.Email

    // Basic validation - at least require name fields
    if (!firstName || !lastName) {
      console.error('[Contact Form API] Missing required name fields:', {
        firstName: firstName ? 'present' : 'MISSING',
        lastName: lastName ? 'present' : 'MISSING',
        email: email ? 'present' : 'not provided (may be optional)',
      })
      return NextResponse.json({ error: 'Missing required name fields' }, { status: 400 })
    }
    console.log('[Contact Form API] Required fields validation passed')

    // Prepare data for database insertion - use only the fields provided in the form
    const targetTable = destinationTable || 'david_lambert_form_submissions'
    console.log('[Contact Form API] Target table:', targetTable)

    // Build dynamic payload using only the form fields that were actually submitted
    const dynamicPayload: Record<string, any> = {}

    // Map field names to match database schema
    const fieldNameMappings: Record<string, string> = {
      projectType: 'type', // Map projectType to type for compatibility
    }

    // Add form fields as they are (preserving original field names or using mappings)
    Object.keys(formData).forEach((key) => {
      const value = formData[key]
      if (value && value.trim() !== '') {
        // Use mapped field name if available, otherwise use original
        const mappedKey = fieldNameMappings[key] || key
        dynamicPayload[mappedKey] = value
      }
    })

    // Add optional metadata fields if available
    if (origin) {
      dynamicPayload.origin = origin
    }

    // Only add created_at for specific tables that we know have this column
    const tablesWithCreatedAt = ['david_lambert_form_submissions']
    if (tablesWithCreatedAt.includes(targetTable)) {
      dynamicPayload.created_at = new Date().toISOString()
    }

    console.log('[Contact Form API] Dynamic payload for email:', dynamicPayload)

    let result = null
    let n8nResult = null

    // Send to n8n webhook if configured
    if (destination === 'n8n' && n8nWebhookUrl) {
      console.log('[Contact Form API] Sending to n8n webhook...')

      // Prepare dynamic payload for n8n using actual form data
      const n8nPayload: Record<string, any> = {}

      // Add all form fields to n8n payload (preserving original field names)
      Object.keys(formData).forEach((key) => {
        const value = formData[key]
        if (value && value.trim() !== '') {
          n8nPayload[key] = value
        }
      })

      // Add origin if available
      if (origin) {
        n8nPayload.origin = origin
      }

      console.log('[Contact Form API] Sending to n8n:', n8nWebhookUrl, n8nPayload)

      try {
        const n8nResponse = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(n8nPayload),
        })

        console.log('[Contact Form API] n8n response status:', n8nResponse.status)

        let responseText = ''
        try {
          responseText = await n8nResponse.text()
          console.log('[Contact Form API] n8n response text:', responseText)
        } catch (_err) {
          responseText = 'Could not read response'
          console.log('[Contact Form API] Could not read n8n response text')
        }

        n8nResult = {
          status: n8nResponse.status,
          response: responseText,
          success: n8nResponse.ok,
        }
        console.log('[Contact Form API] n8n webhook result:', n8nResult)

        if (!n8nResponse.ok) {
          console.error('[Contact Form API] n8n webhook failed with status:', n8nResponse.status)
          return NextResponse.json(
            { error: 'n8n webhook submission failed', details: responseText },
            { status: 500 },
          )
        }
      } catch (n8nError) {
        console.error('[Contact Form API] n8n webhook error:', n8nError)
        return NextResponse.json(
          {
            error: 'n8n webhook request failed',
            details: n8nError instanceof Error ? n8nError.message : 'Unknown error',
          },
          { status: 500 },
        )
      }
    } else {
      // Default: Send via email only
      console.log('[Contact Form API] Sending via email...')

      // Send email asynchronously (don't wait for it to complete)
      sendContactFormEmail(dynamicPayload, origin)
        .then((emailResult) => {
          console.log('[Contact Form API] Email sent successfully:', emailResult.messageId)
        })
        .catch((emailError) => {
          console.error('[Contact Form API] Email sending failed:', emailError)
        })

      // Return success immediately without waiting for email
      result = {
        success: true,
        method: 'email',
        status: 'queued', // Indicates email is being sent in background
      }
      console.log('[Contact Form API] Email queued for sending')
    }

    console.log('[Contact Form API] Form submission completed successfully')
    return NextResponse.json(
      {
        success: true,
        data: result,
        n8n: n8nResult,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('[Contact Form API] Critical error during processing:', error)
    console.error(
      '[Contact Form API] Error stack:',
      error instanceof Error ? error.stack : 'No stack trace',
    )
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
