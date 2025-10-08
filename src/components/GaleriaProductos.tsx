import type { ProductoCafe } from '../types';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Fade
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

interface GaleriaProductosProps {
  productos: ProductoCafe[];
  visibleItems?: number[];
}

export default function GaleriaProductos({ productos, visibleItems = [] }: GaleriaProductosProps) {
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',
        sm: 'repeat(auto-fit, minmax(200px, 1fr))',
        md: 'repeat(auto-fit, minmax(240px, 1fr))',
        lg: 'repeat(auto-fit, minmax(260px, 1fr))'
      },
      gap: { xs: 2, sm: 3 },
      justifyItems: 'center'
    }}>
      {productos.map((producto: ProductoCafe, index) => (
        <Fade in={visibleItems.includes(index)} key={producto.id} timeout={500}>
          <Card
            sx={{
              width: '100%',
              minWidth: {
                xs: '100%',
                sm: '200px',
                md: '240px',
                lg: '260px'
              },
              maxWidth: {
                xs: '100%',
                sm: '250px',
                md: '280px',
                lg: '300px'
              },
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
                >
                  Añadir
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      ))}
    </Box>
  );
}
