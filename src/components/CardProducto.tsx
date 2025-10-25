import { Card, CardContent, CardMedia, Button, Box, Fade, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import type { ProductoCafe } from '../types';
import { useOrder } from '../hooks/useOrder';
import { useNotification } from '../hooks/useNotification';

interface CardProductoProps {
  producto: ProductoCafe;
  visible: boolean;
}

export default function CardProducto({ producto, visible }: CardProductoProps) {
  const { agregarProducto } = useOrder();
  const { addNotification } = useNotification();

  return (
    <Fade in={visible} timeout={500}>
      <Card
        sx={{
          width: '100%',
          minWidth: { xs: '100%', sm: '200px', md: '240px', lg: '260px' },
          maxWidth: { xs: '100%', sm: '250px', md: '280px', lg: '300px' },
          height: 300,
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 2
          }
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={producto.image}
          alt={producto.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 1, fontSize: '1rem' }}>
            {producto.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 'auto', fontSize: '0.875rem' }}>
            {producto.description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
              {producto.price.toFixed(2)} €
            </Typography>
            <Button
              size="small"
              variant="contained"
              startIcon={<ShoppingCart />}
              sx={{ fontSize: '0.75rem' }}
              onClick={() => {
                agregarProducto(producto);
                addNotification({
                  type: 'success',
                  message: `Producto "${producto.name}" añadido al carrito`,
                });
              }}
            >
              Añadir
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
}

