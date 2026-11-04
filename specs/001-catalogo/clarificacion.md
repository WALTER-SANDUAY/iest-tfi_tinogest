# Clarificación — Spec 001 Catálogo

Revisión de la spec como QA. Cada hallazgo tiene la decisión de la persona.

| # | Hallazgo | Por qué importa | Opciones | Decisión |
|---|----------|-----------------|----------|----------|
| 1 | No dice si el precio puede ser 0. | Un vino a $0 podría ser un error de carga o una muestra. | a) Permitir 0. b) Exigir mayor a 0. | Se permite 0. |
| 2 | El umbral de stock bajo (10) no estaba justificado. | Define cuándo se alerta a la dueña. | a) Dejar 10. b) Otro valor. | Se deja en 10. |
| 3 | RF-06 y RF-07 no cubren el año fuera de rango en la spec. | Hay un caso límite sin requisito. | Agregar RF para año 1900 a 2100. | Resuelto: se agregó RF-12 (año fuera de rango), con su test. |
| 4 | El mensaje del nombre difiere entre pantalla ("Escribí el nombre del vino") y API ("El nombre es obligatorio"). | Inconsistencia visible. | a) Unificar. b) Dejar. | Diferido a la versión 2: la pantalla valida primero y el mensaje de la API es una segunda barrera. |
| 5 | No hay límite de largo para el nombre. | Un texto enorme podría romper el diseño. | a) Límite de 100. b) Sin límite. | Diferido a la versión 2: se anota como mejora; por ahora no hay límite de largo. |
| 6 | Los RF-01 a RF-08 se escribieron después del código. | Puede haber requisitos que solo describan lo hecho. | Declararlo en el informe. | Se declara retroactiva. |