/**
 * CoworkingPage
 *
 * Página que muestra la lista de salas de co-working disponibles.
 *
 * - Muestra un header con título y descripción.
 * - Muestra un estado de carga con esqueletos (CardSkeleton) mientras se obtienen los datos.
 * - Si hay error, muestra un mensaje de error y un botón para reintentar.
 * - Si hay salas, las muestra en un grid de tarjetas (GenericCard) con animación de aparición secuencial.
 * - Si no hay salas, muestra un estado vacío (CardEmptyState).
 *
 * @component
 * @returns {JSX.Element} Página de salas de co-working con tarjetas y manejo de estados.
 *
 * @example
 * <CoworkingPage />
 */
import {useRooms, useSkeletonDelay} from '../hooks';
import CardEmptyState from '../components/cards/CardEmptyState.tsx';
import {Alert, Box, Button, Grid, Typography,} from '@mui/material';
import {Refresh, Work} from '@mui/icons-material';
import {GenericCard, CardSkeleton} from "../components/cards/GenericCard.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function CoworkingPage() {
    const {data: rooms, loading, error, refetch} = useRooms();
    const showSkeleton = useSkeletonDelay(loading);
    const navigate = useNavigate();
    const [visibleRooms, setVisibleRooms] = useState<number[]>([]);

    // Animación secuencial de aparición de tarjetas
    useEffect(() => {
        if (!loading && rooms && rooms.length > 0 && !showSkeleton) {
            setVisibleRooms([]);
            rooms.forEach((_, index) => {
                setTimeout(() => {
                    setVisibleRooms(prev => [...prev, index]);
                }, index * 150);
            });
        }
    }, [loading, showSkeleton, rooms]);

    // Limpia las tarjetas visibles al empezar a cargar
    useEffect(() => {
        if (loading) {
            setVisibleRooms([]);
        }
    }, [loading]);

    // Reaparece animación si cambian rooms, loading o showSkeleton
    useEffect(() => {
        if (rooms && rooms.length > 0 && !loading && !showSkeleton) {
            setVisibleRooms([]);
            rooms.forEach((_, index) => {
                setTimeout(() => {
                    setVisibleRooms(prev => [...prev, index]);
                }, index * 150);
            });
        }
    }, [rooms, loading, showSkeleton]);

    return (
        <Box sx={{maxWidth: 1200, mx: 'auto'}}>
            {/* Header */}
            <Box sx={{mb: 4, alignItems: 'center', textAlign: 'center'}}>
                <Typography variant="h4" component="h2" sx={{fontWeight: 600, mb: 1}}>
                    Salas de Co-working
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
                    Encuentra la sala perfecta para tu equipo.
                </Typography>
            </Box>

            {error && (
                <Alert severity="error" sx={{mb: 3}}>
                    <Typography variant="h6">Error al cargar salas</Typography>
                    <Typography variant="body2">{error}</Typography>
                    <Button variant="contained" onClick={refetch} sx={{mt: 2}}>
                        Reintentar
                    </Button>
                </Alert>
            )}

            {!error && showSkeleton && (
                <CardSkeleton visible={true}/>
            )}

            {!showSkeleton && !loading && !error && rooms && rooms.length > 0 && (

                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                    {rooms.map((room, index) => (
                        <Grid key={index} size={{xs: 2, sm: 4, md: 4}}>

                            <GenericCard
                                key={index}
                                title={room.name}
                                subtitle={"Planta: " + room.planta}
                                category={"Capacidad: " + room.capacity}
                                price={room.precio}
                                image={room.image}
                                isVisible={visibleRooms.includes(index)}
                                addToCartText={"Reservar"}
                                addToCart={() => navigate(`/reserva/${room.id}`)}
                            />

                        </Grid>
                    ))}
                </Grid>
            )}

            {!showSkeleton && !loading && !error && (!rooms || rooms.length === 0) && (
                <CardEmptyState
                    title="Sin salas disponibles"
                    description="No hay salas de co-working disponibles en este momento."
                    icon={<Work/>}
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
