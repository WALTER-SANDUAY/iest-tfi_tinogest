import { describe, it, expect } from 'vitest'
import { validar } from '../app/lib/validar-vino'

const valido = { nombre: 'Malbec Reserva', cepa: 'Malbec', anada: '2022', precio: '25000', stock: '12' }

describe('validar (spec 001)', () => {
  it('RF-01: acepta un vino válido', () => {
    const r = validar(valido)
    expect(r.error).toBeUndefined()
    expect(r.valores?.nombre).toBe('Malbec Reserva')
  })

  it('RF-06: rechaza nombre vacío', () => {
    expect(validar({ ...valido, nombre: '   ' }).error).toBe('El nombre es obligatorio')
  })

  it('RF-07: rechaza precio negativo', () => {
    expect(validar({ ...valido, precio: '-5' }).error).toBe('El precio no es válido')
  })

  it('RF-07: rechaza precio que no es número', () => {
    expect(validar({ ...valido, precio: 'abc' }).error).toBe('El precio no es válido')
  })

  it('RF-07: acepta precio 0 (decisión confirmada)', () => {
    expect(validar({ ...valido, precio: '0' }).error).toBeUndefined()
  })

  it('RF-07: rechaza stock con decimales', () => {
    expect(validar({ ...valido, stock: '2.5' }).error).toBe('El stock debe ser un número entero, 0 o más')
  })

  it('RF-07: rechaza stock negativo', () => {
    expect(validar({ ...valido, stock: '-3' }).error).toBe('El stock debe ser un número entero, 0 o más')
  })

  it('RF-12: rechaza año fuera de rango', () => {
    expect(validar({ ...valido, anada: '6' }).error).toBe('El año no es válido')
  })

  it('año y cepa vacíos son opcionales', () => {
    const r = validar({ ...valido, anada: '', cepa: '' })
    expect(r.error).toBeUndefined()
    expect(r.valores?.anada).toBeNull()
    expect(r.valores?.cepa).toBeNull()
  })
})