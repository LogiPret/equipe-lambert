import { NextRequest, NextResponse } from 'next/server'
import { sendContactFormEmail } from '@/lib/email'
import { sendPopupFormSMS } from '@/lib/sms'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('[Popup Form API] Received body:', JSON.stringify(body, null, 2))

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
      console.error('[Popup Form API] Invalid form data format received:', body)
      return NextResponse.json(
        { error: 'Invalid form data', details: 'Expected object or submissionData[]' },
        { status: 400 },
      )
    }

    console.log('[Popup Form API] Parsed form data:', formData)
    console.log('[Popup Form API] Available fields:', Object.keys(formData))

    // Extract all available fields
    const firstname = formData.firstname || formData.prenom || formData.firstName || ''
    const lastname = formData.lastname || formData.nom || formData.lastName || ''
    const email = formData.email || formData.Email || ''
    const phone = formData.phone || formData.telephone || ''

    // Validate required fields
    if (!phone) {
      console.error('[Popup Form API] Missing required phone number')
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
    }

    // Send SMS to the user who filled the form (with PDF link)
    console.log('[Popup Form API] Sending SMS to user:', phone)
    sendPopupFormSMS(phone)
      .then((smsResult: any) => {
        console.log('[Popup Form API] SMS sent to user successfully:', smsResult.sid)
      })
      .catch((smsError: any) => {
        console.error('[Popup Form API] SMS sending failed:', smsError)
      })

    // Send email notification to site owner (new lead notification)
    console.log('[Popup Form API] Sending lead notification email to site owner')

    // Build lead data with all available information
    const leadData: Record<string, any> = {
      'Type de lead': 'Publicité Facebook',
      Téléphone: phone,
    }

    // Only add fields that have values
    if (firstname) leadData['Prénom'] = firstname
    if (lastname) leadData['Nom'] = lastname
    if (email) leadData['Email'] = email
    if (formData.pageslug) leadData['Page'] = formData.pageslug
    if (formData.pdfname) leadData['PDF'] = formData.pdfname

    console.log('[Popup Form API] Lead data being sent:', leadData)

    sendContactFormEmail(leadData, 'Publicité Facebook')
      .then((emailResult) => {
        console.log('[Popup Form API] Lead notification email sent:', emailResult.messageId)
      })
      .catch((emailError) => {
        console.error('[Popup Form API] Lead notification email failed:', emailError)
      })

    // Return success immediately
    console.log('[Popup Form API] Popup form processed successfully')
    return NextResponse.json(
      {
        success: true,
        message: 'Merci! Vous allez recevoir le PDF par SMS dans quelques instants.',
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('[Popup Form API] Error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
