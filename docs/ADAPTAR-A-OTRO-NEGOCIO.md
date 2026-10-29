# Cómo adaptar TinoGest a otro negocio

## Lo que no se toca (motor)
- Login con Supabase Auth.
- Tabla `perfiles` (usuario ↔ negocio) y reglas RLS.
- Estructura de la API (sesión, validación, GET/POST/PUT/DELETE).
- Publicación con GitHub y Vercel.

## Lo que se cambia por cada cliente
1. `app/config-cliente.ts`: nombre, rubro, logo y color principal.
2. Logo en `public/clientes/`.
3. Supabase: una fila en `clientes`, un usuario en Authentication
   y su vínculo en `perfiles`.

## Lo que depende del rubro
- El catálogo (hoy `vinos`: cepa, año, precio, stock).
  Otro rubro cambia la tabla y los campos (ej.: servicios y duración).
- Módulos genéricos, como las reservas, se reutilizan casi sin cambios.

## Limitación actual y evolución
- Hoy cada despliegue en Vercel atiende a un cliente
  (la configuración está en un archivo).
- Evolución: leer nombre, logo y color desde la tabla `clientes`
  según el usuario que inicia sesión, para atender varios negocios
  desde un solo sistema.