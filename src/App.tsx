import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { Suspense, lazy } from 'react';
import { ProtectedRoute } from './router/ProtectedRoute';
import NavBar from './components/NavBar';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const CatalogoPage = lazy(() => import('./pages/CatalogoPage'));
const CoworkingPage = lazy(() => import('./pages/CoworkingPage'));
const CafeteriaPage = lazy(() => import('./pages/CafeteriaPage'));
const PerfilUsuarioPage = lazy(() => import('./pages/PerfilUsuarioPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ReservaPage = lazy(() => import('./pages/ReservaPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const PedidoResumenPage = lazy(() => import('./pages/PedidoResumenPage'));

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <Box component="main" sx={{ flex: 1 }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Suspense fallback={<div>Cargando...</div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/catalogo" element={<CatalogoPage />} />
              <Route path="/cafeteria" element={<CafeteriaPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/pedido-resumen" element={<PedidoResumenPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/coworking" element={<CoworkingPage />} />
                <Route path="/reserva/:roomId" element={<ReservaPage />} />
                <Route path="/perfil" element={<PerfilUsuarioPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Container>
      </Box>
      <Box component="footer" sx={{ py: 2, textAlign: 'center', color: 'text.secondary', fontSize: '0.875rem' }}>
        © {new Date().getFullYear()} Nexus Librería Universitaria – Proyecto Académico
      </Box>
    </Box>
  );
}

export default App;
