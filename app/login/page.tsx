'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/app/lib/supabase'
import { cliente } from '../config-cliente'

const campo = {
  width: '100%',
  padding: '0.75rem',
  fontSize: '1rem',
  border: '2px solid #e2e8f0',
  borderRadius: '8px',
  background: 'white',
  color: '#1f2937',
} as const

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  // Si ya hay una sesión iniciada, va directo al catálogo
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/')
    })
  }, [router])

  async function ingresar(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setCargando(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: clave,
    })
    setCargando(false)
    if (error) {
      setError('Email o contraseña incorrectos')
      return
    }
    router.replace('/')
  }

  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f0f4f8', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div className="marcas">
          <div className="logo-wrap">
            <Image src="/logo.png" alt="Logo TinoGest" width={120} height={120} priority className="logo" />
          </div>
          <span className="marcas-x">×</span>
          <Image src={cliente.logo} alt={`Logo ${cliente.nombre}`} width={120} height={120} priority style={{ objectFit: 'contain' }} />
        </div>
        <h1 style={{ color: '#1a365d', fontSize: '2rem', margin: '1rem 0 0.5rem' }}>{cliente.nombre}</h1>
        <p style={{ color: '#4a5568' }}>Ingresá para gestionar tu negocio</p>
      </header>

      <main style={{ maxWidth: '420px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <form onSubmit={ingresar} style={{ display: 'grid', gap: '0.75rem' }}>
          <input style={campo} type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
          <input style={campo} type="password" placeholder="Contraseña" value={clave}
            onChange={(e) => setClave(e.target.value)} required />
          {error && <p style={{ color: '#c53030', fontSize: '0.95rem' }}>{error}</p>}
          <button type="submit" disabled={cargando}
            style={{ padding: '0.75rem', backgroundColor: cargando ? '#cbd5e0' : cliente.colorPrincipal, color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: cargando ? 'not-allowed' : 'pointer' }}>
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </main>
    </div>
  )
}