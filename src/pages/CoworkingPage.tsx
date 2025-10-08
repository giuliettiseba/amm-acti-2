import { useFetchApi } from '../hooks/useFetchApi';
import { API_ROUTES } from '../constants/apiRoutes';
import type { CoworkingSlot } from '../types';
import { useSkeletonDelay } from '../hooks/useSkeletonDelay';
import { EmptyState } from '../components/EmptyState';
import { Skeleton } from '../components/Skeleton';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import { Refresh, Work, CheckCircle, Cancel } from '@mui/icons-material';

export default function CoworkingPage() {
  const { data, loading, error, refetch } = useFetchApi<CoworkingSlot[]>(API_ROUTES.COWORKING, { resourceName: 'Coworking' });
  const showSkeleton = useSkeletonDelay(loading);

  return (
    <Box sx={{ maxWidth: 760, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
        <Box>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Zona de Co-working
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Consulta disponibilidad de espacios.
          </Typography>
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

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6">Error al cargar</Typography>
          <Typography variant="body2">{error}</Typography>
          <Button variant="contained" onClick={refetch} sx={{ mt: 2 }}>
            Reintentar
          </Button>
        </Alert>
      )}

      {showSkeleton && !error && (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(auto-fit, minmax(200px, 1fr))',
            md: 'repeat(auto-fit, minmax(240px, 1fr))',
            lg: 'repeat(auto-fit, minmax(280px, 1fr))'
          },
          gap: { xs: 1.5, sm: 2 },
          justifyContent: 'center',
          placeItems: 'stretch'
        }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} sx={{
              minHeight: 120,
              width: '100%'
            }}>
              <CardContent>
                <Skeleton width="55%" height={14} />
                <Skeleton width="35%" height={10} />
                <Skeleton width="25%" height={8} />
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {!loading && !error && data && data.length > 0 && (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(auto-fit, minmax(200px, 1fr))',
            md: 'repeat(auto-fit, minmax(240px, 1fr))',
            lg: 'repeat(auto-fit, minmax(280px, 1fr))'
          },
          gap: { xs: 1.5, sm: 2 },
          justifyContent: 'center',
          placeItems: 'stretch'
        }}>
          {data.map(slot => (
            <Card key={slot.id} sx={{
              height: '100%',
              width: '100%'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                    {slot.fecha}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {slot.hora}
                  </Typography>
                </Box>

                <Chip
                  label={slot.disponible ? 'Disponible' : 'Ocupado'}
                  color={slot.disponible ? 'success' : 'error'}
                  variant={slot.disponible ? 'filled' : 'outlined'}
                  size="small"
                  icon={slot.disponible ? <CheckCircle /> : <Cancel />}
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {!loading && !error && (!data || data.length === 0) && (
        <EmptyState
          title="Sin disponibilidad"
          description="No hay slots de co-working en este momento."
          icon={<Work />}
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
