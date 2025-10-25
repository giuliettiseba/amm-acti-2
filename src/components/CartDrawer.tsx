import {
    alpha,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography
} from '@mui/material';
import {Close, Delete} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import type {CarritoItem} from "../types";
import {useOrder} from "../context/OrderContext.tsx";
import type {CartDrawerProps} from "../types/props/CartDrawerProps.tsx";

export default function CartDrawer({open, onClose}: CartDrawerProps) {
    const {carrito, quitarItem, actualizarCantidad, limpiarCarrito} = useOrder();
    const navigate = useNavigate();

    const getItemTitle = (item: CarritoItem) =>
        item.tipo === 'producto' ? item.producto.name : item.libro.titulo;
    const getItemPrice = (item: CarritoItem) =>
        item.tipo === 'producto' ? item.producto.price : item.libro.precio;

    const total = carrito.reduce(
        (sum, item) => sum + getItemPrice(item) * item.cantidad,
        0
    );

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            slotProps={{
                backdrop: {
                    sx: {
                        backdropFilter: 'blur(8px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }}
            PaperProps={{
                sx: (theme) => ({
                    width: '30vw',
                    minWidth: 320,
                    maxWidth: 480,
                    right: 0,
                    left: 'auto !important',
                    // Glass effect base
                    background: theme.palette.mode === 'dark'
                        ? alpha(theme.palette.background.paper, 0.85)
                        : alpha(theme.palette.background.paper, 0.95),
                    WebkitBackdropFilter: 'blur(24px)',
                    backdropFilter: 'blur(24px)',
                    // Diffuse neon border with secondary color
                    borderLeft: `2px solid ${alpha(theme.palette.secondary.main, 0.4)}`,
                    boxShadow: `
                        -30px 0 60px ${alpha(theme.palette.secondary.main, 0.2)},
                        inset 0 0 30px ${alpha(theme.palette.secondary.main, 0.08)}
                    `,
                    position: 'fixed',
                    overflow: 'visible',
                    // Decorative glow blob
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        right: '-15%',
                        top: '20%',
                        width: '60%',
                        height: '60%',
                        pointerEvents: 'none',
                        backgroundImage: `radial-gradient(400px 500px at 80% 50%,
                            ${alpha(theme.palette.secondary.main, 0.2)} 0%,
                            transparent 50%)`,
                        zIndex: 0,
                        filter: 'blur(40px)',
                        mixBlendMode: 'screen',
                        opacity: 0.9
                    }
                })
            }}
        >
            <Box sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                zIndex: 1
            }}>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 3}}>
                    <Typography
                        variant="h5"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Carrito
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        sx={(theme) => ({
                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            '&:hover': {
                                transform: 'rotate(90deg)',
                                bgcolor: alpha(theme.palette.error.main, 0.1)
                            }
                        })}
                    >
                        <Close/>
                    </IconButton>
                </Box>
                <Divider sx={(theme) => ({
                    mb: 2,
                    borderColor: alpha(theme.palette.secondary.main, 0.2)
                })}/>
                <List sx={{flexGrow: 1}}>
                    {carrito.length === 0 && (
                        <ListItem>
                            <ListItemText
                                primary={
                                    <Typography variant="body2" color="text.secondary"
                                                sx={{mt: 2, textAlign: 'center'}}>
                                        El carrito está vacío.
                                    </Typography>
                                }
                            />
                        </ListItem>
                    )}
                    {carrito.map((item, idx) => (
                        <ListItem
                            key={idx}
                            alignItems="flex-start"
                            sx={{gap: 1}}
                            secondaryAction={
                                <IconButton edge="end" onClick={() => quitarItem(item)}>
                                    <Delete/>
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={getItemTitle(item)}
                                secondary={
                                    <>
                                        <Typography variant="caption" color="text.secondary" component="span">
                                            {item.tipo === 'producto' ? 'Producto de cafetería' : 'Libro'}
                                        </Typography>
                                        <br/>
                                        <Typography variant="body2" component="span">
                                            Precio: {getItemPrice(item).toFixed(2)} €
                                        </Typography>
                                    </>
                                }
                            />
                            <TextField
                                type="number"
                                size="small"
                                value={item.cantidad}
                                slotProps={{htmlInput: {min: 1, style: {width: 50}}}}
                                onChange={e => {
                                    const val = Math.max(1, Number(e.target.value));
                                    actualizarCantidad(item, val);
                                }}
                                sx={{mr: 1}}
                            />
                        </ListItem>
                    ))}
                </List>
                <Divider sx={(theme) => ({
                    my: 2,
                    borderColor: alpha(theme.palette.secondary.main, 0.2)
                })}/>
                <Box sx={(theme) => ({
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                })}>
                    <Typography
                        variant="h6"
                        sx={{fontWeight: 600}}
                    >
                        Total:
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 800,
                            color: 'primary.main'
                        }}
                    >
                        ${total.toFixed(2)}
                    </Typography>
                </Box>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={limpiarCarrito}
                    disabled={carrito.length === 0}
                    size="large"
                    sx={(theme) => ({
                        mb: 1.5,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderRadius: 2,
                        textTransform: 'none',
                        borderWidth: 2,
                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        '&:hover': {
                            borderWidth: 2,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 16px ${alpha(theme.palette.secondary.main, 0.3)}`
                        }
                    })}
                >
                    Vaciar carrito
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={carrito.length === 0}
                    size="large"
                    onClick={() => {
                        onClose();
                        navigate('/pedido-resumen');
                    }}
                    sx={(theme) => ({
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderRadius: 2,
                        textTransform: 'none',
                        boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 6px 24px ${alpha(theme.palette.primary.main, 0.4)}`
                        }
                    })}
                >
                    Finalizar pedido
                </Button>
            </Box>
        </Drawer>
    );
}
