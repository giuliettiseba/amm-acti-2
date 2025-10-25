import {Card, CardContent, Typography, Box, Chip} from '@mui/material';
import {People, LocationOn, Euro} from '@mui/icons-material';
import type {Room} from '../types';

/**
 * RoomInfoCard
 *
 * Muestra la información de la sala seleccionada en una tarjeta.
 *
 * @param {object} props
 * @param {Room} props.room - Objeto de sala a mostrar.
 * @returns {JSX.Element}
 */
export default function RoomInfoCard({room}: {room: Room}) {
    /**
     * Returns a color string for the MUI Chip component based on the room capacity.
     * Only returns allowed MUI color values.
     *
     * @param {Room['capacity']} capacity - The capacity value of the room.
     * @returns {"default"|"primary"|"secondary"|"success"} The color for the Chip.
     */
    function getChipColor(capacity: Room['capacity']): "default"|"primary"|"secondary"|"success" {
        switch (capacity) {
            case '1':
                return 'default';
            case '2-4':
                return 'primary';
            case '5-8':
                return 'secondary';
            case '9+':
                return 'success';
            default:
                return 'default';
        }
    }

    return (
        <Card sx={{mb: 3}}>
            <CardContent>
                <Typography variant="h6" component="div" sx={{fontWeight: 600, mb: 2}}>
                    {room.name}
                </Typography>
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2}}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <People fontSize="small" color="action"/>
                        <Chip
                            label={`${room.capacity} personas`}
                            color={getChipColor(room.capacity)}
                            size="small"
                            variant="outlined"
                        />
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <LocationOn fontSize="small" color="action"/>
                        <Typography variant="body2" color="text.secondary">
                            Planta {room.planta}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <Euro fontSize="small" color="action"/>
                        <Typography variant="body1" sx={{fontWeight: 500}}>
                            €{room.precio}/hora
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
