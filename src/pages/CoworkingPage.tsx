import { useRooms } from '../hooks/useRooms';
import type { Room } from '../types';
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
import { Refresh, Work, People, LocationOn, Euro } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function CoworkingPage() {
  const { data: rooms, loading, error, refetch } = useRooms();
  const showSkeleton = useSkeletonDelay(loading);
  const navigate = useNavigate();

  const handleReserve = (roomId: number) => {
    navigate(`/reserva/${roomId}`);
  };

  const getCapacityColor = (capacity: Room['capacity']) => {
    switch (capacity) {
      case '1': return 'default';
      case '2-4': return 'primary';
      case '5-8': return 'secondary';
      case '9+': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1 }}>
        <Box>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Salas de Co-working
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Encuentra la sala perfecta para tu equipo.
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
          <Typography variant="h6">Error al cargar salas</Typography>
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
            sm: 'repeat(auto-fit, minmax(280px, 1fr))',
            md: 'repeat(auto-fit, minmax(320px, 1fr))',
            lg: 'repeat(auto-fit, minmax(350px, 1fr))'
          },
          gap: { xs: 2, sm: 3 },
          justifyContent: 'center'
        }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} sx={{ minHeight: 200 }}>
              <CardContent>
                <Skeleton width="70%" height={20} />
                <Box sx={{ mt: 1 }}>
                  <Skeleton width="40%" height={16} />
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Skeleton width="30%" height={14} />
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Skeleton width="50%" height={14} />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Skeleton width="100%" height={36} />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {!loading && !error && rooms && rooms.length > 0 && (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(auto-fit, minmax(280px, 1fr))',
            md: 'repeat(auto-fit, minmax(320px, 1fr))',
            lg: 'repeat(auto-fit, minmax(350px, 1fr))'
          },
          gap: { xs: 2, sm: 3 },
          justifyContent: 'center'
        }}>
          {rooms.map(room => (
            <Card key={room.id} sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4
              }
            }}>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 1 }}>
                  {room.name}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <People fontSize="small" color="action" />
                  <Chip
                    label={`${room.capacity} personas`}
                    color={getCapacityColor(room.capacity)}
                    size="small"
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Planta {room.planta}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Euro fontSize="small" color="action" />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    €{room.precio}/hora
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleReserve(room.id)}
                  sx={{ mt: 'auto' }}
                >
                  Reservar
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {!loading && !error && (!rooms || rooms.length === 0) && (
        <EmptyState
          title="Sin salas disponibles"
          description="No hay salas de co-working disponibles en este momento."
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
