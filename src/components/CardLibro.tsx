import {Box, Button, Card, CardContent, CardMedia, Fade, Typography} from '@mui/material';
import type {Libro} from '../types';
import {useNotification, useOrder} from '../hooks';

interface CardLibroProps {
  libro: Libro;
  isVisible: boolean;
  onClick?: () => void;
}

export default function CardLibro({ libro, isVisible, onClick }: CardLibroProps) {
  const { agregarLibro } = useOrder();
  const { addNotification } = useNotification();

  return (
    <Fade in={isVisible} timeout={500}>
      <Card
        sx={{
          width: '100%',
          minWidth: {
            xs: '100%',
            sm: '250px',
            md: '280px',
            lg: '300px'
          },
          maxWidth: {
            xs: '100%',
            sm: '300px',
            md: '320px',
            lg: '340px'
          },
          display: 'flex',
          flexDirection: 'column',
          height: 'auto', // Permite que la altura se ajuste al contenido
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 3
          }
        }}
        onClick={onClick}
      >
        <CardMedia
          component="img"
          height="200"
          image={libro.imagen || 'https://via.placeholder.com/280x200?text=Sin+Imagen'}
          alt={libro.titulo}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 1, fontSize: '1.1rem' }}>
            {libro.titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            por {libro.autor}
          </Typography>
          {libro.categoria && (
            <Typography variant="caption" sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              alignSelf: 'flex-start',
              mb: 1
            }}>
              {libro.categoria}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 'auto', fontSize: '0.875rem' }}>
            {libro.sinopsis || 'Sin sinopsis disponible'}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            {libro.precio && (
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                {libro.precio.toFixed(2)} €
              </Typography>
            )}

            <Button
              size="small"
              variant="contained"
              sx={{ fontSize: '0.75rem', ml: 1 }}
              onClick={e => {
                e.stopPropagation();
                agregarLibro(libro);
                addNotification({
                  type: 'success',
                  message: `Libro "${libro.titulo}" añadido al carrito`,
                });
              }}
            >
              Añadir al carrito
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
}
