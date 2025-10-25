import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useNotification, useRooms} from '../hooks';
import {roomsService} from '../services/rooms.service';
import {useAuthContext} from '../context/AuthContext';
import type {Room, RoomReservation} from '../types';
import type {SelectChangeEvent} from '@mui/material/Select';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from '@mui/material';
import {ArrowBack, Euro, LocationOn, People, Save} from '@mui/icons-material';

export default function ReservaPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { data: rooms } = useRooms();
  const { user } = useAuthContext();

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    userId: user?.id || 1, // Usar el ID del usuario autenticado
    additionalPreferences: [] as string[]
  });

  const preferencesOptions = [
    'Proyector',
    'Pizarra',
    'Aire acondicionado',
    'Acceso a impresora',
    'Catering',
    'Equipos de videoconferencia',
    'Conexión ethernet',
    'Mobiliario adicional'
  ];

  useEffect(() => {
    if (rooms && roomId) {
      const foundRoom = rooms.find(r => r.id === parseInt(roomId));
      setRoom(foundRoom || null);
    }
  }, [rooms, roomId]);

  // Actualizar userId cuando cambie el usuario autenticado
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        userId: user.id
      }));
    }
  }, [user]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferencesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      additionalPreferences: typeof value === 'string' ? value.split(',') : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!room || !formData.startDate || !formData.endDate) {
      addNotification({
        type: 'warning',
        message: 'Por favor, completa todos los campos requeridos'
      });
      return;
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      addNotification({
        type: 'error',
        message: 'La fecha de fin debe ser posterior a la fecha de inicio'
      });
      return;
    }

    setLoading(true);
    try {
      const reservationData: Omit<RoomReservation, 'id'> = {
        roomId: room.id,
        startDate: formData.startDate,
        endDate: formData.endDate,
        userId: formData.userId,
        additionalPreferences: formData.additionalPreferences
      };

      await roomsService.createReservation(reservationData);
      addNotification({
        type: 'success',
        message: 'Reserva creada exitosamente'
      });
      navigate('/coworking');
    } catch {
      addNotification({
        type: 'error',
        message: 'Error al crear la reserva. Inténtalo de nuevo.'
      });
    } finally {
      setLoading(false);
    }
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

  if (!room) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center', py: 4 }}>
        <Typography variant="h5" color="text.secondary">
          Sala no encontrada
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate('/coworking')}
          startIcon={<ArrowBack />}
          sx={{ mt: 2 }}
        >
          Volver a salas
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Button
        variant="text"
        onClick={() => navigate('/coworking')}
        startIcon={<ArrowBack />}
        sx={{ mb: 2 }}
      >
        Volver a salas
      </Button>

      <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 3 }}>
        Reservar Sala
      </Typography>

      {/* Información de la sala */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 2 }}>
            {room.name}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <People fontSize="small" color="action" />
              <Chip
                label={`${room.capacity} personas`}
                color={getCapacityColor(room.capacity)}
                size="small"
                variant="outlined"
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOn fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                Planta {room.planta}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Euro fontSize="small" color="action" />
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                €{room.precio}/hora
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Formulario de reserva */}
      <Card>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 3 }}>
            Detalles de la Reserva
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <TextField
                  label="Fecha y hora de inicio"
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  required
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: {
                      min: new Date().toISOString().slice(0, 16)
                    }
                  }}
                />

                <TextField
                  label="Fecha y hora de fin"
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  required
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: {
                      min: formData.startDate || new Date().toISOString().slice(0, 16)
                    }
                  }}
                />
              </Box>

              <FormControl>
                <InputLabel>Preferencias adicionales</InputLabel>
                <Select
                  multiple
                  value={formData.additionalPreferences}
                  onChange={handlePreferencesChange}
                  input={<OutlinedInput label="Preferencias adicionales" />}
                  variant="outlined"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {preferencesOptions.map((preference) => (
                    <MenuItem key={preference} value={preference}>
                      {preference}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Divider />

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/coworking')}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={16} /> : <Save />}
                >
                  {loading ? 'Reservando...' : 'Confirmar Reserva'}
                </Button>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
