# 10 — Seguridad

## Datos sensibles
- Correo electrónico del usuario
- Contraseña (nunca en texto plano, solo con su versión encriptada)
- Datos de contacto de clientes

## Variables de entorno
- Clave secreta de conexión a la base de datos
- Dirección y credenciales de la base de datos
- Claves de servicios externos si los hubiera
→ Estos valores van en un archivo `.env` que **nunca** se sube al repositorio. Se incluye un `.env.example` solo como guía.

## Validaciones
- Todos los campos de formularios se verifican antes de guardar: no se aceptan campos vacíos donde no debe haberlos.
- Las contraseñas deben tener mínimo 8 caracteres.
- Las fechas y horas se validan para que tengan formato correcto.
- Se protege contra envíos repetidos o maliciosos.

## Lo que NUNCA debe llegar al navegador
- La contraseña original ni su versión encriptada de otros usuarios
- Las claves de conexión internas
- Información de otros usuarios que no sea la sesión activa
- Mensajes de error que revelen detalles técnicos de la base de datos