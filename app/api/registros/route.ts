import { supabase } from '@/app/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { titulo, descripcion } = await request.json()

  const { data, error } = await supabase
    .from('registros')
    .insert([{ titulo, descripcion }])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function GET() {
  const { data, error } = await supabase
    .from('registros')
    .select('*')
    .order('creado_en', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}