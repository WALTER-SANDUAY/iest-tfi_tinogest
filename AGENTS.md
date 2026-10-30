# AGENTS.md — Reglas para el agente en TinoGest

## Proyecto
TinoGest es un sistema de gestión para emprendedores de Tinogasta.
Cada usuario ve solo los datos de su negocio. Cliente actual:
La Dionisia (bodega). Producto publicado: https://tinogest.vercel.app

## Antes de hacer cualquier cosa
1. Leé `docs/CONSTITUCION.md` y `memory.md`.
2. Si hay una spec en `specs/NNN-nombre/`, leela antes de tocar código.
3. Una tarea por vez. Si el pedido es grande, proponé dividirlo.

## Stack
Next.js, React, TypeScript, Supabase y Vercel.
Todo archivo de código es `.ts` o `.tsx`.

## Estructura
- `app/`: pantallas (`.tsx`) y API (`app/api/`).
- `app/config-cliente.ts`: datos del cliente (nombre, logo, color).
- `docs/`: constitución y kit de especificaciones.
- `specs/`: una carpeta por funcionalidad.

## Reglas de trabajo
- Primero la spec, después el código. Un requisito nuevo entra a la spec antes que al código.
- Tests primero cuando exista el script `npm test`.
- Antes de cada commit: `npm run build` sin errores.
- Un commit por tarea, con mensaje claro en español.
- Cambiá solo lo que pide la tarea. No renombres variables ni archivos por tu cuenta.
- Los nombres internos (como `anada`) no se cambian; solo el texto visible.

## Seguridad y ética
- No leas ni muestres `.env.local`. Nunca escribas claves en archivos.
- No ejecutes comandos sin explicarlos antes.
- Mostrá cada cambio para que la persona lo lea y lo entienda.
- Si no estás seguro, preguntá en lugar de suponer.

## Estilo
- Español rioplatense en la interfaz y en los mensajes.
- Explicaciones paso a paso: la persona está aprendiendo.
