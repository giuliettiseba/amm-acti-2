import {useRooms, useSkeletonDelay} from '../hooks';
import EmptyState from '../components/EmptyState';
import {Alert, Box, Button, Grid, Typography,} from '@mui/material';
import {Refresh, Work} from '@mui/icons-material';
import {GenericCard} from "../components/GenericCard.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {CardSkeleton} from "../components/Skeleton.tsx";


export default function CoworkingPage() {
    const {data: rooms, loading, error, refetch} = useRooms();
    const showSkeleton = useSkeletonDelay(loading);
    const navigate = useNavigate();

    const [visibleRooms, setVisibleRooms] = useState<number[]>([]);

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

    useEffect(() => {
        if (loading) {
            setVisibleRooms([]);
        }
    }, [loading]);

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

            {showSkeleton && !error && (
                <CardSkeleton/>
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
                <EmptyState
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
