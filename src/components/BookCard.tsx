import type { Libro } from '../types';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Chip,
  Button,
  Box
} from '@mui/material';
import { MenuBook } from '@mui/icons-material';

interface Props { libro: Libro }

export function BookCard({ libro }: Props) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {libro.imagen ? (
        <CardMedia
          component="img"
          height="200"
          image={libro.imagen}
          alt={`Portada de ${libro.titulo}`}
          sx={{ objectFit: 'cover' }}
        />
      ) : (
        <Box
          sx={{
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey.100',
            color: 'grey.500'
          }}
        >
          <MenuBook sx={{ fontSize: 60 }} />
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
            {libro.titulo}
          </Typography>
          {libro.categoria && (
            <Chip
              label={libro.categoria}
              size="small"
              color="primary"
              sx={{ ml: 1 }}
            />
          )}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {libro.autor}
        </Typography>

        {libro.descripcion && (
          <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.4 }}>
            {libro.descripcion.slice(0, 90)}
            {libro.descripcion.length > 90 ? '…' : ''}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        {libro.precio != null && (
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {libro.precio.toFixed(2)} €
          </Typography>
        )}
        <Button
          component={Link}
          to={`/libro/${libro.id}`}
          variant="outlined"
          size="small"
        >
          Ver
        </Button>
      </CardActions>
    </Card>
  );
}
