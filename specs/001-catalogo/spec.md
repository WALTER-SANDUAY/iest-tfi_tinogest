# Spec 001 — Catálogo de vinos

> Nota: esta spec se redactó después de construir la primera versión del
> catálogo (retroactiva). Los RF-01 a RF-08 describen lo que el sistema ya
> hacía; los RF-09 a RF-11 entraron como cambio, primero a la spec y después
> al código.

## Contexto
La dueña de la bodega La Dionisia necesita controlar qué vinos tiene y cuántas
botellas quedan. El catálogo es una herramienta interna: solo la dueña la usa,
con su usuario, y no hay vista pública para clientes.

## Historias de usuario
- Como dueña, quiero cargar un vino nuevo para tener mi catálogo al día.
- Como dueña, quiero corregir los datos de un vino para actualizar el stock cuando vendo.
- Como dueña, quiero eliminar un vino que ya no vendo.
- Como dueña, quiero ver todos los vinos con su stock.
- Como dueña, quiero que me avise cuando queda poco stock.

## Requisitos (notación EARS)

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| RF-01 | Cuando la persona guarde un vino válido, el sistema lo agregará al catálogo de su negocio. | Alta |
| RF-02 | Cuando la persona edite y guarde un vino, el sistema actualizará sus datos. | Alta |
| RF-03 | Cuando la persona confirme la eliminación, el sistema borrará el vino. | Alta |
| RF-04 | El sistema mostrará todos los vinos de su negocio con nombre, cepa, año, precio y stock. | Alta |
| RF-05 | Si el stock es 10 o menos, el sistema mostrará el stock en rojo con la leyenda "(bajo)". | Media |
| RF-06 | Si el nombre está vacío, el sistema no guardará y mostrará "El nombre es obligatorio". | Alta |
| RF-07 | Si el precio no es un número o es negativo, el sistema no guardará y mostrará "El precio no es válido". Si el stock no es entero de 0 o más, mostrará "El stock debe ser un número entero, 0 o más". | Alta |
| RF-08 | Mientras no haya sesión iniciada, la API rechazará los pedidos y la pantalla llevará al login. Cada usuario verá solo los vinos de su negocio. | Alta |
| RF-09 | El formulario mostrará la cepa en una lista desplegable con la opción "Otra..." que permite escribir un valor libre. | Media |
| RF-10 | El formulario mostrará el año en una lista desplegable que incluya la opción "Sin año". | Media |
| RF-11 | Cuando la persona edite un vino, las listas mostrarán seleccionado el valor guardado. | Media |

## Casos límite
- Año fuera de 1900 a 2100: no se guarda y muestra "El año no es válido".
- Año y cepa vacíos: se permite, son opcionales.
- Precio 0: se permite (decisión provisoria, pendiente de confirmar).
- Vino con una cepa que no está en la lista: al editar aparece como "Otra...".
- Eliminar pide confirmación antes de borrar.

## Fuera de alcance
- Buscador de vinos (va en la spec 003).
- Vista para clientes o tienda en línea.
- Ventas y descuento automático de stock.

## Criterios de finalización
- Todos los RF de prioridad alta cumplen y están validados en `verificacion.md`.
- `npm run build` sin errores.
- Tests de `validar` en verde.