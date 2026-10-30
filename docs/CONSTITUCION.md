# Constitución del proyecto TinoGest

Estos principios los lee el agente de IA antes de cada spec, plan o tarea.
Son cortos y se pueden comprobar.

1. **Stack.** Next.js, React, TypeScript, Supabase (base de datos y login)
   y Vercel para publicar. Todo archivo de código es `.ts` o `.tsx`.
   Se comprueba con `npm run build` sin errores.

2. **Marca.** Los colores y tipografías salen de variables CSS definidas
   en un solo lugar. Ningún color se escribe a mano en los componentes.
   Los datos del cliente salen de `app/config-cliente.ts`.

3. **Capas.** La pantalla no habla con la base de datos: llama a la API
   (`app/api/`), y la API valida los datos antes de guardarlos.

4. **Seguridad.** Ningún secreto en el repositorio ni en el chat con la IA.
   Las claves van en `.env.local`, que Git ignora. Cada usuario ve solo
   los datos de su negocio, garantizado por las reglas RLS de Supabase.

5. **Tests.** Cada requisito principal tiene un test automático.
   Se comprueba con `npm test` en verde antes de cada commit.

6. **Idioma y accesibilidad.** La interfaz está en español rioplatense.
   Toda imagen lleva texto alternativo y todo se puede usar con teclado.

7. **Uso responsable de la IA.** Ningún código se acepta sin leerlo y
   entenderlo. No se pegan datos personales ni claves en los prompts.
   Toda pieza generada con IA se declara como tal. No se generan
   personas reales ni se imitan marcas.