# 04 — Arquitectura
tino-gest/
├── public/ # Archivos estáticos
│ ├── marca/ # Logo e imágenes de identidad
│ └── favicon.ico
├── src/
│ ├── app/ # Páginas y rutas del sitio
│ │ ├── inicio/
│ │ ├── agenda/
│ │ ├── clientes/
│ │ ├── registros/
│ │ └── sesion/
│ ├── components/ # Partes reutilizables (botones, tarjetas, menús)
│ ├── lib/ # Conexión a base de datos y funciones auxiliares
│ └── contextos/ # Estado de la sesión y datos compartidos
├── .gitignore # Archivos que no se suben al repositorio
├── .env.example # Ejemplo de variables de entorno
└── README.md # Presentación del proyecto

## Función de cada parte
- **public/**: imágenes y archivos que no cambian.
- **app/**: cada carpeta es una pantalla o sección del sistema.
- **components/**: elementos que se repiten en varias pantallas para no repetir código.
- **lib/**: configuraciones técnicas y conexiones.
- **contextos/**: mantiene la información del usuario que inició sesión mientras navega.