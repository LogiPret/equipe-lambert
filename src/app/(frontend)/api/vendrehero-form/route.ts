import { NextRequest, NextResponse } from 'next/server'
import { insertContactSubmission, type ContactFormData } from '@/lib/supabase'

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
    if (!formData.prenom || !formData.nom || !formData.email || !formData.phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Prepare data for Supabase
    const supabaseData: ContactFormData = {
      prenom: formData.prenom,
      nom: formData.nom,
      email: formData.email,
      phone: formData.phone,
      type: 'VENDRE',
      vendre_address: formData.vendre_address || undefined,
      vendre_delais: formData.vendre_delais || undefined,
    }

    // Insert into Supabase
    const result = await insertContactSubmission(supabaseData)

    // Check if Supabase submission was successful
    if (!result.success) {
      console.warn(`Supabase submission failed: ${result.reason}`)
      // Still return success since form was processed, just log the issue
    }

    return NextResponse.json({ success: true, data: result }, { status: 200 })
  } catch (error) {
    console.error('VendreHero form submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
