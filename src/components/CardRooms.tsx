import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Chip
} from '@mui/material';
import { People, LocationOn, Euro } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { Room } from '../types';

interface CardRoomsProps {
  room: Room;
  index: number;
  delay?: number;
}

export default function CardRooms({ room, index, delay = 100 }: CardRoomsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * delay);

    return () => clearTimeout(timer);
  }, [index, delay]);

  const handleReserve = () => {
    navigate(`/reserva/${room.id}`);
  };

  const getCapacityColor = (capacity: Room['capacity']) => {
    switch (capacity) {
      case '1': return 'default';
      case '2-4': return 'primary';
      case '5-8': return 'secondary';
      case '9+': return 'success';
      default: return 'default';
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease-out, transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: isVisible ? 'translateY(-4px)' : 'translateY(20px)',
          boxShadow: 4
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={room.image}
        alt={room.name}
        sx={{
          objectFit: 'cover'
        }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 1 }}>
          {room.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <People fontSize="small" color="action" />
          <Chip
            label={`${room.capacity} personas`}
            color={getCapacityColor(room.capacity)}
            size="small"
            variant="outlined"
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            Planta {room.planta}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Euro fontSize="small" color="action" />
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            €{room.precio}/hora
          </Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={handleReserve}
          sx={{ mt: 'auto' }}
        >
          Reservar
        </Button>
      </CardContent>
    </Card>
  );
}
