'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/app/lib/supabase'
import { cliente } from './config-cliente'

type Vino = {
  id: string
  nombre: string
  cepa: string | null
  anada: number | null
  precio: number
  stock: number
}

const formVacio = { nombre: '', cepa: '', anada: '', precio: '', stock: '' }

const campo = {
  width: '100%',
  padding: '0.75rem',
  fontSize: '1rem',
  border: '2px solid #e2e8f0',
  borderRadius: '8px',
  background: 'white',
  color: '#1f2937',
} as const

export default function Home() {
  const router = useRouter()
  const [listo, setListo] = useState(false)
  const [form, setForm] = useState(formVacio)
  const [vinos, setVinos] = useState<Vino[]>([])
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace('/login')
      } else {
        setListo(true)
        cargarVinos()
      }
    })
  }, [])

  async function cargarVinos() {
    try {
      const res = await fetch(`/api/vinos?cliente=${encodeURIComponent(cliente.nombre)}`)
      const json = await res.json()
      if (json.data) setVinos(json.data)
      else if (json.error) setError(json.error)
    } catch {
      setError('No se pudieron cargar los vinos')
    }
  }

  async function cerrarSesion() {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.nombre.trim()) {
      setError('Escribí el nombre del vino')
      return
    }
    setCargando(true)
    try {
      const res = await fetch('/api/vinos', {
        method: editandoId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: editandoId, cliente: cliente.nombre }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || 'No se pudo guardar')
        return
      }
      cancelar()
      await cargarVinos()
    } catch {
      setError('No se pudo guardar')
    } finally {
      setCargando(false)
    }
  }

  function editar(v: Vino) {
    setEditandoId(v.id)
    setError('')
    setForm({
      nombre: v.nombre,
      cepa: v.cepa ?? '',
      anada: v.anada ? String(v.anada) : '',
      precio: String(v.precio),
      stock: String(v.stock),
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelar() {
    setEditandoId(null)
    setForm(formVacio)
  }

  async function eliminar(v: Vino) {
    if (!confirm(`¿Eliminar "${v.nombre}"?`)) return
    try {
      const res = await fetch(`/api/vinos?id=${v.id}`, { method: 'DELETE' })
      if (!res.ok) {
        const json = await res.json()
        setError(json.error || 'No se pudo eliminar')
        return
      }
      await cargarVinos()
    } catch {
      setError('No se pudo eliminar')
    }
  }

  function cambiar(campoNombre: keyof typeof formVacio, valor: string) {
    setForm({ ...form, [campoNombre]: valor })
  }

  if (!listo) {
    return <p style={{ textAlign: 'center', padding: '3rem', color: '#4a5568' }}>Cargando...</p>
  }

  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f0f4f8', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div className="marcas">
          <div className="logo-wrap">
            <Image src="/logo.png" alt="Logo TinoGest" width={140} height={140} priority className="logo" />
          </div>
          <span className="marcas-x">×</span>
          <Image
            src={cliente.logo}
            alt={`Logo ${cliente.nombre}`}
            width={140}
            height={140}
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>
        <h1 style={{ color: '#1a365d', fontSize: '2.5rem', margin: '1rem 0 0.5rem' }}>
          {cliente.nombre}
        </h1>
        <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>
          {cliente.rubro} — Sistema TinoGest
        </p>
        <button
          onClick={cerrarSesion}
          style={{ marginTop: '0.75rem', padding: '0.4rem 1rem', border: '1px solid #cbd5e0', background: 'white', color: '#2d3748', borderRadius: '6px', cursor: 'pointer' }}
        >
          Cerrar sesión
        </button>
      </header>

      <main
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>
          {editandoId ? 'Editar vino' : 'Agregar vino'}
        </h3>

        <form onSubmit={guardar} style={{ marginBottom: '2rem', display: 'grid', gap: '0.75rem' }}>
          <input style={campo} placeholder="Nombre del vino" value={form.nombre}
            onChange={(e) => cambiar('nombre', e.target.value)} />
          <input style={campo} placeholder="Cepa (Malbec, Syrah, Torrontés...)" value={form.cepa}
            onChange={(e) => cambiar('cepa', e.target.value)} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            <input style={campo} type="number" placeholder="Añada" value={form.anada}
              onChange={(e) => cambiar('anada', e.target.value)} />
            <input style={campo} type="number" placeholder="Precio $" min="0" value={form.precio}
              onChange={(e) => cambiar('precio', e.target.value)} />
            <input style={campo} type="number" placeholder="Stock" min="0" value={form.stock}
              onChange={(e) => cambiar('stock', e.target.value)} />
          </div>

          {error && <p style={{ color: '#c53030', fontSize: '0.95rem' }}>{error}</p>}

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="submit"
              disabled={cargando}
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: cargando ? '#cbd5e0' : cliente.colorPrincipal,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: cargando ? 'not-allowed' : 'pointer',
              }}
            >
              {cargando ? 'Guardando...' : editandoId ? 'Guardar cambios' : 'Agregar vino'}
            </button>
            {editandoId && (
              <button
                type="button"
                onClick={cancelar}
                style={{
                  padding: '0.75rem 1.25rem',
                  background: '#edf2f7',
                  color: '#2d3748',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>Catálogo y stock</h3>
        {vinos.length === 0 ? (
          <p style={{ color: '#718096', textAlign: 'center' }}>Aún no hay vinos cargados</p>
        ) : (
          vinos.map((v) => (
            <div
              key={v.id}
              style={{
                padding: '0.75rem 0',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <p style={{ margin: '0 0 0.25rem 0', color: '#1f2937', fontWeight: 600 }}>{v.nombre}</p>
                <small style={{ color: '#718096' }}>
                  {[v.cepa, v.anada].filter(Boolean).join(' · ')}
                  {' — '}
                  {Number(v.precio).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                </small>
                <br />
                <small style={{ color: v.stock <= 10 ? '#c53030' : '#2f855a', fontWeight: 600 }}>
                  Stock: {v.stock} botellas{v.stock <= 10 ? ' (bajo)' : ''}
                </small>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => editar(v)}
                  style={{ padding: '0.4rem 0.9rem', border: '1px solid #cbd5e0', background: 'white', color: '#2d3748', borderRadius: '6px', cursor: 'pointer' }}>
                  Editar
                </button>
                <button onClick={() => eliminar(v)}
                  style={{ padding: '0.4rem 0.9rem', border: '1px solid #feb2b2', background: '#fff5f5', color: '#c53030', borderRadius: '6px', cursor: 'pointer' }}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  )
}