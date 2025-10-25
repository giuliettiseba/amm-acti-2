import { useState, useEffect } from 'react';
import { useFetchApi } from '../hooks/useFetchApi';
import { API_ROUTES } from '../constants/apiRoutes';
import { Skeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import CardLibro from '../components/CardLibro';
import { useSkeletonDelay } from '../hooks/useSkeletonDelay';
import type { Libro } from '../types';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Alert,
  TextField,
  InputAdornment
} from '@mui/material';
import { Refresh, MenuBook, Search } from '@mui/icons-material';
import DialogDetallesLibro from '../components/DialogDetallesLibro';

export default function CatalogoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleLibros, setVisibleLibros] = useState<number[]>([]);
  const [selectedLibro, setSelectedLibro] = useState<Libro | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch libros
  const {
    data: libros,
    loading,
    error,
    refetch
  } = useFetchApi<Libro[]>(API_ROUTES.BOOKS, { resourceName: 'Libros' });

  const showSkeleton = useSkeletonDelay(loading);

  // Filtrar libros según término de búsqueda
  const librosFiltrados = libros?.filter(libro =>
    libro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    libro.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    libro.categoria?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Efecto para mostrar libros con animación secuencial
  useEffect(() => {
    if (!loading && librosFiltrados && librosFiltrados.length > 0 && !showSkeleton) {
      setVisibleLibros([]);
      librosFiltrados.forEach((_, index) => {
        setTimeout(() => {
          setVisibleLibros(prev => [...prev, index]);
        }, index * 100); // 100ms de delay entre cada elemento
      });
    }
  }, [loading, showSkeleton, librosFiltrados.length]); // Cambio aquí

  // Resetear animaciones al cambiar filtro o cargar
  useEffect(() => {
    if (loading) {
      setVisibleLibros([]);
    }
  }, [loading]);

  // Resetear animaciones cuando cambia el término de búsqueda
  useEffect(() => {
    if (librosFiltrados.length > 0 && !loading && !showSkeleton) {
      setVisibleLibros([]);
      librosFiltrados.forEach((_, index) => {
        setTimeout(() => {
          setVisibleLibros(prev => [...prev, index]);
        }, index * 100);
      });
    }
  }, [searchTerm, librosFiltrados.length, loading, showSkeleton]); // Cambio aquí

  return (
    <Box sx={{ maxWidth: 1200,  mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 , alignItems: 'center', textAlign: 'center' }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
          Catálogo de Libros
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Explora nuestra amplia colección de libros académicos y literatura
        </Typography>

        {/* Search Bar */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Buscar por título, autor o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      {/* Error handling */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6">Error al cargar</Typography>
          <Typography variant="body2">{error}</Typography>
          <Button variant="contained" onClick={refetch} sx={{ mt: 2 }}>
            Reintentar
          </Button>
        </Alert>
      )}

      {/* Skeletons */}
      {showSkeleton && !error && (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(auto-fit, minmax(250px, 1fr))',
            md: 'repeat(auto-fit, minmax(280px, 1fr))',
            lg: 'repeat(auto-fit, minmax(320px, 1fr))'
          },
          gap: { xs: 2, sm: 3 },
          justifyItems: 'center'
        }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <Card key={i} sx={{
              width: '100%',
              maxWidth: 320,
              height: 400
            }}>
              <Skeleton width="100%" height={200} />
              <CardContent>
                <Skeleton width="80%" height={20} />
                <Box sx={{ mt: 1 }}>
                  <Skeleton width="60%" height={16} />
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Skeleton width="40%" height={14} />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Skeleton width="100%" height={14} />
                </Box>
                <Box sx={{ mt: 0.5 }}>
                  <Skeleton width="90%" height={14} />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Libros */}
      {!loading && !error && librosFiltrados && librosFiltrados.length > 0 && (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(auto-fit, minmax(250px, 1fr))',
            md: 'repeat(auto-fit, minmax(280px, 1fr))',
            lg: 'repeat(auto-fit, minmax(320px, 1fr))'
          },
          gap: { xs: 2, sm: 3 },
          justifyItems: 'center'
        }}>
          {librosFiltrados.map((libro, index) => (
            <CardLibro
              key={libro.id}
              libro={libro}
              isVisible={visibleLibros.includes(index)}
              onClick={() => {
                setSelectedLibro(libro);
                setDialogOpen(true);
              }}
            />
          ))}
        </Box>
      )}
      <DialogDetallesLibro
        libro={selectedLibro}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />

      {/* Empty states */}
      {!loading && !error && searchTerm && librosFiltrados.length === 0 && (
        <EmptyState
          title="Sin resultados"
          description={`No se encontraron libros que coincidan con "${searchTerm}".`}
          icon={<Search />}
          action={
            <Button variant="outlined" onClick={() => setSearchTerm('')}>
              Limpiar búsqueda
            </Button>
          }
        />
      )}

      {!loading && !error && (!libros || libros.length === 0) && (
        <EmptyState
          title="Sin libros"
          description="Aún no hay libros disponibles en el catálogo."
          icon={<MenuBook />}
          action={
            <Button variant="outlined" onClick={refetch} startIcon={<Refresh />}>
              Actualizar
            </Button>
          }
        />
      )}
    </Box>
  );
}
