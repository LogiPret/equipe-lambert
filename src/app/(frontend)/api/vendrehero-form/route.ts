import { NextRequest, NextResponse } from 'next/server'
import { sendContactFormEmail } from '@/lib/email'

// Store pending email promises to ensure they complete even if user navigates away
const pendingEmails: Promise<any>[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { submissionData } = body

    if (!submissionData || !Array.isArray(submissionData)) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
    }

    // Convert submission data to object format
    const formData: any = {}
    submissionData.forEach((field: any) => {
      const fieldName = field.field || field.name
      const fieldValue = field.value
      if (fieldName && fieldValue !== undefined) {
        formData[fieldName] = fieldValue
      }
    })

    // Validate required fields
    if (!formData.prenom || !formData.nom || !formData.email || !formData.phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Prepare email data
    const emailData = {
      prenom: formData.prenom,
      nom: formData.nom,
      email: formData.email,
      phone: formData.phone,
      type: 'VENDRE',
      'Adresse de la propriété': formData.vendre_address || 'Non spécifié',
      'Délais de vente': formData.vendre_delais || 'Non spécifié',
    }

    // Send email - await to ensure it completes before response
    try {
      await sendContactFormEmail(emailData, 'Formulaire Vendre')
    } catch (error: any) {
      console.error('[Vendre] Email failed | Data:', JSON.stringify(emailData))
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('[Vendre] Error:', error?.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
