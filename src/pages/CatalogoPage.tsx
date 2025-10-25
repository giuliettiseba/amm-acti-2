import {useEffect, useMemo, useState} from 'react';
import {useLibros, useOrder, useSkeletonDelay} from '../hooks';
import EmptyState from '../components/EmptyState';
import type {Libro} from '../types';
import {Alert, Box, Button, Grid, InputAdornment, TextField, Typography} from '@mui/material';
import {MenuBook, Refresh, Search} from '@mui/icons-material';
import DialogDetallesLibro from '../components/DialogDetallesLibro';
import {GenericCard} from "../components/GenericCard.tsx";
import {CardSkeleton} from "../components/Skeleton.tsx";

export default function CatalogoPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [visibleLibros, setVisibleLibros] = useState<number[]>([]);
    const [selectedLibro, setSelectedLibro] = useState<Libro | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    // Fetch libros
    const {
        data: libros,
        loading,
        error,
        refetch
    } = useLibros();

    const showSkeleton = useSkeletonDelay(loading);

    // Filtrar libros según término de búsqueda
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
    }, [loading, showSkeleton, librosFiltrados]); // Agregado librosFiltrados como dependencia

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
    }, [searchTerm, librosFiltrados, loading, showSkeleton]); // Agregado librosFiltrados como dependencia

    const {agregarLibro} = useOrder();

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
                        placeholder="Buscar por título, autor o categoría..."
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
            {showSkeleton && !error && (
                <CardSkeleton/>
            )}


            {/* Libros */}
            {!loading && !error && librosFiltrados && librosFiltrados.length > 0 && (
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
