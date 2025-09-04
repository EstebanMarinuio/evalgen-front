# Guía de Despliegue - Dashboard Académico

## Despliegue en GitHub Pages

Para desplegar automáticamente el dashboard en GitHub Pages:

### 1. Instalar gh-pages
```bash
npm install --save-dev gh-pages
```

### 2. Agregar scripts al package.json
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "homepage": "https://EstebanMarinuio.github.io/evalgen-front"
}
```

### 3. Desplegar
```bash
npm run deploy
```

## Despliegue en Netlify

### Opción 1: Arrastrar y soltar
1. Ejecutar `npm run build`
2. Arrastrar la carpeta `build` a [Netlify](https://netlify.com)

### Opción 2: Conectado a GitHub
1. Conectar el repositorio en Netlify
2. Configurar:
   - Build command: `npm run build`
   - Publish directory: `build`

## Despliegue en Vercel

### Opción 1: CLI
```bash
npm install -g vercel
vercel
```

### Opción 2: GitHub Integration
1. Conectar repositorio en [Vercel](https://vercel.com)
2. Configuración automática para React

## Variables de Entorno

Para producción, crear archivo `.env.production`:
```
REACT_APP_API_URL=https://api.ejemplo.com
REACT_APP_VERSION=1.0.0
```

## Optimizaciones de Producción

### 1. Análisis del bundle
```bash
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

### 2. Compresión
El build de React ya incluye compresión gzip automática.

### 3. Cache Headers
Configurar en el servidor web:
```
/build/static/**/*.js
Cache-Control: public, max-age=31536000, immutable
```

## Monitoreo

### 1. Google Analytics
Agregar en `public/index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### 2. Error Tracking
```bash
npm install @sentry/react @sentry/tracing
```

## URLs de Despliegue

- **GitHub Pages**: https://EstebanMarinuio.github.io/evalgen-front
- **Netlify**: [Configurar después del despliegue]
- **Vercel**: [Configurar después del despliegue]
