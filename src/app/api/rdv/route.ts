import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'

export async function POST(request: Request) {
  const { name, email, datetime } = await request.json()
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const { error } = await supabase
    .from('rdv')
    .insert({ name, email, datetime })

  if (error) {
    console.error('Error inserting rdv:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'ok' })
}
