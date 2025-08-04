import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    return NextResponse.json({
      hasSupabaseUrl: !!supabaseUrl && supabaseUrl !== 'your-supabase-url',
      hasSupabaseKey: !!supabaseKey && supabaseKey !== 'your-supabase-key',
      supabaseUrlPreview: supabaseUrl ? supabaseUrl.slice(0, 20) + '...' : 'not set',
      supabaseKeyPreview: supabaseKey ? supabaseKey.slice(0, 10) + '...' : 'not set',
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to check environment' }, { status: 500 })
  }
}
