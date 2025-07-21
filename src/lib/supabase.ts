import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Define the type for contact form data
export interface ContactFormData {
  prenom: string
  nom: string
  email: string
  phone: string
  type: string
  created_at?: string
}

// Function to insert contact form submission into Supabase
export async function insertContactSubmission(data: ContactFormData) {
  try {
    const { data: result, error } = await supabase
      .from('david_lambert_form_submissions')
      .insert([
        {
          prenom: data.prenom,
          nom: data.nom,
          email: data.email,
          phone: data.phone,
          type: data.type,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('Error inserting contact submission:', error)
      throw error
    }

    console.log('Contact submission saved to Supabase:', result)
    return result
  } catch (error) {
    console.error('Failed to save contact submission to Supabase:', error)
    throw error
  }
}
