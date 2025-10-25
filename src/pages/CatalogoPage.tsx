/**
 * CatalogoPage
 *
 * Página de catálogo de libros.
 *
 * Permite buscar, filtrar y visualizar libros disponibles en la plataforma.
 * Incluye barra de búsqueda, animación de aparición secuencial de tarjetas, manejo de estados de carga,
 * error y vacíos, y muestra detalles de libros en un diálogo modal.
 *
 * @component
 * @returns {JSX.Element} Página de catálogo de libros con búsqueda, tarjetas y detalles.
 *
 * @example
 * <CatalogoPage />
 */
import {useEffect, useMemo, useState} from 'react';
import {useLibros, useSkeletonDelay} from '../hooks';
import EmptyState from '../components/EmptyState';
import type {Libro} from '../types';
import {Alert, alpha, Box, Button, Grid, InputAdornment, TextField, Typography} from '@mui/material';
import {MenuBook, Refresh, Search} from '@mui/icons-material';
import DialogDetallesLibro from '../components/DialogDetallesLibro';
import {GenericCard} from "../components/Cards/GenericCard.tsx";
import {CardSkeleton} from "../components/Skeleton.tsx";
import {useOrder} from "../context/OrderContext.tsx";

export default function CatalogoPage() {
    // Fetch libros
    const {
        data: libros,
        loading,
        error,
        refetch
    } = useLibros();

    /**
     * Estado para el término de búsqueda.
     * @type {string}
     */
    const [searchTerm, setSearchTerm] = useState('');
    /**
     * Estado para los índices de libros visibles (animación secuencial).
     * @type {number[]}
     */
    const [visibleLibros, setVisibleLibros] = useState<number[]>([]);
    /**
     * Estado para el libro seleccionado (para mostrar detalles).
     * @type {Libro | null}
     */
    const [selectedLibro, setSelectedLibro] = useState<Libro | null>(null);
    /**
     * Estado para controlar la apertura del diálogo de detalles.
     * @type {boolean}
     */
    const [dialogOpen, setDialogOpen] = useState(false);
    const {agregarLibro} = useOrder();
    const showSkeleton = useSkeletonDelay(loading);

    /**
     * Filtra los libros según el término de búsqueda.
     * @type {Libro[]}
     */
    const librosFiltrados = useMemo(() => (
        libros?.filter(libro =>
            libro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            libro.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            libro.categoria?.toLowerCase().includes(searchTerm.toLowerCase())
        ) || []
    ), [libros, searchTerm]);

    // Efecto para mostrar libros con animación secuencial
    useEffect(() => {
        if (!loading && librosFiltrados && librosFiltrados.length > 0 && !showSkeleton) {
            setVisibleLibros([]);
            librosFiltrados.forEach((_, index) => {
                setTimeout(() => {
                    setVisibleLibros(prev => [...prev, index]);
                }, index * 100); // 100ms de delay entre cada elemento
            });
        }
    }, [loading, showSkeleton, librosFiltrados]);

    // Resetear animaciones al cambiar filtro o cargar
    useEffect(() => {
        if (loading) {
            setVisibleLibros([]);
        }
    }, [loading]);

    // Resetear animaciones cuando cambia el término de búsqueda
    useEffect(() => {
        if (librosFiltrados.length > 0 && !loading && !showSkeleton) {
            setVisibleLibros([]);
            librosFiltrados.forEach((_, index) => {
                setTimeout(() => {
                    setVisibleLibros(prev => [...prev, index]);
                }, index * 100);
            });
        }
    }, [searchTerm, librosFiltrados, loading, showSkeleton]);


    return (
        <Box sx={{maxWidth: 1200, mx: 'auto'}}>
            {/* Header */}
            <Box sx={{mb: 4, alignItems: 'center', textAlign: 'center'}}>
                <Typography variant="h4" component="h2" sx={{fontWeight: 600, mb: 1}}>
                    Catálogo de Libros
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
                    Explora nuestra amplia colección de libros académicos y literatura
                </Typography>

                {/* Search Bar */}
                <Box sx={{display: 'flex', gap: 2, alignItems: 'center', mb: 3}}>
                    <TextField
                        fullWidth
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search/>
                                    </InputAdornment>
                                )
                            }
                        }}
                        variant="outlined"
                        sx={(theme) => ({
                            // Glass effect base
                            '& .MuiOutlinedInput-root': {
                                background: theme.palette.mode === 'dark'
                                    ? alpha(theme.palette.background.paper, 0.06)
                                    : alpha(theme.palette.background.paper, 0.48),
                                WebkitBackdropFilter: 'blur(16px)',
                                backdropFilter: 'blur(16px)',
                                // Diffuse neon border with secondary color
                                borderRadius: 2,
                                border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                                boxShadow: `
                                    0 8px 24px ${alpha(theme.palette.secondary.main, 0.12)},
                                    0 0 20px ${alpha(theme.palette.secondary.main, 0.1)},
                                    inset 0 0 20px ${alpha(theme.palette.secondary.main, 0.05)}
                                `,
                                transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                '& fieldset': {
                                    border: 'none'
                                },
                                '&:hover': {
                                    borderColor: alpha(theme.palette.secondary.main, 0.5),
                                    boxShadow: `
                                        0 12px 32px ${alpha(theme.palette.secondary.main, 0.18)},
                                        0 0 30px ${alpha(theme.palette.secondary.main, 0.15)},
                                        inset 0 0 25px ${alpha(theme.palette.secondary.main, 0.08)}
                                    `,
                                },
                                '&.Mui-focused': {
                                    borderColor: alpha(theme.palette.secondary.main, 0.6),
                                    boxShadow: `
                                        0 16px 40px ${alpha(theme.palette.secondary.main, 0.24)},
                                        0 0 40px ${alpha(theme.palette.secondary.main, 0.2)},
                                        inset 0 0 30px ${alpha(theme.palette.secondary.main, 0.1)}
                                    `,
                                }
                            }
                        })}
                    />
                </Box>
            </Box>

            {/* Error handling */}
            {error && (
                <Alert severity="error" sx={{mb: 3}}>
                    <Typography variant="h6">Error al cargar</Typography>
                    <Typography variant="body2">{error}</Typography>
                    <Button variant="contained" onClick={refetch} sx={{mt: 2}}>
                        Reintentar
                    </Button>
                </Alert>
            )}

            {/* Skeletons */}
            {!error && showSkeleton && (
                <CardSkeleton visible={true}/>
            )}


            {/* Libros */}
            {!showSkeleton && !loading && !error && librosFiltrados && librosFiltrados.length > 0 && (
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                    {librosFiltrados.map((libro, index) => (
                        <Grid key={index} size={{xs: 2, sm: 4, md: 4}}>

                            <GenericCard
                                key={index}
                                title={libro.titulo}
                                subtitle={libro.autor}
                                category={libro.categoria}
                                description={libro.sinopsis}
                                price={libro.precio}
                                image={libro.imagen}
                                isVisible={visibleLibros.includes(index)}
                                showDetails={() => {
                                    setSelectedLibro(libro);
                                    setDialogOpen(true);
                                }}
                                addToCart={() => agregarLibro(libro)}
                            />

                        </Grid>
                    ))}
                </Grid>
            )}
            <DialogDetallesLibro
                libro={selectedLibro}
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            />

            {/* Empty states */}
            {!loading && !error && searchTerm && librosFiltrados.length === 0 && (
                <EmptyState
                    title="Sin resultados"
                    description={`No se encontraron libros que coincidan con "${searchTerm}".`}
                    icon={<Search/>}
                    action={
                        <Button variant="outlined" onClick={() => setSearchTerm('')}>
                            Limpiar búsqueda
                        </Button>
                    }
                />
            )}

            {!loading && !error && (!libros || libros.length === 0) && (
                <EmptyState
                    title="Sin libros"
                    description="Aún no hay libros disponibles en el catálogo."
                    icon={<MenuBook/>}
                    action={
                        <Button variant="outlined" onClick={refetch} startIcon={<Refresh/>}>
                            Actualizar
                        </Button>
                    }
                />
            )}
        </Box>
    );
}
