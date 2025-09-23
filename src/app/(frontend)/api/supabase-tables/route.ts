import { NextRequest, NextResponse } from 'next/server'
import { fetchSupabaseTables } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const tables = await fetchSupabaseTables()
    return NextResponse.json({ success: true, tables }, { status: 200 })
  } catch (error) {
    console.error('Error fetching Supabase tables:', error)
    return NextResponse.json({ error: 'Failed to fetch tables' }, { status: 500 })
  }
}
