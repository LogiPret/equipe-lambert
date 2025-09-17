import { NextRequest, NextResponse } from 'next/server'

// Use the same default endpoint as the quiz webhook, with env override if provided
const N8N_WEBHOOK_URL =
  (process.env.N8N_WEBHOOK_URL || '').trim() ||
  'https://n8n-wwfb.onrender.com/webhook/equipe-lambert/meta-ads'

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
      console.error('[Popup Webhook Proxy] Invalid form data format received:', body)
      // Return 200 to avoid blocking UX (match quiz behavior)
      return NextResponse.json(
        { error: 'Invalid form data', details: 'Expected object or submissionData[]' },
        { status: 200 },
      )
    }

    // For compatibility with quiz behavior, do not hard-require context fields.
    // Proceed even if pageslug/pdfname are missing and avoid blocking UX.
    if (!N8N_WEBHOOK_URL) {
      console.error('[Popup Webhook Proxy] N8N_WEBHOOK_URL missing and no default set')
      // Still return 200 to avoid breaking UX; caller shows success UI independently
      return NextResponse.json({ warning: 'Server not configured' }, { status: 200 })
    }

    // Prepare payload for n8n: only include visible form fields, lowercase keys
    const payload: Record<string, any> = {}
    if (formData.firstname != null) payload.firstname = formData.firstname
    if (formData.lastname != null) payload.lastname = formData.lastname
    if (formData.phone != null) payload.phone = formData.phone
    if (formData.email != null) payload.email = formData.email

    console.log('[Popup Webhook Proxy] Received data:', payload)

    // Normalize URL to match quiz's production webhook suffix when missing
    const needsMetaSuffix =
      (N8N_WEBHOOK_URL.includes('/webhook/') || N8N_WEBHOOK_URL.includes('/webhook-test/')) &&
      N8N_WEBHOOK_URL.includes('/equipe-lambert') &&
      !N8N_WEBHOOK_URL.endsWith('/meta-ads')
    const targetUrl = needsMetaSuffix
      ? N8N_WEBHOOK_URL.replace(/\/$/, '') + '/meta-ads'
      : N8N_WEBHOOK_URL

    // Send to n8n webhook
    console.log('[Popup Webhook Proxy] Using n8n URL:', targetUrl)
    const res = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    console.log('[Popup Webhook Proxy] n8n response status:', res.status)

    let responseText = ''
    try {
      responseText = await res.text()
    } catch (_err) {
      responseText = 'Could not read response'
    }

    // If using a test webhook and it returns 404 (not executing), retry against production webhook automatically
    if (res.status === 404 && targetUrl.includes('/webhook-test/')) {
      let prodUrl = targetUrl.replace('/webhook-test/', '/webhook/')
      if (!prodUrl.endsWith('/meta-ads')) {
        prodUrl = prodUrl.replace(/\/$/, '') + '/meta-ads'
      }
      console.warn(
        '[Popup Webhook Proxy] Test webhook returned 404. Retrying against production webhook:',
        prodUrl,
      )
      const retry = await fetch(prodUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      console.log('[Popup Webhook Proxy] n8n retry response status:', retry.status)
      try {
        responseText = await retry.text()
      } catch (_err) {
        responseText = 'Could not read response'
      }
      if (retry.ok) {
        console.log('[Popup Webhook Proxy] n8n success (retry):', responseText)
        return NextResponse.json(
          {
            success: true,
            message: 'Popup submission sent to n8n successfully (retry to production)',
            n8nResponse: responseText,
          },
          { status: 200 },
        )
      }
      // If retry also failed, continue to error handling below with the last responseText
    }

    if (!res.ok) {
      console.error('[Popup Webhook Proxy] n8n error response:', responseText)
      // Return 200 to avoid blocking UX (match quiz behavior), but include details
      return NextResponse.json(
        { error: 'Failed to send to n8n webhook', details: responseText, status: res.status },
        { status: 200 },
      )
    }

    console.log('[Popup Webhook Proxy] n8n success:', responseText)
    return NextResponse.json(
      {
        success: true,
        message: 'Popup submission sent to n8n successfully',
        n8nResponse: responseText,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('[Popup Webhook Proxy] Error:', error)
    // Return 200 to avoid blocking UX, but include error details for logs
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 200 },
    )
  }
}
