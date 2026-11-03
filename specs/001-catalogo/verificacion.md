# Verificación — Spec 001 Catálogo
Verificado el 3/11/2026 en producción (tinogest.vercel.app) y en local. 9 tests en verde, build sin errores.

| RF | Estado | Evidencia |
|----|--------|-----------|
| RF-01 | CUMPLE | Test "acepta un vino válido" y prueba manual en tinogest.vercel.app |
| RF-02 | CUMPLE | Prueba manual: editar un vino y guardar |
| RF-03 | CUMPLE | Prueba manual: eliminar con cartel de confirmación |
| RF-04 | CUMPLE | Prueba manual: la lista muestra nombre, cepa, año, precio y stock |
| RF-05 | CUMPLE | Prueba manual: con 1 botella el stock se muestra en rojo con "(bajo)" |
| RF-06 | CUMPLE | Test "rechaza nombre vacío" |
| RF-07 | CUMPLE | 5 tests de precio y stock |
| RF-08 | CUMPLE | Prueba manual: se ingresa con usuario y contraseña; sin sesión lleva al login. sin token la API responde 401. RLS por perfiles revisada en Supabase el 3/11.|
| RF-09 | CUMPLE | Prueba manual: desplegable de cepa con "Otra..." |
| RF-10 | CUMPLE | Prueba manual: desplegable de año con "Sin año" |
| RF-11 | CUMPLE | Prueba manual: al editar, las listas muestran el valor guardado |
| RF-12 | CUMPLE | Test "rechaza año fuera de rango" |

Resultado: los 12 RF cumplen. Falla de código o de spec: ninguna.
Observación: RF-12 faltaba en la spec y se agregó después de escribir los tests.
Pendiente de mejora: tests automáticos para RF-02, RF-03 y RF-08 (hoy solo prueba manual).
Prueba manual pendiente: comprobar con un segundo usuario de otro negocio que no ve vinos ajenos (RLS revisada en la base, no probada con dos cuentas). 