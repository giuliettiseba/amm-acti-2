import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography
} from '@mui/material';
import {Close, Delete} from '@mui/icons-material';
import {useOrder} from '../hooks';
import {useNavigate} from 'react-router-dom';
import type {CarritoItem} from "../types";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { carrito, quitarItem, actualizarCantidad, limpiarCarrito } = useOrder();
  const navigate = useNavigate();

  const getItemTitle = (item: CarritoItem) =>
    item.tipo === 'producto' ? item.producto.name : item.libro.titulo;
  const getItemPrice = (item: CarritoItem) =>
    item.tipo === 'producto' ? item.producto.price : item.libro.precio;

  const total = carrito.reduce(
    (sum, item) => sum + getItemPrice(item) * item.cantidad,
    0
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Carrito</Typography>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List sx={{ flexGrow: 1 }}>
          {carrito.length === 0 && (
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                    El carrito está vacío.
                  </Typography>
                }
              />
            </ListItem>
          )}
          {carrito.map((item, idx) => (
            <ListItem
              key={idx}
              alignItems="flex-start"
              sx={{ gap: 1 }}
              secondaryAction={
                <IconButton edge="end" onClick={() => quitarItem(item)}>
                  <Delete />
                </IconButton>
              }
            >
              <ListItemText
                primary={getItemTitle(item)}
                secondary={
                  <>
                    <Typography variant="caption" color="text.secondary" component="span">
                      {item.tipo === 'producto' ? 'Producto de cafetería' : 'Libro'}
                    </Typography>
                    <br />
                    <Typography variant="body2" component="span">
                      Precio: {getItemPrice(item).toFixed(2)} €
                    </Typography>
                  </>
                }
              />
              <TextField
                type="number"
                size="small"
                value={item.cantidad}
                slotProps={{ htmlInput: { min: 1, style: { width: 50 } } }}
                onChange={e => {
                  const val = Math.max(1, Number(e.target.value));
                  actualizarCantidad(item, val);
                }}
                sx={{ mr: 1 }}
              />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1">Total:</Typography>
          <Typography variant="h6">{total.toFixed(2)} €</Typography>
        </Box>
        <Button
          variant="outlined"
          color="secondary"
          onClick={limpiarCarrito}
          disabled={carrito.length === 0}
          sx={{ mb: 1 }}
        >
          Vaciar carrito
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={carrito.length === 0}
          onClick={() => {
            onClose();
            navigate('/pedido-resumen');
          }}
        >
          Finalizar pedido
        </Button>
      </Box>
    </Drawer>
  );
}
