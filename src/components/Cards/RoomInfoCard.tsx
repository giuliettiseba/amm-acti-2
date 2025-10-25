import {alpha, Card, CardContent, Typography, Box, Chip} from '@mui/material';
import {People, LocationOn, Euro} from '@mui/icons-material';
import type {Room} from '../../types';

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
        <Card sx={(theme) => ({
            mb: 3,
            borderRadius: '20px',
            background: theme.palette.mode === 'dark'
                ? alpha(theme.palette.background.paper, 0.85)
                : alpha(theme.palette.background.paper, 0.95),
            WebkitBackdropFilter: 'blur(24px)',
            backdropFilter: 'blur(24px)',
            border: `2px solid ${alpha(theme.palette.secondary.main, 0.4)}`,
            boxShadow: `
                0 0 30px ${alpha(theme.palette.secondary.main, 0.2)},
                0 0 60px ${alpha(theme.palette.secondary.main, 0.15)},
                0 0 90px ${alpha(theme.palette.secondary.main, 0.1)},
                inset 0 0 30px ${alpha(theme.palette.secondary.main, 0.08)}
            `,
            transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            '&:hover': {
                borderColor: alpha(theme.palette.secondary.main, 0.5),
                boxShadow: `
                    0 0 40px ${alpha(theme.palette.secondary.main, 0.25)},
                    0 0 80px ${alpha(theme.palette.secondary.main, 0.2)},
                    0 0 120px ${alpha(theme.palette.secondary.main, 0.15)},
                    inset 0 0 40px ${alpha(theme.palette.secondary.main, 0.1)}
                `,
            }
        })}>
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
