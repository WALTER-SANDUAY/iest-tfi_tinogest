# PROMPTS.md — Registro de pedidos y errores de la IA

Herramientas: Claude (chat y Claude Code en VS Code).
Regla: ningún código se aceptó sin leerlo y probarlo.

## Pedidos importantes

| # | Pedido | Resultado | Qué revisé yo |
|---|--------|-----------|---------------|
| 1 | Adaptar el catálogo de TinoGest a una bodega (vinos, stock, marca blanca). | Tabla `vinos`, API y pantalla con agregar, editar y eliminar. | Que cada usuario vea solo los datos de su negocio. |
| 2 | Agregar login con Supabase Auth y reglas RLS. | Pantalla de ingreso, tabla `perfiles` y API con sesión. | Que sin sesión la API responda 401. |
| 3 | Publicar en GitHub y Vercel. | Sitio en tinogest.vercel.app. | Variables de entorno y URLs en Supabase. |
| 4 | Pasar cepa y año a listas desplegables. | Cambio en `page.tsx` (RF-09 a RF-11). | Que Editar cargue los valores guardados. |
| 5 | Mover `validar` a su archivo y escribir tests. | `app/lib/validar-vino.ts` y 9 tests con Vitest. | Que `npm test` y `npm run build` pasen. |

## Errores de la IA y cómo los corregí

### Error 1: build fallido por tipos
- **Qué hizo mal:** en la ruta PUT pasó a Supabase un valor que podía ser `undefined`.
- **Cómo lo detecté:** Vercel falló el despliegue con el error TS2345 en `route.ts`.
- **Cómo lo corregí:** agregué `|| !valores` en la validación. Corrí `npm run build` antes de volver a subir.

### Error 2: cambio masivo que rompió el código
- **Qué hizo mal:** al reemplazar "Añada" por "Año" se cambiaron también nombres de variables (`v.Año`).
- **Cómo lo detecté:** VS Code marcó "La propiedad 'Año' no existe en el tipo 'Vino'" y el build falló.
- **Cómo lo corregí:** volví a `anada` en el código y dejé "Año" solo en el texto visible. Regla nueva: nunca reemplazar todo, revisar de a una línea.

### Error 3: código pegado duplicado y archivos mal ubicados
- **Qué hizo mal:** el bloque de la cepa quedó pegado dos veces dentro del formulario y se perdieron los campos de precio y stock. Además, algunos archivos se crearon dentro de `node_modules`.
- **Cómo lo detecté:** errores rojos en Problemas y `git status` sin cambios.
- **Cómo lo corregí:** reemplacé el archivo completo y verifiqué la ruta de cada archivo antes de crearlo.

### Error 4: instrucciones con datos cruzados
- **Qué pasó:** en Vercel cargué la dirección de Supabase en el campo Key y la clave en Value.
- **Cómo lo detecté:** revisé la captura antes de desplegar.
- **Cómo lo corregí:** Key lleva siempre el nombre de la variable.
- **Quién se equivocó:** yo, al copiar los datos; la IA había dado los pasos bien.

### Error 5: código que la IA no podía verificar contra mi base
- **Qué hizo mal:** en una práctica, la IA escribió una ruta con `createClient()` sin importarlo y asumió columnas (`contenido`, `created_at`) que mi tabla no tenía (tenía `titulo`, `descripcion` y `creado_en`). También sugirió una librería en desuso (`auth-helpers-nextjs`).
- **Cómo lo detecté:** el editor marcó el import faltante, el navegador mostró "Module not found" y la API devolvió "column created_at does not exist".
- **Cómo lo corregí:** usé `@supabase/supabase-js`, un solo cliente exportado y las columnas reales de la tabla.

- **Aprendizaje:** la IA no ve mi base de datos; sus supuestos se contrastan con datos reales.

## Lección general
La IA propone, yo reviso. Cada cambio se probó en local, con build y tests, antes de subirlo.

