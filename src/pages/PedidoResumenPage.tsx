/**
 * PedidoResumenPage
 *
 * Página de resumen de pedido para la cafetería/librería.
 *
 * Muestra los productos/libros seleccionados en el carrito, permite elegir el método de entrega
 * (sala de coworking o mostrador), seleccionar sala si corresponde, y confirmar el pedido.
 * Si el método es mostrador, genera un número de pedido y muestra un QR para recogerlo.
 * Si el método es coworking, limpia el carrito y muestra un mensaje de éxito.
 *
 * @component
 * @returns {JSX.Element} Página de resumen de pedido con formulario de entrega y QR opcional.
 *
 * @example
 * <PedidoResumenPage />
 */
import React, {useState} from 'react';
import {useRooms} from '../hooks';
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Typography
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {QRCodeSVG} from 'qrcode.react';
import type {CarritoItem, Room} from '../types';
import {useOrder} from "../context/OrderContext.tsx";

/**
 * Genera un número de pedido aleatorio en formato ORD-XXXXXXXXX.
 * @returns {string} Número de pedido.
 */
const generateOrderNumber = () => {
    // Use slice instead of deprecated substr
    return 'ORD-' + Math.random().toString(36).slice(2, 11).toUpperCase();
};

export default function PedidoResumenPage() {
    const {carrito, limpiarCarrito} = useOrder();
    const {data: rooms, loading: roomsLoading, error: roomsError} = useRooms();
    const [deliveryMethod, setDeliveryMethod] = useState<'coworking' | 'desk'>('coworking');
    const [room, setRoom] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const [showQR, setShowQR] = useState(false);
    const navigate = useNavigate();

    /**
     * Obtiene el título del ítem del carrito.
     * @param {CarritoItem} item - Ítem del carrito.
     * @returns {string} Título del producto o libro.
     */
    const getItemTitle = (item: CarritoItem) =>
        item.tipo === 'producto'
            ? item.producto.name
            : item.libro.titulo ?? '';
    /**
     * Obtiene el precio del ítem del carrito.
     * @param {CarritoItem} item - Ítem del carrito.
     * @returns {number} Precio del producto o libro.
     */
    const getItemPrice = (item: CarritoItem) =>
        item.tipo === 'producto'
            ? item.producto.price
            : item.libro.precio ?? 0;

    /**
     * Calcula el total del pedido sumando los precios por cantidad.
     * @type {number}
     */
    const total = carrito.reduce(
        (sum, item) => sum + getItemPrice(item) * item.cantidad,
        0
    );

    /**
     * Maneja el envío del formulario de pedido.
     * Si es mostrador, genera QR; si es coworking, limpia carrito y navega.
     * @param {React.FormEvent} e - Evento de formulario.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (deliveryMethod === 'desk') {
            const num = generateOrderNumber();
            setOrderNumber(num);
            setShowQR(true);
        } else {
            limpiarCarrito();
            alert('Pedido enviado a la sala de coworking: ' + room);
            navigate('/');
        }
    };

    return (
        <Box sx={{maxWidth: 500, mx: 'auto', p: 3}}>
            <Typography variant="h5" gutterBottom>Resumen del pedido</Typography>
            <List>
                {carrito.map((item, idx) => (
                    <ListItem key={idx}>
                        <ListItemText
                            primary={getItemTitle(item)}
                            secondary={`Cantidad: ${item.cantidad} | Precio: ${getItemPrice(item).toFixed(2)} €`}
                        />
                    </ListItem>
                ))}
            </List>
            <Divider sx={{my: 2}}/>
            <Typography variant="h6">Total: {total.toFixed(2)} €</Typography>
            <form onSubmit={handleSubmit}>
                <Typography variant="subtitle1" sx={{mt: 2}}>Método de entrega</Typography>
                <RadioGroup
                    value={deliveryMethod}
                    onChange={e => setDeliveryMethod(e.target.value as 'coworking' | 'desk')}
                >
                    <FormControlLabel value="coworking" control={<Radio/>} label="Entregar en sala de coworking"/>
                    <FormControlLabel value="desk" control={<Radio/>} label="Recoger en mostrador"/>
                </RadioGroup>
                {deliveryMethod === 'coworking' && (
                    <FormControl fullWidth sx={{mt: 1}} required>
                        <InputLabel id="room-select-label">Sala de coworking</InputLabel>
                        <Select
                            labelId="room-select-label"
                            value={room}
                            label="Sala de coworking"
                            onChange={e => setRoom(e.target.value)}
                            disabled={roomsLoading || !!roomsError}
                            variant="outlined"
                        >
                            {roomsLoading && (
                                <MenuItem value="" disabled>Cargando...</MenuItem>
                            )}
                            {roomsError && (
                                <MenuItem value="" disabled>Error al cargar salas</MenuItem>
                            )}
                            {!roomsLoading && !roomsError && rooms && rooms.length === 0 && (
                                <MenuItem value="" disabled>No hay salas disponibles</MenuItem>
                            )}
                            {!roomsLoading && !roomsError && rooms && rooms.map((sala: Room) => (
                                <MenuItem key={sala.id} value={sala.name || sala.id}>
                                    {sala.name || sala.id}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{mt: 2}}
                    disabled={carrito.length === 0}
                >
                    Confirmar pedido
                </Button>
            </form>
            {showQR && orderNumber && (
                <Box sx={{mt: 4, textAlign: 'center'}}>
                    <Typography variant="subtitle1">Muestra este QR en el mostrador</Typography>
                    <QRCodeSVG value={orderNumber} size={180}/>
                    <Typography variant="body2" sx={{mt: 1}}>Nº de pedido: {orderNumber}</Typography>
                </Box>
            )}
        </Box>
    );
}
