import type {ProductoCafe} from '../types';
import {Box} from '@mui/material';
import CardProducto from './CardProducto';

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
        <CardProducto key={producto.id} producto={producto} visible={visibleItems.includes(index)} />
      ))}
    </Box>
  );
}
