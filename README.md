# Dashboard Académico - Ciencia de Datos

Una aplicación frontend profesional en React que visualiza un dashboard académico para hacer seguimiento al rendimiento de estudiantes en temas de ciencia de datos.

## Características

- **Diseño profesional** con colores alternados entre blanco y azul marino
- **Interfaz en español** completamente localizada
- **Visualizaciones interactivas** construidas con D3.js
- **KPIs dinámicos** con métricas clave de rendimiento
- **Gráficos especializados**:
  - 📊 Gráfico de barras para rendimiento por materia
  - 📈 Gráfico de líneas para evolución temporal
  - 🎯 Gráfico radar para comparación de estudiantes
  - 🔵 Gráfico de dispersión para correlaciones

## Tecnologías Utilizadas

- **React 18** - Framework principal
- **Tailwind CSS** - Estilos y diseño responsivo
- **D3.js** - Visualizaciones interactivas
- **Lucide React** - Iconografía moderna

## Instalación y Ejecución

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm start
   ```

3. **Abrir en el navegador:**
   La aplicación se abrirá automáticamente en `http://localhost:3000`

## Estructura del Proyecto

```
src/
├── components/
│   ├── Header.js              # Encabezado con introducción
│   ├── KPISection.js          # Indicadores clave de rendimiento
│   ├── ChartsSection.js       # Sección de visualizaciones
│   └── charts/
│       ├── BarChart.js        # Gráfico de barras
│       ├── LineChart.js       # Gráfico de líneas
│       ├── RadarChart.js      # Gráfico radar
│       └── ScatterChart.js    # Gráfico de dispersión
├── App.js                     # Componente principal
├── index.js                   # Punto de entrada
└── index.css                  # Estilos globales
```

## Funcionalidades

### KPIs Generales
- Total de estudiantes
- Evaluaciones completadas
- Promedio general
- Porcentaje de avance del curso
- Número de estudiantes en riesgo

### Visualizaciones Interactivas
- **Hover effects** en todos los gráficos
- **Tooltips informativos** con datos detallados
- **Selección múltiple** en gráfico radar
- **Líneas de tendencia** en gráficos de correlación
- **Escalas de color** para indicar rendimiento

## Personalización

El dashboard está diseñado para ser fácilmente personalizable:

- **Colores**: Modificar `tailwind.config.js` para cambiar la paleta
- **Datos**: Actualizar los arrays de datos en cada componente de gráfico
- **Métricas**: Ajustar los KPIs en `KPISection.js`
- **Materias**: Modificar las materias en los componentes de gráficos

## Construcción para Producción

```bash
npm run build
```

Esto creará una carpeta `build` con los archivos optimizados para producción.

## Licencia

Este proyecto es una demostración técnica para propósitos educativos.
