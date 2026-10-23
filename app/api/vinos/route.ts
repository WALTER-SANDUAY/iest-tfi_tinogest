import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Crea un cliente de Supabase que actúa "como el usuario que inició sesión".
// Así las reglas de seguridad (RLS) de la base se aplican a cada pedido.
function clienteSupabase(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return null
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  )
}

const sinSesion = () =>
  NextResponse.json({ error: 'Necesitás iniciar sesión' }, { status: 401 })

// Busca el id del negocio por nombre (solo encuentra el propio, por las reglas RLS)
async function obtenerClienteId(supabase: any, nombre: string | null) {
  if (!nombre) return null
  const { data } = await supabase
    .from('clientes')
    .select('id')
    .eq('nombre', nombre)
    .maybeSingle()
  return data?.id ?? null
}

// Valida y ordena los datos que llegan del formulario
function validar(body: any) {
  const nombre = String(body.nombre ?? '').trim()
  if (!nombre) return { error: 'El nombre es obligatorio' }

  const precio = Number(body.precio)
  if (isNaN(precio) || precio < 0) return { error: 'El precio no es válido' }

  const stock = Number(body.stock)
  if (!Number.isInteger(stock) || stock < 0) {
    return { error: 'El stock debe ser un número entero, 0 o más' }
  }

  const anada =
    body.anada === '' || body.anada == null ? null : Number(body.anada)
  if (anada !== null && (!Number.isInteger(anada) || anada < 1900 || anada > 2100)) {
    return { error: 'La añada no es válida' }
  }

  const cepa = String(body.cepa ?? '').trim() || null
  return { valores: { nombre, cepa, anada, precio, stock } }
}

// LISTAR: /api/vinos?cliente=La Dionisia
export async function GET(request: Request) {
  const supabase = clienteSupabase(request)
  if (!supabase) return sinSesion()

  const { searchParams } = new URL(request.url)
  const clienteId = await obtenerClienteId(supabase, searchParams.get('cliente'))
  if (!clienteId) {
    return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 })
  }

  const { data, error } = await supabase
    .from('vinos')
    .select('*')
    .eq('cliente_id', clienteId)
    .order('creado_en', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

// AGREGAR
export async function POST(request: Request) {
  const supabase = clienteSupabase(request)
  if (!supabase) return sinSesion()

  const body = await request.json()
  const clienteId = await obtenerClienteId(supabase, body.cliente)
  if (!clienteId) {
    return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 })
  }

  const { valores, error: errorValidacion } = validar(body)
  if (errorValidacion) {
    return NextResponse.json({ error: errorValidacion }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('vinos')
    .insert([{ ...valores, cliente_id: clienteId }])
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

// EDITAR
export async function PUT(request: Request) {
  const supabase = clienteSupabase(request)
  if (!supabase) return sinSesion()

  const body = await request.json()
  if (!body.id) {
    return NextResponse.json({ error: 'Falta el id' }, { status: 400 })
  }

  const { valores, error: errorValidacion } = validar(body)
  if (errorValidacion) {
    return NextResponse.json({ error: errorValidacion }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('vinos')
    .update(valores)
    .eq('id', body.id)
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

// ELIMINAR: /api/vinos?id=...
export async function DELETE(request: Request) {
  const supabase = clienteSupabase(request)
  if (!supabase) return sinSesion()

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'Falta el id' }, { status: 400 })
  }

  const { error } = await supabase.from('vinos').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}