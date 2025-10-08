# Librería Universitaria Nexus – SPA React + TypeScript + MUI

> Actividad 2 – Aplicaciones Móviles Multiplataforma (Proyecto transversal: Librería + Co‑working + Cafetería)

---
## Tabla de Contenidos
1. [Datos Generales](#1-datos-generales)
2. [Resumen Ejecutivo](#2-resumen-ejecutivo)
3. [Objetivos Académicos](#3-objetivos-académicos)
4. [Alcance Funcional](#4-alcance-funcional)
5. [Requisitos Funcionales y Estado](#5-requisitos-funcionales-y-estado)
6. [Tecnologías y Stack](#6-tecnologías-y-stack)
7. [Arquitectura & Estructura](#7-arquitectura--estructura)
8. [Inventario de Componentes (MUI)](#8-inventario-de-componentes-mui)
9. [Hooks Personalizados](#9-hooks-personalizados)
10. [Contextos Globales](#10-contextos-globales)
11. [Servicios y Acceso a Datos](#11-servicios-y-acceso-a-datos)
12. [Sistema de Temas (Dark/Light)](#12-sistema-de-temas-darklight)
13. [Estilos & Design System](#13-estilos--design-system)
14. [Gestión de Skeletons y Carga Progresiva](#14-gestión-de-skeletons-y-carga-progresiva)
15. [Notificaciones y Manejo Global de Errores](#15-notificaciones-y-manejo-global-de-errores)
16. [Rutas y Navegación](#16-rutas-y-navegación)
17. [Accesibilidad (A11y)](#17-accesibilidad-a11y)
18. [Optimización de Rendimiento](#18-optimización-de-rendimiento)
19. [Instalación y Scripts](#19-instalación-y-scripts)
20. [Roadmap / Mejores Futuras](#20-roadmap--mejoras-futuras)
21. [Rúbrica / Cobertura](#21-rúbrica--cobertura)
22. [Conclusiones Técnicas](#22-conclusiones-técnicas)
23. [Anexos](#23-anexos)

---
## 1. Datos Generales
- **Fecha de creación:** 2024-10-08  
- **Última actualización:** 2025-10-08  
- **Actividad:** Nº 2 – SPA con API simulada  
- **Autores:** (añadir en `Autores.txt` si es grupal)  

## 2. Resumen Ejecutivo
Aplicación web **SPA** construida con **React + TypeScript + Vite + Material UI (MUI)** que simula una plataforma integral para una librería universitaria con módulos de catálogo, detalle, coworking, cafetería y perfil de usuario autenticado. Se implementó un **sistema de temas dark/light**, **rutas protegidas**, **carga progresiva con skeletons**, **notificaciones globales accesibles**, y una capa de **servicios desacoplada** de las vistas.

## 3. Objetivos Académicos
1. Aplicar patrones modernos de desarrollo en React con tipado estático.  
2. Asegurar separación de capas (presentación / datos / estado).  
3. Implementar temas dinámicos y UI responsiva profesional.  
4. Emplear Context API + custom hooks para estado transversal.  
5. Consumir una API mock simulando endpoints reales.  
6. Optimizar UX de carga (skeletons + estado vacío + error).  
7. Preparar base escalable para futuras integraciones reales.  

## 4. Alcance Funcional
- Catálogo navegable de libros.  
- Vista de detalle individual.  
- Módulo coworking (disponibilidad de slots).  
- Módulo cafetería (listado de productos).  
- Perfil de usuario (tras login).  
- Login simulado + rutas protegidas.  
- Notificaciones globales y manejo de errores.  
- Tema dark/light con persistencia.  

## 5. Requisitos Funcionales y Estado
| Código | Descripción | Estado | Implementación |
|--------|-------------|--------|----------------|
| RF-01 | Landing Page | ✅ | `LandingPage` + MUI Cards/Grid |
| RF-02 | ≥5 vistas adicionales | ✅ | Catálogo, Detalle, Coworking, Cafetería, Perfil, Login |
| RF-03 | Login | ✅ | `AuthContext` + formulario MUI |
| RF-04 | Ruta protegida | ✅ | `ProtectedRoute` |
| RF-05 | Consumo API mock | ✅ | `apiClient`, hooks y servicios |
| RF-06 | Catálogo libros | ✅ | `useLibros` + `BookCard` |
| RF-07 | Detalle libro | ✅ | `DetalleLibroPage` + skeletons |
| RF-08 | Módulo coworking | ✅ | `CoworkingPage` + chips estado |
| RF-09 | Módulo cafetería | ✅ | `CafeteriaPage` + chips/categoría |
| RF-10 | Perfil usuario | ✅ | `PerfilUsuarioPage` |
| RF-11 | Tema dark / light | ✅ | `ThemeProvider` + variables CSS + MUI theme bridge |
| RF-12 | Notificaciones globales | ✅ | `NotificationContext` + Snackbar MUI |
| RF-13 | Skeletons estratégicos | ✅ | `useSkeletonDelay` + componentes |
| RF-14 | Error boundary | ✅ | `ErrorBoundary` |

## 6. Tecnologías y Stack
| Área | Herramienta | Notas |
|------|-------------|-------|
| Core | React 19 + TS | SPA moderna |
| Build | Vite | Dev server + build rápido |
| UI | Material UI (MUI) | Componentes + theme system |
| Estilos bajos | CSS variables | Inyectadas dinámicamente |
| Estado global | Context API | Auth / Notificaciones / Tema |
| Enrutado | React Router v7 | Rutas protegidas |
| Tipado | TypeScript | Contratos fuertes |
| Notificaciones | Snackbar/Alert | MUI + accesible |

## 7. Arquitectura & Estructura
```
src/
  components/        # Presentación reutilizable
  context/           # State global (Auth, Theme, Notifications)
  hooks/             # Lógica reutilizable: datos / UX
  pages/             # Vistas (routing targets)
  services/          # Acceso a API (fetch + caché simple)
  theme/             # Objetos de tema y provider puente MUI
  types/             # Interfaces y tipos dominio
  styles/            # CSS residual (tokens / utilidades)
```
**Capas lógicas:**
- Presentación (MUI components + páginas)  
- Control de flujo (router)  
- Estado transversal (contextos)  
- Acceso a datos (servicios + hooks)  
- Infraestructura (theme system / notificaciones / error boundary)  

## 8. Inventario de Componentes (MUI)
| Componente | Archivo | Función | Principales MUI usados |
|------------|---------|---------|-------------------------|
| NavBar | `components/NavBar.tsx` | Navegación + theme toggle + auth | AppBar, Toolbar, Drawer, Buttons, Icons |
| BookCard | `components/BookCard.tsx` | Tarjeta de libro | Card, Chip, Typography, Button |
| EmptyState | `components/EmptyState.tsx` | Mostrar vacío/error contextual | Card, Typography, Box |
| Notifications | `components/Notifications.tsx` | Render de cola global | Snackbar, Alert |
| Skeleton / SkeletonText / BookSkeletonGrid | `components/Skeleton.tsx` | Carga estructural | Skeleton, Card, Grid (o Box) |
| ErrorBoundary (no MUI estricto) | `components/ErrorBoundary.tsx` | Atrapar errores de render | Fallback + notificación |

## 9. Hooks Personalizados
| Hook | Archivo | Propósito | Destacado |
|------|---------|----------|-----------|
| `useFetchApi` | `hooks/useFetchApi.ts` | Fetch tipado + loading/error/refetch | Extensible para abort |
| `useLibros` / `useLibro` | `hooks/useLibros.ts` | Encapsula lógica de libros + caché | TTL interno 60s |
| `useSkeletonDelay` | `hooks/useSkeletonDelay.ts` | Controla aparición mínima de skeletons | Evita FOUC de carga |
| `useTheme` | `theme/ThemeProvider.tsx` | Exponer modo y setter | Persistencia + media query |
| `useNotification` | `context/NotificationContext.tsx` | API disparo toasts | Prevención spam repetido |
| (implícito) `useAuthContext` | `context/AuthContext.tsx` | Estado de sesión | Redirect tras login |

## 10. Contextos Globales
| Contexto | Responsabilidad | Claves expuestas |
|----------|-----------------|------------------|
| AuthContext | Sesión y login/logout | `user`, `login`, `logout`, `isAuthenticated` |
| NotificationContext | Cola de toasts | `notifications`, `addNotification`, `removeNotification` |
| ThemeProvider | Modo + tokens CSS | `mode`, `toggleMode`, `theme` |

## 11. Servicios y Acceso a Datos
| Servicio | Archivo | Funciones | Notas |
|----------|---------|----------|-------|
| API genérico | `services/apiClient.ts` | `apiGetTyped`, `apiPostTyped` | Tipado genérico por endpoint |
| Libros | `services/libros.service.ts` | `fetchLibros`, `fetchLibroById`, `clearLibrosCache` | Caché en memoria + precarga |

## 12. Sistema de Temas (Dark/Light)
**Características:**
- Objetos `nexusThemeDark` y `nexusThemeLight`.
- Traducción a variables CSS (`--color-*`, `--radius-*`, `--shadow-*`).
- Persistencia `localStorage` + fallback `prefers-color-scheme`.
- Bridge a MUI (`createTheme`) para unificar palette y shape.
- Toggle en la NavBar (icono dinámico).  

**Variables Principales:** `--color-bg`, `--color-surface`, `--color-primary`, `--color-text`, `--space-*`, `--shadow-*`.

## 13. Estilos & Design System
| Capa | Implementación | Detalle |
|------|----------------|---------|
| Tokens base | CSS variables dinámicas | Inyectadas por ThemeProvider |
| Componentes | Material UI | Theming centralizado |
| Utilidades residuales | `styles/design-system.css` | Layout, helpers flex/grid |
| Reset / baseline | `CssBaseline` (MUI) | Normalización cross-browser |

## 14. Gestión de Skeletons y Carga Progresiva
**Objetivo:** Evitar flash visual y mejorar percepción de rendimiento.

| Elemento | Implementación |
|----------|----------------|
| Hook de control | `useSkeletonDelay` (delay 150ms, min visible 300ms) |
| Skeleton catálogo | `BookSkeletonGrid` |
| Detalle libro | Skeleton estructural (título + líneas) |
| Estados vacíos | `EmptyState` en lugar de skeleton |

**Estrategia:** mostrar skeleton solo si la carga supera un umbral → mantener visible mínimo → reemplazar por datos reales o EmptyState/Alert.

**Beneficios:** menos distracción, consistencia visual, código declarativo.

## 15. Notificaciones y Manejo Global de Errores
| Elemento | Rol |
|----------|-----|
| `NotificationContext` | Cola en memoria de toasts |
| `Notifications` | Renderiza Snackbars (stack) |
| `ErrorBoundary` | Atrapa errores de render y notifica |
| `useFetchApi` | Genera notificación opcional en fallo HTTP |

**Prevención spam:** evita consecutivos idénticos antes de un éxito.  
**Accesibilidad:** `role="alert"` + cierre manual.  
**Extensible:** soporta tipos `success|info|warning|error`.

## 16. Rutas y Navegación
| Ruta | Página | Protegida | Descripción |
|------|--------|-----------|-------------|
| `/` | LandingPage | ❌ | Introducción / features |
| `/catalogo` | CatalogoPage | ❌ | Listado de libros |
| `/libro/:id` | DetalleLibroPage | ❌ | Vista de detalle |
| `/cafeteria` | CafeteriaPage | ❌ | Menú de productos |
| `/coworking` | CoworkingPage | ✅ | Slots (requiere login) |
| `/perfil` | PerfilUsuarioPage | ✅ | Datos del usuario |
| `/login` | LoginPage | ❌ | Autenticación |
| `*` | NotFoundPage | ❌ | Fallback 404 |

`ProtectedRoute` redirige a `/login` preservando `location.state.from` para retorno tras autenticación.

## 17. Accesibilidad (A11y)
- Foco visible (outline dependiente de `--color-primary`).
- Icon buttons con `aria-label` (ej: toggle tema / menú móvil).
- `aria-busy` en contenedores skeleton.
- Jerarquía semántica: `h1` aislado en landing, `h2` subsecuente en páginas internas.
- Notificaciones anunciadas con `role="alert"`.

## 18. Optimización de Rendimiento
| Técnica | Implementación |
|---------|----------------|
| Caché en servicios | Map + TTL (libros) |
| Skeleton delay | Evita flicker de <150ms |
| CSS variables | Cambios instantáneos sin recalcular hojas |
| Code-splitting (preparado) | Rutas modulares (ampliable) |
| Reutilización MUI theme | Evita recreaciones innecesarias |

## 19. Instalación y Scripts
```bash
# Clonar
git clone <repo-url>
cd amm-acti-2

# Instalar dependencias
npm install

# Desarrollo	npm run dev
# Linter     	npm run lint
# Build prod 	npm run build
# Preview    	npm run preview
```
Opcional: crear `.env` para `VITE_API_BASE_URL` si se requiere cambiar origen de datos.

## 20. Roadmap / Mejores Futuras
| Ítem | Estado | Próximo Paso |
|------|--------|--------------|
| Búsqueda catálogo | ❌ | Añadir filtro client/server |
| Favoritos usuario | ❌ | Context + persistencia local |
| Reserva coworking | ❌ | POST simulado + feedback |
| PWA / Offline | ❌ | Service Worker + manifest |
| Tests unitarios | ❌ | Vitest / React Testing Library |
| Logging remoto | ❌ | Sentry / endpoint propio |
| Internacionalización | ❌ | i18n (ES/EN) |

## 21. Rúbrica / Cobertura
| Criterio | Evidencia | Cumplido |
|----------|-----------|----------|
| Landing | LandingPage con grid | ✅ |
| 5+ vistas | Catálogo, Detalle, Coworking, Cafetería, Perfil, Login | ✅ |
| Rutas + protegida | React Router + ProtectedRoute | ✅ |
| Custom hook | `useFetchApi`, `useSkeletonDelay` | ✅ |
| Hooks core | useState/useEffect/useContext en páginas | ✅ |
| API simulada | Servicios + hooks | ✅ |
| Video (pendiente) | Guion seccionado | ⏳ |
| Manejo estados carga | Skeleton + EmptyState + Alerts | ✅ |
| Tema y estilo | MUI + ThemeProvider + tokens | ✅ |

## 22. Conclusiones Técnicas
La solución implementa **separación de responsabilidades**, una **capa de datos desacoplada** y un **tema extensible** integrado con MUI, logrando una base sólida para futuras ampliaciones (persistencia real, comercio electrónico, PWA). Las decisiones de UX (skeleton delay, notificaciones discretas, modo oscuro persistente) mejoran la percepción de calidad y reducen fricción de uso.

## 23. Anexos
### 23.1 Ejemplo de Uso de `useFetchApi`
```ts
const { data, loading, error, refetch } = useFetchApi('/books');
```
### 23.2 Disparo de Notificación Manual
```ts
const { addNotification } = useNotification();
addNotification({ type: 'success', message: 'Operación completada' });
```
### 23.3 Toggle Tema en un Componente
```tsx
const { mode, toggleMode } = useTheme();
<Button onClick={toggleMode}>{mode === 'dark' ? 'Claro' : 'Oscuro'}</Button>
```
---
**Contacto / Autor:** (Completar)  
**Demo:** (URL despliegue cuando esté disponible)

> Documento vivo: actualizar al añadir nuevas características.
