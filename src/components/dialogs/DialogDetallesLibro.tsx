// noinspection NonAsciiCharacters,JSNonASCIINames

import {
    alpha,
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
import {useLibro} from '../../hooks/useLibros.ts';
import type {DialogDetallesLibroProps} from "../../types/props/DialogDetallesLibroProps.tsx";

/**
 * DialogDetallesLibro
 *
 * Un componente de diálogo que muestra los detalles de un libro, incluyendo su título, autor,
 * año, categoría, sinopsis, imagen y precio. Este componente utiliza un diseño responsivo
 * y efectos visuales avanzados para mejorar la experiencia del usuario.
 *
 * @component
 * @param {DialogDetallesLibroProps} props - Las propiedades del componente.
 * @param {object} props.libro - El libro cuyos detalles se mostrarán.
 * @param {boolean} props.open - Indica si el diálogo está abierto.
 * @param {function} props.onClose - Función para cerrar el diálogo.
 *
 * @returns {JSX.Element | null} Un diálogo con los detalles del libro o null si no hay datos.
 *
 * @example
 * <DialogDetallesLibro
 *   libro={libro}
 *   open={isOpen}
 *   onClose={handleClose}
 * />
 */

export default function DialogDetallesLibro({libro, open, onClose}: DialogDetallesLibroProps) {
    const {data: libroDetallado, loading} = useLibro(libro?.id?.toString());

    const libroToShow = libroDetallado || libro;

    if (!libroToShow) return null;
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            slotProps={{
                backdrop: {
                    sx: {
                        backdropFilter: 'blur(8px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    }
                },
                paper: {
                    sx: (theme) => ({
                        borderRadius: '20px',
                        overflow: 'visible',
                        position: 'relative',
                        // Glass effect base
                        background: theme.palette.mode === 'dark'
                            ? alpha(theme.palette.background.paper, 0.85)
                            : alpha(theme.palette.background.paper, 0.95),
                        WebkitBackdropFilter: 'blur(24px)',
                        backdropFilter: 'blur(24px)',
                        // Diffuse neon border with secondary color
                        border: `2px solid ${alpha(theme.palette.secondary.main, 0.4)}`,
                        boxShadow: `
                        0 0 30px ${alpha(theme.palette.secondary.main, 0.2)},
                        0 0 60px ${alpha(theme.palette.secondary.main, 0.15)},
                        0 0 90px ${alpha(theme.palette.secondary.main, 0.1)},
                        inset 0 0 30px ${alpha(theme.palette.secondary.main, 0.08)}
                    `,
                        // Subtle inner glow gradient
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '20px',
                            padding: '2px',
                            background: `linear-gradient(135deg,
                            ${alpha(theme.palette.secondary.main, 0.3)} 0%,
                            ${alpha(theme.palette.secondary.light, 0.2)} 50%,
                            ${alpha(theme.palette.secondary.main, 0.25)} 100%)`,
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                            pointerEvents: 'none',
                            zIndex: 1
                        },
                        // Decorative glow blobs
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            right: '-15%',
                            bottom: '-15%',
                            width: '70%',
                            height: '70%',
                            pointerEvents: 'none',
                            backgroundImage: `radial-gradient(500px 400px at 70% 70%,
                            ${alpha(theme.palette.secondary.main, 0.18)} 0%,
                            transparent 50%)`,
                            zIndex: 0,
                            filter: 'blur(40px)',
                            mixBlendMode: 'screen',
                            opacity: 0.9
                        },
                        // Ensure children are above decorative elements
                        '& > *': {
                            position: 'relative',
                            zIndex: 2
                        }
                    })
                }
            }}
        >
            <DialogTitle
                sx={{
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: '1.75rem',
                    letterSpacing: '-0.02em',
                    pt: 4,
                    pb: 2
                }}
            >
                {libroToShow.titulo}
            </DialogTitle>
            <DialogContent sx={{px: 4, pb: 2}}>
                {loading ? (
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300}}>
                        <CircularProgress/>
                    </Box>
                ) : (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', md: 'row'},
                        gap: 4,
                        alignItems: {xs: 'center', md: 'flex-start'}
                    }}>
                        <CardMedia
                            component="img"
                            image={libroToShow.imagen || 'https://via.placeholder.com/280x400?text=Sin+Imagen'}
                            alt={libroToShow.titulo}
                            sx={{
                                width: 200,
                                height: 300,
                                objectFit: 'cover',
                                borderRadius: 2,
                                boxShadow: (theme) => `0 8px 32px ${alpha(theme.palette.secondary.main, 0.2)}`,
                                mb: {xs: 2, md: 0}
                            }}
                        />
                        <Box sx={{
                            flex: 1,
                            textAlign: {xs: 'center', md: 'left'}
                        }}>
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '1.1rem',
                                    color: 'text.primary',
                                    mb: 1
                                }}
                            >
                                Autor: <Box component="span" sx={{fontWeight: 400, color: 'text.secondary'}}>{libroToShow.autor}</Box>
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '1.1rem',
                                    color: 'text.primary',
                                    mb: 2
                                }}
                            >
                                Año: <Box component="span" sx={{fontWeight: 400, color: 'text.secondary'}}>{libroToShow.año}</Box>
                            </Typography>

                            {libroToShow.categoria && (
                                <Box sx={{mb: 2, display: 'flex', justifyContent: {xs: 'center', md: 'flex-start'}}}>
                                    <Typography variant="caption" sx={{
                                        bgcolor: 'primary.main',
                                        color: 'primary.contrastText',
                                        px: 2,
                                        py: 0.75,
                                        borderRadius: 9999,
                                        display: 'inline-block',
                                        fontWeight: 600,
                                        fontSize: '0.85rem',
                                        letterSpacing: '0.02em',
                                        boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
                                    }}>
                                        {libroToShow.categoria}
                                    </Typography>
                                </Box>
                            )}
                            <Typography
                                variant="body1"
                                sx={{
                                    mt: 2,
                                    lineHeight: 1.7,
                                    color: 'text.secondary',
                                    textAlign: {xs: 'center', md: 'justify'}
                                }}
                            >
                                {libroToShow.sinopsis || 'Sin sinopsis disponible'}
                            </Typography>
                            {libroToShow.precio && (
                                <Box sx={{
                                    mt: 3,
                                    display: 'flex',
                                    justifyContent: {xs: 'center', md: 'flex-start'}
                                }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 800,
                                            color: 'primary.main',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            px: 2.5,
                                            py: 1,
                                            borderRadius: 2,
                                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                            border: (theme) => `2px solid ${alpha(theme.palette.primary.main, 0.2)}`
                                        }}
                                    >
                                        ${libroToShow.precio.toFixed(2)}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{
                justifyContent: 'center',
                px: 4,
                pb: 4,
                pt: 2
            }}>
                <Button
                    onClick={onClose}
                    variant="contained"
                    size="large"
                    sx={{
                        minWidth: 200,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderRadius: 2,
                        textTransform: 'none',
                        boxShadow: (theme) => `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: (theme) => `0 6px 24px ${alpha(theme.palette.primary.main, 0.4)}`
                        }
                    }}
                >
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
