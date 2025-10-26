/**
 * ReservaPage
 *
 * Página para reservar una sala de coworking.
 *
 * Permite seleccionar una sala, introducir fechas de inicio y fin, preferencias adicionales,
 * y enviar la reserva. Muestra información de la sala seleccionada y un formulario de reserva.
 * Utiliza RoomInfoCard y ReservaFormCard para la presentación.
 *
 * @component
 * @returns {JSX.Element} Página de reserva de sala con formulario y detalles de la sala.
 *
 * @example
 * <ReservaPage />
 */
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useRooms} from '../hooks';
import {roomsService} from '../services/rooms.service';
import {useAuthContext} from '../context/AuthContext';
import type {Room, RoomReservation} from '../types';
import type {SelectChangeEvent} from '@mui/material/Select';
import {
    Box,
    Button,
    Typography
} from '@mui/material';
import {ArrowBack} from '@mui/icons-material';
import {useNotification} from "../context/NotificationContext.tsx";
import RoomInfoCard from '../components/cards/RoomInfoCard.tsx';
import ReservaFormCard from '../components/cards/ReservaFormCard.tsx';

export default function ReservaPage() {
    const {roomId} = useParams<{ roomId: string }>();
    const navigate = useNavigate();
    const {addNotification} = useNotification();
    const {data: rooms} = useRooms();
    const {user} = useAuthContext();

    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        userId: user?.id || 1, // Usar el ID del usuario autenticado
        additionalPreferences: [] as string[]
    });

    /**
     * Opciones de preferencias adicionales para la reserva.
     * @type {string[]}
     */
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

    /**
     * Busca y establece la sala seleccionada según el parámetro de la URL.
     */
    useEffect(() => {
        if (rooms && roomId) {
            const foundRoom = rooms.find(r => r.id === parseInt(roomId));
            setRoom(foundRoom || null);
        }
    }, [rooms, roomId]);

    /**
     * Actualiza el userId en el formulario cuando cambia el usuario autenticado.
     */
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                userId: user.id
            }));
        }
    }, [user]);

    /**
     * Maneja cambios en los campos del formulario.
     * @param {string} field - Nombre del campo.
     * @param {string|number} value - Valor del campo.
     */
    const handleInputChange = (field: string, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    /**
     * Maneja cambios en las preferencias adicionales.
     * @param {SelectChangeEvent<string[]>} event - Evento de cambio de selección.
     */
    const handlePreferencesChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value;
        setFormData(prev => ({
            ...prev,
            additionalPreferences: typeof value === 'string' ? value.split(',') : value
        }));
    };

    /**
     * Maneja el envío del formulario de reserva.
     * Valida los campos y realiza la petición de reserva.
     * @param {React.FormEvent} e - Evento de formulario.
     */
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

    if (!room) {
        return (
            <Box sx={{maxWidth: 800, mx: 'auto', textAlign: 'center', py: 4}}>
                <Typography variant="h5" color="text.secondary">
                    Sala no encontrada
                </Typography>
                <Button
                    variant="outlined"
                    onClick={() => navigate('/coworking')}
                    startIcon={<ArrowBack/>}
                    sx={{mt: 2}}
                >
                    Volver a salas
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{maxWidth: 800, mx: 'auto'}}>
            <Button
                variant="text"
                onClick={() => navigate('/coworking')}
                startIcon={<ArrowBack/>}
                sx={{mb: 2}}
            >
                Volver a salas
            </Button>

            <Typography variant="h4" component="h1" sx={{fontWeight: 600, mb: 3}}>
                Reservar Sala
            </Typography>

            {/* Información de la sala */}
            <RoomInfoCard room={room} />

            {/* Formulario de reserva */}
            <ReservaFormCard
                loading={loading}
                formData={formData}
                handleInputChange={handleInputChange}
                handlePreferencesChange={handlePreferencesChange}
                handleSubmit={handleSubmit}
                preferencesOptions={preferencesOptions}
                navigate={navigate}
            />
        </Box>
    );
}
