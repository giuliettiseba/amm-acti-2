import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import LandingPage from './pages/LandingPage';
import CatalogoPage from './pages/CatalogoPage';
import DetalleLibroPage from './pages/DetalleLibroPage';
import CoworkingPage from './pages/CoworkingPage';
import CafeteriaPage from './pages/CafeteriaPage';
import PerfilUsuarioPage from './pages/PerfilUsuarioPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { ProtectedRoute } from './router/ProtectedRoute';
import NavBar from './components/NavBar';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <Box component="main" sx={{ flex: 1 }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/catalogo" element={<CatalogoPage />} />
            <Route path="/libro/:id" element={<DetalleLibroPage />} />
            <Route path="/cafeteria" element={<CafeteriaPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/coworking" element={<CoworkingPage />} />
              <Route path="/perfil" element={<PerfilUsuarioPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Container>
      </Box>
      <Box component="footer" sx={{ py: 2, textAlign: 'center', color: 'text.secondary', fontSize: '0.875rem' }}>
        © {new Date().getFullYear()} Nexus Librería Universitaria – Proyecto Académico
      </Box>
    </Box>
  );
}

export default App;
