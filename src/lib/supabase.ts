import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Factory function to create Supabase client
function createSupabaseClient(): SupabaseClient | null {
  if (
    !supabaseUrl ||
    !supabaseKey ||
    supabaseUrl === 'your-supabase-url' ||
    supabaseKey === 'your-supabase-key'
  ) {
    console.warn('Supabase environment variables not properly configured')
    return null
  }
  return createClient(supabaseUrl, supabaseKey)
}

// Create the client instance
export const supabase = createSupabaseClient()

// Helper function to check if Supabase is available
export function isSupabaseAvailable(): boolean {
  return supabase !== null
}

// Define the type for contact form data
export interface ContactFormData {
  prenom: string
  nom: string
  email: string
  phone: string
  type: string
  vendre_address?: string // Property address for selling forms
  vendre_delais?: string // Selling timeframe for selling forms
  acheter_propertyType?: string // Property type for buying forms
  acheter_city?: string // Preferred city for buying forms
  created_at?: string
}

// Function to insert contact form submission into Supabase
export async function insertContactSubmission(data: ContactFormData) {
  try {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase is not available - skipping database insertion')
      return { success: false, reason: 'Supabase not configured' }
    }

    const { data: result, error } = await supabase!
      .from('david_lambert_form_submissions')
      .insert([
        {
          prenom: data.prenom,
          nom: data.nom,
          email: data.email,
          phone: data.phone,
          type: data.type,
          vendre_address: data.vendre_address || null, // Include property address for selling
          vendre_delais: data.vendre_delais || null, // Include selling timeframe
          acheter_propertyType: data.acheter_propertyType || null, // Include property type for buying
          acheter_city: data.acheter_city || null, // Include preferred city for buying
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('Error inserting contact submission:', error)
      throw error
    }

    console.log('Contact submission saved to Supabase:', result)
    return { success: true, data: result }
  } catch (error) {
    console.error('Failed to save contact submission to Supabase:', error)
    throw error
  }
}

// ==========================
// Equipe Lambert: Acheter Form
// ==========================

export interface AcheterFormRow {
  firstname?: string | null
  lastname?: string | null
  phone?: string | null
  email?: string | null
  budget?: number | null
  when_interested?: string | null
  type_property?: string | null
  area_wanted?: string | null
}

export async function insertAcheterFormSubmission(row: AcheterFormRow) {
  try {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase is not available - skipping database insertion')
      return { success: false, reason: 'Supabase not configured' }
    }

    const payload = {
      firstname: row.firstname ?? null,
      lastname: row.lastname ?? null,
      phone: row.phone ?? null,
      email: row.email ?? null,
      budget: row.budget ?? null,
      when_interested: row.when_interested ?? null,
      type_property: row.type_property ?? null,
      area_wanted: row.area_wanted ?? null,
    }

    // Debug: print the supabase insert payload
    console.log(
      '[Supabase] INSERT equipe_lambert_landing_acheter_form payload:',
      JSON.parse(JSON.stringify(payload)),
    )

    const { data: result, error } = await supabase!
      .from('equipe_lambert_landing_acheter_form')
      .insert([payload])
      .select()

    if (error) {
      console.error('Error inserting acheter form submission:', error)
      throw error
    }

    console.log('[Supabase] INSERT result:', result)
    return { success: true, data: result }
  } catch (error) {
    console.error('Failed to save acheter form to Supabase:', error)
    throw error
  }
}
