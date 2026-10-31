# memory.md — Memoria del proyecto TinoGest

## Estado actual
- Producto publicado: https://tinogest.vercel.app
- Repositorio: https://github.com/WALTER-SANDUAY/iest-tfi_tinogest (público)
- Cliente actual: La Dionisia (bodega). Marca blanca con logo de TinoGest y del cliente.
- Entrega: lunes 2/11. Defensa: miércoles 4/11.
- Editor: VS Code con Claude Code.

## Hecho
- Catálogo de vinos con stock: agregar, editar y eliminar.
- Login con Supabase Auth y API protegida con la sesión.
- Tabla `perfiles` (usuario ↔ negocio) y reglas RLS definitivas.
- Publicación en Vercel y Supabase configurado con la URL pública.
- Repositorio público `iest-tfi_tinogest`.
- Constitución, kit del TP 3, AGENTS.md y CLAUDE.md subidos.
- Documento `docs/ADAPTAR-A-OTRO-NEGOCIO.md`.

## Pendiente
- Comandos en `.claude/commands/` (/spec, /clarificar, /verificar) y dos skills.
- Specs de catálogo, reservas y buscador (carpeta `specs/`).
- Tests con `npm test` (empezar por la función `validar`).
- Pasar los colores de `page.tsx` a variables CSS.
- Texto alternativo en todas las imágenes.
- `docs/IDENTIDAD-MARCA.md`, `docs/PROMPTS.md` y `docs/DECLARACION-IA.md`.
- Borrar la tabla vieja `registros` y su API.
- Multimedia con IA, videos, gráficos e informe.

## Decisiones tomadas
- El texto visible dice "Año", pero en el código y la base se llama `anada`. No se renombra.
- La spec del catálogo se escribe después de construirlo (retroactiva) y se aclara en el informe.
- Un despliegue por cliente por ahora; a futuro, leer la configuración desde la tabla `clientes`.

## Errores de la IA y de proceso (para PROMPTS.md)
1. Build fallido: `undefined` no asignable en `route.ts` (PUT). Solución: `|| !valores`.
2. Reemplazo masivo de "Añada" por "Año" rompió nombres de variables. Solución: corregir de a una línea.
3. Archivos creados dentro de `node_modules` y pegados anidados. Solución: verificar la ruta antes de crear.

## Convenciones
- Un commit por tarea, mensaje claro en español.
- Antes de commitear: `npm run build` sin errores.
- No escribir claves ni datos personales en prompts ni en archivos.