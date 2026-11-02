# TinoGest

Sistema de gestión para emprendedores de Tinogasta. Cada negocio ve solo sus propios datos. Primer cliente: **La Dionisia** (bodega).

- **Sitio publicado:** https://tinogest.vercel.app
- **Repositorio:** https://github.com/WALTER-SANDUAY/iest-tfi_tinogest

## Qué hace
- Catálogo de vinos con control de stock (agregar, editar, eliminar).
- Alerta de stock bajo (10 botellas o menos).
- Ingreso con usuario y contraseña.
- Marca blanca: logo de TinoGest y del negocio.

## Tecnología
Next.js, React, TypeScript, Supabase (base de datos y login) y Vercel.

## Cómo correrlo en tu compu
1. `npm install`
2. Crear `.env.local` con `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. `npm run dev` y abrir http://localhost:3000
4. Tests: `npm test`

## Documentación
- `docs/CONSTITUCION.md`: principios del proyecto.
- `docs/01-CONTEXTO.md` a `docs/10-SEGURIDAD.md`: kit de especificaciones.
- `docs/ADAPTAR-A-OTRO-NEGOCIO.md`: cómo sumar otro emprendimiento.
- `docs/PROMPTS.md` y `docs/DECLARACION-IA.md`: uso responsable de la IA.
- `specs/001-catalogo/`: spec, clarificación, plan, tareas y verificación.
- `AGENTS.md`, `CLAUDE.md`, `memory.md`, `.claude/`: arnés del agente.

## Autor
Walter Elías Sanduay. Trabajo Final Integrador, IEST Tinogasta.