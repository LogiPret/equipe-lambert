import { NextRequest, NextResponse } from 'next/server'
import { sendContactFormEmail } from '@/lib/email'
import { sendPopupFormSMS } from '@/lib/sms'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Support both direct object payloads and FormBuilder-like { submissionData: [] }
    let formData: any = {}

    if (body && body.submissionData && Array.isArray(body.submissionData)) {
      body.submissionData.forEach((field: any) => {
        const fieldName = field.field || field.name
        const fieldValue = field.value
        if (fieldName && fieldValue !== undefined) {
          formData[fieldName] = fieldValue
        }
      })
    } else if (body && typeof body === 'object') {
      formData = body
    } else {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
    }

    const firstname = formData.firstname || formData.prenom || formData.firstName || ''
    const lastname = formData.lastname || formData.nom || formData.lastName || ''
    const email = formData.email || formData.Email || ''
    const phone = formData.phone || formData.telephone || ''

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
    }

    // Build lead data
    const leadData: Record<string, any> = {
      'Type de lead': 'Publicité Facebook',
      Téléphone: phone,
    }
    if (firstname) leadData['Prénom'] = firstname
    if (lastname) leadData['Nom'] = lastname
    if (email) leadData['Email'] = email
    if (formData.pageslug) leadData['Page'] = formData.pageslug
    if (formData.pdfname) leadData['PDF'] = formData.pdfname

    // Send SMS and Email in parallel
    const [smsResult, emailResult] = await Promise.allSettled([
      sendPopupFormSMS(phone),
      sendContactFormEmail(leadData, 'Publicité Facebook'),
    ])

    if (smsResult.status === 'rejected') {
      console.error('[Popup] SMS failed | Phone:', phone)
    }
    if (emailResult.status === 'rejected') {
      console.error('[Popup] Email failed | Data:', JSON.stringify(leadData))
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Merci! Vous allez recevoir le PDF par SMS dans quelques instants.',
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error('[Popup] Error:', error?.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
