import { useState, useEffect } from 'react';
import { useSkeletonDelay } from '../hooks/useSkeletonDelay';
import { useCafeteria } from '../hooks/useCafeteria';
import GaleriaProductos from '../components/GaleriaProductos';
import { Skeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Alert,
  CircularProgress,
  IconButton,
  Fade
} from '@mui/material';
import { Refresh, LocalCafe, ArrowBack } from '@mui/icons-material';

export default function CafeteriaPage() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [visibleCategorias, setVisibleCategorias] = useState<number[]>([]);
  const [visibleProductos, setVisibleProductos] = useState<number[]>([]);

  // Usar el hook específico de cafetería
  const {
    categorias,
    productos,
    loadingCategorias,
    loadingProductos,
    errorCategorias,
    errorProductos,
    refetchCategorias,
    refetchProductos,
    loadProductosByCategoria,
    clearProductos
  } = useCafeteria();

  const showSkeletonCategorias = useSkeletonDelay(loadingCategorias);
  const showSkeletonProductos = useSkeletonDelay(loadingProductos);

  // Efecto para mostrar categorías con animación secuencial
  useEffect(() => {
    if (!loadingCategorias && categorias && categorias.length > 0 && !showSkeletonCategorias) {
      setVisibleCategorias([]);
      categorias.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCategorias(prev => [...prev, index]);
        }, index * 150); // 150ms de delay entre cada elemento
      });
    }
  }, [loadingCategorias, categorias, showSkeletonCategorias]);

  // Efecto para mostrar productos con animación secuencial
  useEffect(() => {
    if (!loadingProductos && productos && productos.length > 0 && !showSkeletonProductos) {
      setVisibleProductos([]);
      productos.forEach((_, index) => {
        setTimeout(() => {
          setVisibleProductos(prev => [...prev, index]);
        }, index * 100); // 100ms de delay entre cada elemento
      });
    }
  }, [loadingProductos, productos, showSkeletonProductos]);

  // Resetear animaciones al cambiar de vista
  useEffect(() => {
    if (loadingCategorias) {
      setVisibleCategorias([]);
    }
    if (loadingProductos) {
      setVisibleProductos([]);
    }
  }, [loadingCategorias, loadingProductos]);

  const handleCategoriaClick = async (nombreCategoria: string) => {
    setCategoriaSeleccionada(nombreCategoria);
    await loadProductosByCategoria(nombreCategoria);
  };

  const handleVolverCategorias = () => {
    setCategoriaSeleccionada(null);
    clearProductos();
  };

  const refetch = categoriaSeleccionada ?
    () => loadProductosByCategoria(categoriaSeleccionada) :
    refetchCategorias;
  const loading = categoriaSeleccionada ? loadingProductos : loadingCategorias;
  const error = categoriaSeleccionada ? errorProductos : errorCategorias;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {categoriaSeleccionada && (
            <IconButton onClick={handleVolverCategorias} color="primary">
              <ArrowBack />
            </IconButton>
          )}
          <Box>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 0.5 }}>
              {categoriaSeleccionada ? categoriaSeleccionada : 'Cafetería'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {categoriaSeleccionada
                ? 'Selecciona un producto de esta categoría'
                : 'Explora nuestras categorías de productos'
              }
            </Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
          disabled={loading}
          onClick={refetch}
          startIcon={loading ? <CircularProgress size={16} /> : <Refresh />}
          size="small"
        >
          {loading ? 'Actualizando…' : 'Refrescar'}
        </Button>
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

      {/* Vista de Categorías */}
      {!categoriaSeleccionada && (
        <>
          {showSkeletonCategorias && !errorCategorias && (
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              justifyContent: 'flex-start',
              alignItems: 'stretch'
            }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} sx={{
                  minWidth: 280,
                  maxWidth: 320,
                  flex: '1 1 280px',
                  height: 280
                }}>
                  <Skeleton width="100%" height={160} />
                  <CardContent>
                    <Skeleton width="70%" height={20} />
                    <Box sx={{ mt: 1 }}>
                      <Skeleton width="100%" height={14} />
                    </Box>
                    <Box sx={{ mt: 0.5 }}>
                      <Skeleton width="85%" height={14} />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {!loadingCategorias && !errorCategorias && categorias && categorias.length > 0 && (
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              justifyContent: 'flex-start',
              alignItems: 'stretch'
            }}>
              {categorias.map((categoria, index) => (
                <Fade in={visibleCategorias.includes(index)} key={index} timeout={500}>
                  <Card
                    sx={{
                      minWidth: 280,
                      maxWidth: 320,
                      flex: '1 1 280px',
                      height: 280,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3
                      }
                    }}
                    onClick={() => handleCategoriaClick(categoria.nombre)}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={categoria.imagen}
                      alt={categoria.nombre}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 1 }}>
                        {categoria.nombre}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {categoria.descripcion}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              ))}
            </Box>
          )}

          {!loadingCategorias && !errorCategorias && (!categorias || categorias.length === 0) && (
            <EmptyState
              title="Sin categorías"
              description="Aún no hay categorías disponibles en la cafetería."
              icon={<LocalCafe />}
              action={
                <Button variant="outlined" onClick={refetchCategorias} startIcon={<Refresh />}>
                  Actualizar
                </Button>
              }
            />
          )}
        </>
      )}

      {/* Vista de Productos */}
      {categoriaSeleccionada && (
        <>
          {showSkeletonProductos && !errorProductos && (
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              justifyContent: 'flex-start',
              alignItems: 'stretch'
            }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} sx={{
                  minWidth: 240,
                  maxWidth: 280,
                  flex: '1 1 240px',
                  height: 300
                }}>
                  <Skeleton width="100%" height={180} />
                  <CardContent>
                    <Skeleton width="80%" height={18} />
                    <Box sx={{ mt: 1 }}>
                      <Skeleton width="60%" height={14} />
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <Skeleton width="40%" height={16} />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {!loadingProductos && !errorProductos && productos && productos.length > 0 && (
            <GaleriaProductos productos={productos} visibleItems={visibleProductos} />
          )}

          {!loadingProductos && !errorProductos && (!productos || productos.length === 0) && (
            <EmptyState
              title="Sin productos"
              description={`No hay productos disponibles en la categoría "${categoriaSeleccionada}".`}
              icon={<LocalCafe />}
              action={
                <Button variant="outlined" onClick={refetchProductos} startIcon={<Refresh />}>
                  Actualizar
                </Button>
              }
            />
          )}
        </>
      )}
    </Box>
  );
}
