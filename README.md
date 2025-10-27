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
- **Última actualización:** 2025-10-26
- **Actividad:** Nº 2 – SPA con API simulada
- **Autores:** (añadir en `Autores.txt` si es grupal)  

## 2. Resumen Ejecutivo
Aplicación web **SPA** construida con **React + TypeScript + Vite + Material UI (MUI)** que simula una plataforma integral para una librería universitaria con módulos de catálogo de libros, sistema de reservas de coworking, cafetería con carrito de compras, y perfil de usuario autenticado. Se implementó un **sistema de temas dark/light** con glass morphism, **rutas protegidas**, **carga progresiva con skeletons**, **notificaciones globales accesibles**, **carrito de compras unificado** con persistencia, **generación de códigos QR** para pedidos, y una capa de **servicios desacoplada** de las vistas con 4 contextos globales y 5 servicios API independientes.

## 3. Objetivos Académicos
1. Aplicar patrones modernos de desarrollo en React con tipado estático.  
2. Asegurar separación de capas (presentación / datos / estado).  
3. Implementar temas dinámicos y UI responsiva profesional.  
4. Emplear Context API + custom hooks para estado transversal.  
5. Consumir una API mock simulando endpoints reales.  
6. Optimizar UX de carga (skeletons + estado vacío + error).  
7. Preparar base escalable para futuras integraciones reales.  

## 4. Alcance Funcional
- Catálogo navegable de libros con diálogos de detalle.
- Carrito de compras unificado (libros + productos cafetería).
- Módulo coworking con sistema de reservas de salas.
- Módulo cafetería con filtrado por categorías.
- Resumen de pedido con generación de código QR.
- Perfil de usuario (tras login).
- Login + registro de usuarios con validación.
- Rutas protegidas con redirección automática.
- Notificaciones globales y manejo de errores.
- Tema dark/light con persistencia y glass morphism.  

## 5. Requisitos Funcionales y Estado
| Código | Descripción | Estado | Implementación |
|--------|-------------|--------|----------------|
| RF-01 | Landing Page | ✅ | `LandingPage` + MUI Cards/Grid |
| RF-02 | ≥5 vistas adicionales | ✅ | Catálogo, Coworking, Cafetería, Perfil, Login, Reserva, PedidoResumen |
| RF-03 | Login + Registro | ✅ | `AuthContext` + `DialogCrearUsuario` + formulario MUI |
| RF-04 | Ruta protegida | ✅ | `ProtectedRoute` |
| RF-05 | Consumo API mock | ✅ | `apiClient`, hooks y servicios múltiples |
| RF-06 | Catálogo libros | ✅ | `useLibros` + `GenericCard` |
| RF-07 | Detalle libro | ✅ | `DialogDetallesLibro` + skeletons |
| RF-08 | Módulo coworking | ✅ | `CoworkingPage` + `ReservaPage` + `useRooms` |
| RF-09 | Módulo cafetería | ✅ | `CafeteriaPage` + `useCafeteria` + filtrado por categorías |
| RF-10 | Perfil usuario | ✅ | `PerfilUsuarioPage` |
| RF-11 | Tema dark / light | ✅ | `ThemeProvider` + variables CSS + MUI theme bridge |
| RF-12 | Notificaciones globales | ✅ | `NotificationContext` + Snackbar MUI |
| RF-13 | Skeletons estratégicos | ✅ | `useSkeletonDelay` + componentes |
| RF-14 | Error boundary | ✅ | `ErrorBoundary` + `ErrorBoundaryNotifier` |
| RF-15 | Carrito de compras | ✅ | `OrderContext` + `CartDrawer` + persistencia localStorage |
| RF-16 | Resumen de pedido | ✅ | `PedidoResumenPage` + generación de QR |
| RF-17 | Sistema de reservas | ✅ | `ReservaPage` + formulario con preferencias |

## 6. Tecnologías y Stack
| Área | Herramienta | Notas |
|------|-------------|-------|
| Core | React 19 + TS | SPA moderna |
| Build | Vite | Dev server + build rápido |
| UI | Material UI (MUI) | Componentes + theme system |
| Estilos bajos | CSS variables + Styled Components | Inyectadas dinámicamente + glass morphism |
| Estado global | Context API | Auth / Notificaciones / Tema / Carrito |
| Enrutado | React Router v7 | Rutas protegidas |
| Tipado | TypeScript | Contratos fuertes |
| Notificaciones | Snackbar/Alert | MUI + accesible |
| QR | qrcode.react | Generación de códigos QR para pedidos |
| Persistencia | localStorage | Carrito de compras |

## 7. Arquitectura & Estructura
```
src/
  components/        # Presentación reutilizable (GenericCard, CartDrawer, Dialogs, etc.)
  context/           # State global (Auth, Theme, Notifications, Order)
  providers/         # Providers de contextos (Auth, Theme, Notifications, Order)
  hooks/             # Lógica reutilizable: datos / UX (useLibros, useCafeteria, useRooms)
  pages/             # Vistas (routing targets) - 9 páginas
  services/          # Acceso a API (libros, cafetería, rooms, user)
  router/            # Configuración de rutas (ProtectedRoute)
  theme/             # Objetos de tema y provider puente MUI
  types/             # Interfaces y tipos dominio (30+ tipos)
  constants/         # Constantes (API routes)
  assets/            # Recursos estáticos
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
| NavBar | `components/NavBar.tsx` | Navegación + theme toggle + auth + carrito | AppBar, Toolbar, Drawer, Buttons, Icons, Badge |
| GenericCard | `components/GenericCard.tsx` | Tarjeta genérica reutilizable con glass effect | Card, Button, Fade, styled components |
| CartDrawer | `components/CartDrawer.tsx` | Drawer de carrito de compras | Drawer, List, TextField, Button, Divider |
| DialogCrearUsuario | `components/DialogCrearUsuario.tsx` | Diálogo para registro de usuarios | Dialog, TextField, Alert, CircularProgress |
| DialogDetallesLibro | `components/DialogDetallesLibro.tsx` | Diálogo modal de detalles de libro | Dialog, Typography, Button |
| CardEmptyState | `components/CardEmptyState.tsx` | Mostrar vacío/error contextual | Card, Typography, Box |
| Notifications | `components/Notifications.tsx` | Render de cola global | Snackbar, Alert |
| Skeleton / SkeletonText / BookSkeletonGrid | `components/Skeleton.tsx` | Carga estructural | Skeleton, Card, Grid (o Box) |
| ErrorBoundary / ErrorBoundaryNotifier | `components/ErrorBoundary.tsx` | Atrapar errores de render | Fallback + notificación |

## 9. Hooks Personalizados
| Hook | Archivo | Propósito | Destacado |
|------|---------|----------|-----------|
| `useLibros` / `useLibro` | `hooks/useLibros.ts` | Encapsula lógica de libros + caché | TTL interno 60s |
| `useCafeteria` | `hooks/useCafeteria.ts` | Gestiona categorías y productos de cafetería | Carga por categoría + refetch |
| `useRooms` | `hooks/useRooms.ts` | Gestiona salas de coworking | Carga y refetch de salas |
| `useSkeletonDelay` | `hooks/useSkeletonDelay.ts` | Controla aparición mínima de skeletons | Evita FOUC de carga |
| `useTheme` | `theme/ThemeProvider.tsx` | Exponer modo y setter | Persistencia + media query |
| `useNotification` | `context/NotificationContext.tsx` | API disparo toasts | Prevención spam repetido |
| `useOrder` | `context/OrderContext.tsx` | Gestión de carrito de compras | Integrado en OrderContext |
| `useAuthContext` | `context/AuthContext.tsx` | Estado de sesión | Redirect tras login |

## 10. Contextos Globales
| Contexto | Responsabilidad | Claves expuestas |
|----------|-----------------|------------------|
| AuthContext | Sesión y login/logout | `user`, `login`, `logout`, `isAuthenticated` |
| NotificationContext | Cola de toasts | `notifications`, `addNotification`, `removeNotification` |
| OrderContext | Gestión de carrito de compras | `carrito`, `agregarProducto`, `agregarLibro`, `quitarItem`, `limpiarCarrito`, `actualizarCantidad` |
| ThemeContext | Modo + tokens CSS | `mode`, `toggleMode`, `theme` |

## 11. Servicios y Acceso a Datos
| Servicio | Archivo | Funciones | Notas |
|----------|---------|----------|-------|
| API genérico | `services/apiClient.ts` | `apiGet`, `apiPost` | Tipado genérico por endpoint |
| Libros | `services/libros.service.ts` | `fetchLibros`, `fetchLibroById`, `clearLibrosCache` | Caché en memoria + precarga |
| Cafetería | `services/cafeteria.service.ts` | `getCategorias`, `getProductosByCategoria` | Query params para filtrado |
| Salas (Coworking) | `services/rooms.service.ts` | `getRooms`, `createReservation` | Gestión de salas y reservas |
| Usuarios | `services/user.service.ts` | `login`, `createUser` | Autenticación y registro |

## 12. Sistema de Temas (Dark/Light)
**Características:**
- Objetos `nexusThemeDark` y `nexusThemeLight` en `theme/nexusTheme.ts`.
- Traducción a variables CSS (`--color-*`, `--radius-*`, `--shadow-*`).
- Persistencia `localStorage` + fallback `prefers-color-scheme`.
- Bridge a MUI (`createTheme`) para unificar palette y shape.
- Toggle en la NavBar (icono dinámico).
- Integración con styled-components para glass morphism en `GenericCard`.
- ThemeContext y ThemeProvider separados para mejor modularidad.

**Variables Principales:** `--color-bg`, `--color-surface`, `--color-primary`, `--color-text`, `--space-*`, `--shadow-*`.

**Archivos del sistema de temas:**
- `theme/nexusTheme.ts` - Definición de temas
- `theme/ThemeContext.tsx` - Contexto de tema
- `theme/ThemeProvider.tsx` - Provider principal
- `theme/ThemeContextValue.ts` - Tipos del contexto
- `theme/ThemeProviderProps.ts` - Props del provider
- `theme/UseTheme.ts` - Hook useTheme

## 13. Estilos & Design System
| Capa | Implementación | Detalle |
|------|----------------|---------|
| Tokens base | CSS variables dinámicas | Inyectadas por ThemeProvider |
| Componentes | Material UI + Styled Components | Theming centralizado + glass morphism |
| Glass Effect | `GenericCard` con styled API | Backdrop blur, gradientes, sombras adaptativas |
| Reset / baseline | `CssBaseline` (MUI) | Normalización cross-browser |

**Glass Morphism en GenericCard:**
- Background semi-transparente con `backdrop-filter: blur(16px)`
- Bordes sutiles y sombras tintadas con color primario
- Gradientes decorativos con radial-gradient
- Animaciones suaves de hover (translateY + box-shadow)
- Pseudo-elementos para highlights y blobs de color

## 14. Gestión de Skeletons y Carga Progresiva
**Objetivo:** Evitar flash visual y mejorar percepción de rendimiento.

| Elemento | Implementación |
|----------|----------------|
| Hook de control | `useSkeletonDelay` (delay 150ms, min visible 300ms) |
| Skeleton catálogo | `BookSkeletonGrid` |
| Detalle libro | Skeleton estructural (título + líneas) |
| Estados vacíos | `CardEmptyState` en lugar de skeleton |

**Estrategia:** mostrar skeleton solo si la carga supera un umbral → mantener visible mínimo → reemplazar por datos reales o CardEmptyState/Alert.

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
| `/cafeteria` | CafeteriaPage | ❌ | Menú de productos por categorías |
| `/coworking` | CoworkingPage | ✅ | Listado de salas (requiere login) |
| `/reserva/:roomId` | ReservaPage | ✅ | Formulario de reserva de sala |
| `/pedido-resumen` | PedidoResumenPage | ❌ | Resumen y finalización de pedido con QR |
| `/perfil` | PerfilUsuarioPage | ✅ | Datos del usuario |
| `/login` | LoginPage | ❌ | Autenticación y registro |
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
| localStorage | Persistencia de carrito sin llamadas API |
| Contextos separados | AuthContext, OrderContext, NotificationContext, ThemeContext |
| Providers modulares | AuthProvider, OrderProvider, NotificationProvider, ThemeProvider |
| useCallback/useMemo | En hooks personalizados para evitar re-renders |

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

## 20. Roadmap / Mejoras Futuras
| Ítem | Estado | Próximo Paso |
|------|--------|--------------|
| Búsqueda catálogo | ❌ | Añadir filtro client/server |
| Favoritos usuario | ❌ | Context + persistencia local |
| PWA / Offline | ❌ | Service Worker + manifest |
| Tests unitarios | ❌ | Vitest / React Testing Library |
| Logging remoto | ❌ | Sentry / endpoint propio |
| Internacionalización | ❌ | i18n (ES/EN) |
| Pago electrónico | ❌ | Integración pasarela de pago |

## 21. Features Implementados
| Feature | Descripción |
|---------|-------------|
| Reserva coworking | Sistema de reservas completo con formularios avanzados (datetime-local, multi-select). |
| Carrito de compras | Contexto unificado para libros y productos de cafetería con persistencia en localStorage. |
| Generación QR pedidos | Generación dinámica de códigos QR para pedidos en la página de resumen. |
| Registro de usuarios | Formulario de registro con validación y autenticación. |

## 22. Rúbrica / Cobertura
| Criterio | Evidencia | Cumplido |
|----------|-----------|----------|
| Landing | LandingPage con grid | ✅ |
| 5+ vistas | 9 páginas: Catálogo, Coworking, Cafetería, Perfil, Login, Reserva, PedidoResumen, NotFound, Landing | ✅ |
| Rutas + protegida | React Router v7 + ProtectedRoute | ✅ |
| Custom hooks | `useLibros`, `useCafeteria`, `useRooms`, `useSkeletonDelay`, `useOrder` | ✅ |
| Hooks core | useState/useEffect/useContext/useCallback en páginas y componentes | ✅ |
| API simulada | 5 servicios + múltiples hooks | ✅ |
| Contextos | AuthContext, NotificationContext, OrderContext, ThemeContext | ✅ |
| Providers | AuthProvider, NotificationProvider, OrderProvider, ThemeProvider | ✅ |
| Componentes avanzados | GenericCard con glass morphism, CartDrawer, Dialogs modales | ✅ |
| TypeScript | 30+ tipos e interfaces en /types | ✅ |
| Manejo estados carga | Skeleton + CardEmptyState + Alerts + CircularProgress | ✅ |
| Tema y estilo | MUI + ThemeProvider + CSS variables + styled-components | ✅ |
| Persistencia | localStorage para carrito | ✅ |
| QR Code | Generación en PedidoResumenPage | ✅ |
| Video (pendiente) | Guion seccionado | ⏳ |

## 22. Conclusiones Técnicas
La solución implementa **separación de responsabilidades**, una **capa de datos desacoplada** y un **tema extensible** integrado con MUI, logrando una base sólida para futuras ampliaciones (persistencia real, comercio electrónico, PWA). Las decisiones de UX (skeleton delay, notificaciones discretas, modo oscuro persistente, glass morphism) mejoran la percepción de calidad y reducen fricción de uso.

**Logros destacados:**
- Sistema de carrito unificado para libros y productos de cafetería con persistencia en localStorage
- Arquitectura modular con separación clara entre contexts y providers
- Sistema de reservas completo con formularios avanzados (datetime-local, multi-select)
- Generación dinámica de códigos QR para pedidos
- Componentes reutilizables con styled-components y efectos visuales modernos (glass morphism)
- 5 servicios API independientes con tipado fuerte en TypeScript
- Sistema de temas robusto con 6 archivos modulares para máxima flexibilidad

## 23. Anexos
### 23.1 Ejemplo de Uso de Hooks Personalizados
```ts
// Hook de libros
const { data: libros, loading, error } = useLibros();

// Hook de cafetería
const { categorias, productos, loadProductosByCategoria } = useCafeteria();
await loadProductosByCategoria('bebidas');

// Hook de salas
const { data: rooms, loading, refetch } = useRooms();
```

### 23.2 Gestión del Carrito de Compras
```ts
const { carrito, agregarProducto, agregarLibro, quitarItem, limpiarCarrito } = useOrder();

// Agregar producto de cafetería
agregarProducto(producto, cantidad);

// Agregar libro
agregarLibro(libro, cantidad);

// Limpiar carrito
limpiarCarrito();
```

### 23.3 Disparo de Notificación Manual
```ts
const { addNotification } = useNotification();
addNotification({ type: 'success', message: 'Operación completada' });
addNotification({ type: 'error', message: 'Error en la operación' });
```

### 23.4 Toggle Tema en un Componente
```tsx
const { mode, toggleMode } = useTheme();
<Button onClick={toggleMode}>{mode === 'dark' ? 'Claro' : 'Oscuro'}</Button>
```

### 23.5 Uso de GenericCard
```tsx
<GenericCard
  title="Producto"
  subtitle="Subtítulo"
  description="Descripción del producto"
  price={10.99}
  category="Categoría"
  image="/image.jpg"
  isVisible={true}
  addToCart={() => handleAddToCart()}
  addToCartText="Añadir al carrito"
  showDetails={() => handleShowDetails()}
/>
```

## 24. Cambios recientes (2025-10-25)
- Refactorización: todos los componentes de tipo Card (GenericCard, RoomInfoCard, ReservaFormCard, PerfilUsuarioCard, LoginCard, LandingFeatureCard) se movieron a la carpeta `src/components/Cards/` para una mejor organización y escalabilidad.
- Documentación: se añadieron comentarios JSDoc detallados a todos los hooks personalizados y páginas principales para facilitar el mantenimiento y la comprensión del código.
- Glassmorphism: el efecto glass se aplica en todas las tarjetas principales usando el sistema de temas y variables CSS.
- Notificaciones: ahora se muestran en la esquina inferior derecha y son accesibles.
- Skeletons: se mejoró la gestión de carga progresiva con el hook `useSkeletonDelay` y componentes de skeleton dedicados.
- Accesibilidad: mejoras en roles ARIA, foco visible y jerarquía semántica.
- Estructura: se consolidó la arquitectura de carpetas para separar lógica, presentación y estado global.

---
**Contacto / Autor:** (Completar)  
**Demo:** (URL despliegue cuando esté disponible)

> Documento vivo: actualizar al añadir nuevas características.
