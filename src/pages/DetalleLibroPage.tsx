import { useParams } from 'react-router-dom';
import { useLibro } from '../hooks/useLibros';
import { Skeleton, SkeletonText } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import { useSkeletonDelay } from '../hooks/useSkeletonDelay';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Divider,
  Alert
} from '@mui/material';
import { Refresh, MenuBook } from '@mui/icons-material';

export default function DetalleLibroPage() {
  const { id } = useParams();
  const { data, loading, error, refetch } = useLibro(id);
  const showSkeleton = useSkeletonDelay(loading);

  if (!id) {
    return (
      <EmptyState
        title="ID no proporcionado"
        description="No se recibió el identificador del libro."
        icon={<MenuBook />}
      />
    );
  }

  if (showSkeleton) {
    return (
      <Card sx={{ maxWidth: 640, mx: 'auto' }}>
        <CardContent>
          <Skeleton height={28} width="60%" />
          <Skeleton height={14} width="35%" />
          <Box sx={{ mt: 2 }}>
            <SkeletonText lines={4} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Skeleton height={20} width={120} />
            <Skeleton height={20} width={80} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ maxWidth: 640, mx: 'auto' }}>
        <Typography variant="h6">Error</Typography>
        <Typography variant="body2">{error}</Typography>
        <Button variant="contained" onClick={refetch} sx={{ mt: 2 }}>
          Reintentar
        </Button>
      </Alert>
    );
  }

  if (!data) {
    return (
      <EmptyState
        title="Libro no encontrado"
        description="No se pudo recuperar la información solicitada."
        icon={<MenuBook />}
        action={
          <Button variant="outlined" onClick={refetch} startIcon={<Refresh />}>
            Intentar de nuevo
          </Button>
        }
      />
    );
  }

  return (
    <Card sx={{ maxWidth: 700, mx: 'auto' }}>
      {data.imagen && (
        <CardMedia
          component="img"
          height="400"
          image={data.imagen}
          alt={`Portada de ${data.titulo}`}
          sx={{ objectFit: 'cover' }}
        />
      )}

      <CardContent sx={{ p: 4 }}>
        {!data.imagen && (
          <Box
            sx={{
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'grey.100',
              color: 'grey.500',
              mb: 3,
              borderRadius: 1
            }}
          >
            <MenuBook sx={{ fontSize: 80 }} />
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, gap: 2 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600, flex: 1 }}>
            {data.titulo}
          </Typography>
          <Button
            onClick={() => refetch()}
            variant="outlined"
            size="small"
            startIcon={<Refresh />}
          >
            Recargar
          </Button>
        </Box>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          <strong>Autor:</strong> {data.autor}
        </Typography>

        {data.categoria && (
          <Box sx={{ mb: 2 }}>
            <Chip
              label={data.categoria}
              color="primary"
              variant="outlined"
              icon={<MenuBook />}
            />
          </Box>
        )}

        {data.precio != null && (
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
            Precio: {data.precio} €
          </Typography>
        )}

        {data.descripcion && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              {data.descripcion}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}
