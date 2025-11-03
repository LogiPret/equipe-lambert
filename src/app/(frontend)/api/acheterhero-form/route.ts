import { NextRequest, NextResponse } from 'next/server'
import { sendContactFormEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Extract form data from the request
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
    if (!formData.prenom || !formData.nom || !formData.phone || !formData.email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Prepare email data
    const emailData = {
      prenom: formData.prenom,
      nom: formData.nom,
      email: formData.email,
      phone: formData.phone,
      type: 'ACHETER',
      'Type de propriété': formData.acheter_propertyType || 'Non spécifié',
      'Ville recherchée': formData.acheter_city || 'Non spécifié',
    }

    // Send email asynchronously
    sendContactFormEmail(emailData, 'Formulaire Acheter')
      .then(() => {
        console.log('[Acheter Form API] Email sent successfully')
      })
      .catch((error) => {
        console.error('[Acheter Form API] Email sending failed:', error)
      })

    // Return success immediately
    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error('AcheterHero form submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
