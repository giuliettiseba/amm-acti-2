import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  CardMedia
} from '@mui/material';
import type { Libro } from '../types';

interface DialogDetallesLibroProps {
  libro: Libro | null;
  open: boolean;
  onClose: () => void;
}

export default function DialogDetallesLibro({ libro, open, onClose }: DialogDetallesLibroProps) {
  if (!libro) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{libro.titulo}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <CardMedia
            component="img"
            image={libro.imagen || 'https://via.placeholder.com/280x400?text=Sin+Imagen'}
            alt={libro.titulo}
            sx={{ width: 200, height: 300, objectFit: 'cover', mb: { xs: 2, md: 0 } }}
          />
          <Box>
            <Typography variant="subtitle1" gutterBottom>Autor: {libro.autor}</Typography>
            <Typography variant="subtitle1" gutterBottom>Año: {libro.año}</Typography>

            {libro.categoria && (
              <Typography variant="caption" sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', px: 1, py: 0.5, borderRadius: 1, mb: 1, display: 'inline-block' }}>
                {libro.categoria}
              </Typography>
            )}
            <Typography variant="body1" sx={{ mt: 2 }}>{libro.sinopsis || 'Sin sinopsis disponible'}</Typography>
            {libro.precio && (
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mt: 2 }}>
                {libro.precio.toFixed(2)} €
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}

