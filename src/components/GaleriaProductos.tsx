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
      display: 'flex',
      flexWrap: 'wrap',
      gap: 3,
      justifyContent: 'flex-start',
      alignItems: 'stretch'
    }}>
      {productos.map((producto: ProductoCafe, index) => (
        <Fade in={visibleItems.includes(index)} key={producto.id} timeout={500}>
          <Card
            sx={{
              minWidth: 240,
              maxWidth: 280,
              flex: '1 1 240px',
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
