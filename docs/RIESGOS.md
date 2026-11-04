# Análisis de riesgos — TinoGest

| # | Riesgo | A quién afecta | Mitigación |
|---|--------|----------------|------------|
| 1 | Un negocio ve los vinos de otro si falla RLS. | Clientes de la plataforma | RLS por `perfiles` (solo lectura) y API con token del usuario. Pendiente: probar con dos cuentas. |
| 2 | Aceptar código de la IA sin entenderlo (errores de tipos, supuestos sobre la base de datos). | Estudiante y usuarios | Leer cada cambio, correr tests y build antes de subir. Casos documentados en `PROMPTS.md`. |
| 3 | Simulación de humanidad: imágenes, voces o textos generados con IA que parezcan personas reales. | Visitantes del sitio y personas representadas | Leyenda «Generado con IA» en cada pieza, sin personas reales identificables, revisión de estereotipos con la Tabla 3. |
| 4 | Exposición de claves en el chat o en el repositorio. | Dueña del negocio y usuarios | Variables de entorno en `.env.local` (ignorado por git). La clave pegada en el chat es la publicable; se evalua regenerla en Supabase. |

## Vínculo con el TP N° 1 (A.I. Inteligencia Artificial, 2001)

En la película, David es un niño robot programado para amar, y su apariencia humana genera apego real en quien lo rodea. El dilema es quién responde cuando una máquina diseñada para parecer humana produce vínculos o daños. En el mundo real se vincula con la dependencia emocional hacia los chatbots y la simulación de empatía. En TinoGest, el riesgo 3 recoge ese dilema: lo que se genera con IA se etiqueta siempre, para que nadie confunda lo sintético con lo humano.