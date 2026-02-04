import { NextRequest, NextResponse } from 'next/server'
import { sendContactFormEmail } from '@/lib/email'

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
    const submissionData: QuizSubmissionData = await request.json()

    // Prepare email data
    const emailData: Record<string, any> = {
      prenom: submissionData.firstname || 'Non spécifié',
      nom: submissionData.lastname || 'Non spécifié',
      email: submissionData.email || 'Non spécifié',
      phone: submissionData.phone || 'Non spécifié',
      type: 'Quiz Lead',
      Budget: submissionData.budget ? `$${submissionData.budget.toLocaleString()}` : 'Non spécifié',
      'Délai souhaité': submissionData.when_interested || 'Non spécifié',
      'Type de propriété': submissionData.type_property || 'Non spécifié',
      'Secteur recherché': submissionData.area_wanted || 'Non spécifié',
    }

    // Send email notification
    try {
      await sendContactFormEmail(emailData, 'Quiz Meta Ads')
    } catch (error: any) {
      console.error('[Quiz] Email failed | Data:', JSON.stringify(emailData))
    }

    // Forward to n8n webhook
    const n8nResponse = await fetch(
      'https://n8n-wwfb.onrender.com/webhook/equipe-lambert/meta-ads',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      },
    )

    if (!n8nResponse.ok) {
      const responseText = await n8nResponse.text()
      console.error('[Quiz] n8n failed:', responseText)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('[Quiz] Error:', error?.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 200 })
  }
}
