import { useRooms } from '../hooks/useRooms';
import { useSkeletonDelay } from '../hooks/useSkeletonDelay';
import { EmptyState } from '../components/EmptyState';
import { Skeleton } from '../components/Skeleton';
import CardRooms from '../components/CardRooms';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress
} from '@mui/material';
import { Refresh, Work } from '@mui/icons-material';

export default function CoworkingPage() {
  const { data: rooms, loading, error, refetch } = useRooms();
  const showSkeleton = useSkeletonDelay(loading);

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
          {rooms.map((room, index) => (
            <CardRooms
              key={room.id}
              room={room}
              index={index}
              delay={150}
            />
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
