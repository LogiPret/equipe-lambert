import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-key'

// Only create client if we have real environment variables
const shouldCreateClient =
  supabaseUrl !== 'your-supabase-url' && supabaseKey !== 'your-supabase-key'

export const supabase = shouldCreateClient ? createClient(supabaseUrl, supabaseKey) : null

// Define the type for contact form data
export interface ContactFormData {
  prenom: string
  nom: string
  email: string
  phone: string
  type: string
  vendre_address?: string // Property address for selling forms
  vendre_delais?: string // New optional field for selling timeframe
  created_at?: string
}

// Function to insert contact form submission into Supabase
export async function insertContactSubmission(data: ContactFormData) {
  try {
    if (!supabase) {
      console.warn('Supabase client not initialized - environment variables not set')
      return null
    }

    const { data: result, error } = await supabase
      .from('david_lambert_form_submissions')
      .insert([
        {
          prenom: data.prenom,
          nom: data.nom,
          email: data.email,
          phone: data.phone,
          type: data.type,
          vendre_address: data.vendre_address || null, // Include property address
          vendre_delais: data.vendre_delais || null, // Include the new field
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
