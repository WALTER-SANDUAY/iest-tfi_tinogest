// Valida y ordena los datos que llegan del formulario de vinos
export function validar(body: any) {
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
    return { error: 'El año no es válido' }
  }

  const cepa = String(body.cepa ?? '').trim() || null
  return { valores: { nombre, cepa, anada, precio, stock } }
}