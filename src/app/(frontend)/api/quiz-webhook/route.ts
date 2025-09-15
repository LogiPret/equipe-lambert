import { NextRequest, NextResponse } from 'next/server'

interface QuizSubmissionData {
  firstname: string | null
  lastname: string | null
  phone: string | null
  email: string | null
  budget: number | null
  when_interested: string | null
  type_property: string | null
  area_wanted: string | null
}

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming data
    const submissionData: QuizSubmissionData = await request.json()

    console.log('[Quiz Webhook Proxy] Received data:', submissionData)

    // Forward to n8n webhook
    const n8nResponse = await fetch(
      'https://n8n-wwfb.onrender.com/webhook/equipe-lambert/meta-ads',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      },
    )

    console.log('[Quiz Webhook Proxy] n8n response status:', n8nResponse.status)

    // Always try to get the response text for debugging
    let responseText = ''
    try {
      responseText = await n8nResponse.text()
    } catch (textError) {
      console.error('[Quiz Webhook Proxy] Could not read response text:', textError)
      responseText = 'Could not read response'
    }

    if (!n8nResponse.ok) {
      console.error('[Quiz Webhook Proxy] n8n error response:', responseText)
      return NextResponse.json(
        {
          error: 'Failed to send to n8n webhook',
          details: responseText,
          status: n8nResponse.status,
        },
        { status: 200 }, // Return 200 to avoid blocking user, log the actual error
      )
    }

    console.log('[Quiz Webhook Proxy] n8n success:', responseText)

    return NextResponse.json({
      success: true,
      message: 'Quiz submission sent to n8n successfully',
      n8nResponse: responseText,
    })
  } catch (error) {
    console.error('[Quiz Webhook Proxy] Error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 200 }, // Return 200 to avoid blocking user, log the actual error
    )
  }
}
