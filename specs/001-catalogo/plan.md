# Plan — Spec 001 Catálogo

Cómo está construido (sin código), ligado a cada RF.

- **Pantalla** (`app/page.tsx`): formulario y lista. Cumple RF-04, RF-05, RF-09, RF-10, RF-11.
- **API** (`app/api/vinos/route.ts`): GET, POST, PUT y DELETE. Cumple RF-01, RF-02, RF-03.
- **Validación** (función `validar` en la API): cumple RF-06 y RF-07.
- **Seguridad**: token de sesión de Supabase y reglas RLS. Cumple RF-08.
- **Datos**: tabla `vinos` con `cliente_id`. El campo se llama `anada`; la pantalla dice "Año".
- **Pendiente**: tests de `validar` y RF-12 (año fuera de rango).