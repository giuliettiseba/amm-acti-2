import {
    Box,
    Button,
    CardMedia,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from '@mui/material';
import type {Libro} from '../types';
import {useLibro} from '../hooks/useLibros';

interface DialogDetallesLibroProps {
  libro: Libro | null;
  open: boolean;
  onClose: () => void;
}

export default function DialogDetallesLibro({ libro, open, onClose }: DialogDetallesLibroProps) {
  const { data: libroDetallado, loading } = useLibro(libro?.id?.toString());

  const libroToShow = libroDetallado || libro;

  if (!libroToShow) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{libroToShow.titulo}</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <CardMedia
              component="img"
              image={libroToShow.imagen || 'https://via.placeholder.com/280x400?text=Sin+Imagen'}
              alt={libroToShow.titulo}
              sx={{ width: 200, height: 300, objectFit: 'cover', mb: { xs: 2, md: 0 } }}
            />
            <Box>
              <Typography variant="subtitle1" gutterBottom>Autor: {libroToShow.autor}</Typography>
              <Typography variant="subtitle1" gutterBottom>Año: {libroToShow.año}</Typography>

              {libroToShow.categoria && (
                <Typography variant="caption" sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', px: 1, py: 0.5, borderRadius: 1, mb: 1, display: 'inline-block' }}>
                  {libroToShow.categoria}
                </Typography>
              )}
              <Typography variant="body1" sx={{ mt: 2 }}>{libroToShow.sinopsis || 'Sin sinopsis disponible'}</Typography>
              {libroToShow.precio && (
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mt: 2 }}>
                  {libroToShow.precio.toFixed(2)} €
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}

