---
name: revisar-seguridad
description: Revisa que no haya secretos en el repositorio y que las rutas de la API validen sesión y datos. Usar antes de publicar o entregar.
---
Revisá:
1. Que no aparezcan `sb_secret`, `eyJ` ni claves escritas en archivos.
2. Que `.env.local` siga ignorado por Git.
3. Que cada ruta de `app/api/` verifique la sesión y valide los datos.
4. Que las consultas dependan de las reglas RLS de Supabase.

Informá hallazgos en una lista, con archivo y línea. No cambies nada sin permiso.