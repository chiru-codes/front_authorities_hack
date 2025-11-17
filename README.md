
# Alerta UTEC - Frontend

Sistema inteligente de gestión de incidentes para el campus UTEC. Plataforma web que conecta a estudiantes, personal y autoridades para reportar, monitorear y resolver incidentes en tiempo real.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Flujo de la Aplicación](#-flujo-de-la-aplicación)
- [Rutas](#-rutas)
- [Componentes Principales](#-componentes-principales)
- [API Integration](#-api-integration)

## ✨ Características

- 🔐 **Autenticación de usuarios** (Login/Registro)
- 📝 **Reporte de incidentes** con categorización
- 📊 **Dashboard en tiempo real** con tablas de incidentes
- 🚨 **Clasificación de incidentes** (Graves vs Otros)
- 🔍 **Visualización de detalles** de cada incidente
- 👥 **Roles diferenciados**: Usuario, Admin, Solver
- 📱 **Diseño responsive** con Tailwind CSS

## 🛠️ Tecnologías

- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router DOM v7** - Enrutamiento
- **Tailwind CSS v4** - Estilos
- **Lucide React** - Iconos
- **TanStack Query** - Gestión de estado del servidor
- **Zod** - Validación de esquemas

## 📦 Requisitos Previos

- **Node.js** >= 18.x
- **pnpm** >= 8.x (recomendado) o npm/yarn

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=https://qzkbh4dev6.execute-api.us-east-1.amazonaws.com
```

> **Nota**: El proxy de desarrollo está configurado en `vite.config.ts` para evitar problemas de CORS durante el desarrollo local.

## 🏃 Ejecución

### Modo Desarrollo

```bash
pnpm dev
# o
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`

### Build de Producción

```bash
pnpm build
# o
npm run build
```

### Preview de Producción

```bash
pnpm preview
# o
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── api/                    # Controladores de API
│   └── auth-controller/   # Lógica de autenticación
├── auth/                   # Context y hooks de autenticación
│   ├── hooks/
│   └── AuthContext.tsx
├── common/
│   ├── components/        # Componentes reutilizables
│   │   ├── homepage/     # Componentes del home
│   │   ├── incidents/    # Componentes de incidentes
│   │   ├── loginpage/
│   │   ├── registerpage/
│   │   └── Navbar.tsx
│   ├── pages/            # Páginas principales
│   │   ├── auth/         # Login, Register
│   │   ├── incidents/    # Dashboard, Report, Details
│   │   ├── admin/        # Feed Admin
│   │   ├── solver/       # Feed Solver
│   │   └── HomePage.tsx
│   └── router/           # Configuración de rutas
│       ├── Routes.tsx
│       ├── ProtectedRoute.tsx
│       └── PublicRoute.tsx
├── utils/                # Utilidades
├── App.tsx              # Componente raíz
└── main.tsx             # Entry point
```

## 🔄 Flujo de la Aplicación

### 1. **Landing Page (No Autenticado)**
```
Usuario accede a / o /home
    ↓
Muestra hero con información del sistema
    ↓
Opciones: "Inicia Sesión" o "Regístrate"
```

### 2. **Registro de Usuario**
```
Usuario → /auth/register
    ↓
Completa formulario (nombre, email, password, tipo)
    ↓
POST /auth/register → API
    ↓
Token guardado en localStorage
    ↓
Redirige a /home (vista logueada)
```

### 3. **Inicio de Sesión**
```
Usuario → /auth/login
    ↓
Ingresa credenciales
    ↓
POST /auth/login → API
    ↓
Token guardado en localStorage
    ↓
Redirige a /home (vista logueada)
```

### 4. **Home (Autenticado)**
```
Usuario logueado accede a /home
    ↓
Fetch GET /incidents (con token)
    ↓
Clasifica incidentes:
  - Graves (categoría "GRAVE") → Tabla azul (arriba)
  - Otros → Tabla celeste (abajo)
    ↓
Muestra botón "Reportar Incidente"
```

### 5. **Reportar Incidente**
```
Click en "Reportar Incidente"
    ↓
Navega a /incidents/report
    ↓
Usuario completa formulario:
  - Categoría
  - Lugar/Ubicación
  - Descripción
    ↓
POST /incidents (con token)
    ↓
Incidente creado → Redirige a /home
```

### 6. **Ver Detalles de Incidente**
```
Click en "Ver detalles" en tabla
    ↓
Navega a /incidents/details/:id
    ↓
Muestra información completa del incidente
```

### 7. **Dashboard Completo**
```
Usuario navega a /incidents/dashboard
    ↓
Vista expandida con:
  - Incidentes graves (compactos)
  - Otros incidentes (tarjetas detalladas)
```

### 8. **Feeds Especializados**

**Admin:**
```
Admin logueado → /admin/feed
    ↓
Gestión y asignación de incidentes
```

**Solver:**
```
Solver logueado → /solver/feed
    ↓
Vista de incidentes asignados
```

## 🛣️ Rutas

### Públicas (sin autenticación)
- `/` - Redirige a `/home`
- `/home` - Landing page / Home con incidentes (si está logueado)
- `/auth/login` - Inicio de sesión
- `/auth/register` - Registro de usuario

### Protegidas (requieren autenticación)
- `/incidents/report` - Reportar nuevo incidente
- `/incidents/details/:id` - Detalles de incidente específico
- `/incidents/dashboard` - Dashboard completo de incidentes

### Roles Específicos
- `/admin/feed` - Feed administrativo (solo Admin)
- `/solver/feed` - Feed de resolución (solo Solver)

## 🧩 Componentes Principales

### `HomePage`
- Detecta estado de autenticación (token en localStorage)
- **No logueado**: Muestra hero con CTA
- **Logueado**: 
  - Botón "Reportar Incidente"
  - Tabla de incidentes graves (azul)
  - Tabla de otros incidentes (celeste)

### `IncidentsTable`
- Tabla reutilizable con bordes redondeados
- Props: `title`, `incidents`, `borderColor`, `textColor`
- Muestra: categoría, ubicación, descripción, fecha, acción
- Click en "Ver detalles" → navega a `/incidents/details/:id`

### `IncidentCard`
- Tarjeta individual de incidente
- Soporta modo compacto
- Usado en dashboard

### `Navbar`
- Navegación global
- Muestra opciones según estado de autenticación

### `ProtectedRoute`
- HOC que protege rutas privadas
- Redirige a `/auth/login` si no hay sesión

### `PublicRoute`
- HOC para rutas públicas
- Redirige a `/incidents/report` si ya hay sesión activa

## 🔌 API Integration

### Configuración
El frontend se comunica con el backend a través de la variable de entorno `VITE_API_URL`.

### Endpoints Utilizados

#### Autenticación
```typescript
POST /auth/login
Body: { email, password }
Response: { token, user }

POST /auth/register
Body: { name, email, password, user_type }
Response: { token, user }
```

#### Incidentes
```typescript
GET /incidents
Headers: { Authorization: "Bearer <token>" }
Response: { incidents: [...] }

POST /incidents
Headers: { Authorization: "Bearer <token>" }
Body: { category, place_id, description }
Response: { incident_id, ... }

GET /incidents/:id
Headers: { Authorization: "Bearer <token>" }
Response: { incident details }
```

### Gestión de Tokens
- Token guardado en `localStorage` tras login/registro
- Enviado en header `Authorization: Bearer <token>` en cada request
- Verificado por `AuthContext` y rutas protegidas

### Proxy de Desarrollo
El archivo `vite.config.ts` incluye proxy para `/auth/*`:

```typescript
server: {
  proxy: {
    '/auth': {
      target: 'https://fi7faricwd.execute-api.us-east-1.amazonaws.com',
      changeOrigin: true,
      secure: true,
    },
  },
}
```

Esto evita problemas de CORS durante el desarrollo local.

## 🎨 Estilos y Diseño

- **Framework**: Tailwind CSS v4
- **Paleta de colores**:
  - Sky (celeste): Primario para botones y acciones
  - Blue (azul): Incidentes graves y alertas críticas
  - Gray: Backgrounds y texto secundario
  - Yellow: Alertas y notificaciones
- **Componentes**: Bordes redondeados (`rounded-xl`, `rounded-2xl`)
- **Responsivo**: Mobile-first con breakpoints de Tailwind

## 📝 Notas Importantes

1. **CORS**: Durante desarrollo, usar el proxy configurado o ajustar headers en el backend
2. **Tokens**: Se guardan en localStorage (considerar sessionStorage para mayor seguridad)
3. **Categorías**: Los incidentes con `category === "GRAVE"` se muestran en la tabla superior
4. **Estado Global**: Se usa `AuthContext` para gestionar la sesión del usuario

---

Desarrollado con ❤️ para la comunidad UTEC
EOF