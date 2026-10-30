# 05 — Estructura de Datos

## Tabla: usuarios
| Campo | Tipo | Descripción |
|---|---|---|
| id | texto | Identificador único |
| correo | texto | Correo electrónico de acceso |
| contraseña_hash | texto | Contraseña protegida |
| nombre_comercio | texto | Nombre del negocio |
| creado_en | fecha | Fecha de registro |

## Tabla: clientes
| Campo | Tipo | Descripción |
|---|---|---|
| id | texto | Identificador único |
| nombre | texto | Nombre de la persona |
| telefono | texto | Número de contacto |
| correo | texto | Correo (opcional) |
| registrado_en | fecha | Fecha de ingreso al sistema |

## Tabla: turnos
| Campo | Tipo | Descripción |
|---|---|---|
| id | texto | Identificador único |
| cliente_id | referencia | Cliente asociado al turno |
| fecha_hora | fecha y hora | Momento del turno |
| estado | texto | Pendiente, confirmado o cancelado |
| observacion | texto | Nota breve (opcional) |

## Tabla: movimientos
| Campo | Tipo | Descripción |
|---|---|---|
| id | texto | Identificador único |
| fecha | fecha | Día del movimiento |
| monto | número | Valor del ingreso |
| descripcion | texto | Detalle |
| tipo | texto | Entrada |

## Ejemplo de datos
- Cliente: María López — Tel: 3834-123456 — registrada el 07/10/2026
- Turno: 10/10/2026 17:00 — Peluquería — Pendiente
- Movimiento: 07/10/2026 — $0 (ejemplo) — Corte de cabello