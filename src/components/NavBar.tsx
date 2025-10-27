/**
 * Componente NavBar
 *
 * Este componente renderiza la barra de navegacion para la aplicacion. Incluye enlaces de navegacion,
 * un boton de alternancia de tema, y un boton de autenticacion/cierre de sesion de usuario. El NavBar es responsivo
 * y se adapta a diferentes tamanos de pantalla.
 *
 * @component
 * @param {Object} props - Las propiedades para el componente NavBar.
 * @param {boolean} props.isAuthenticated - Indica si el usuario esta autenticado.
 * @param {function} props.onLogout - Callback para cerrar sesion del usuario.
 * @param {function} props.toggleTheme - Callback para alternar el modo de tema.
 * @param {"light" | "dark"} props.themeMode - El modo de tema actual (claro u oscuro).
 */

// Importar modulos y componentes necesarios
import {NavLink, useNavigate} from 'react-router-dom';
import React, {useState} from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme as useMuiTheme
} from '@mui/material';
import {DarkMode, LightMode, Logout, Menu as MenuIcon, Person} from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useAuthContext} from '../context/AuthContext';
import CartDrawer from './drawers/CartDrawer.tsx';
import MobileDrawer from './drawers/MobileDrawer';
import Badge from '@mui/material/Badge';
import {useTheme} from '../context/ThemeContext.tsx';
import {useOrder} from "../context/OrderContext.tsx";
import {navItems} from "../constants/navItems.ts";

export default function NavBar() {
    const {isAuthenticated, logout, user} = useAuthContext();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [cartOpen, setCartOpen] = useState(false);
    const {mode, toggleMode} = useTheme();
    const muiTheme = useMuiTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
    const {carrito} = useOrder();

    const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setAnchorEl(null);
    };

    /**
     * Maneja la accion de cierre de sesion.
     * Cierra la sesion del usuario y navega a la pagina principal.
     */
    function handleLogout() {
        logout();
        navigate('/', {replace: true});
        setMobileOpen(false);
        handleUserMenuClose();
    }

    /**
     * Navega a la pagina de perfil del usuario.
     */
    function handleProfileClick() {
        navigate('/perfil');
        handleUserMenuClose();
    }



    return (
        <AppBar position="sticky" color="default" elevation={1}>
            <Toolbar>
                {isMobile && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => setMobileOpen(true)}
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                )}

                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: isMobile ? 1 : 0,
                        mr: isMobile ? 0 : 4,
                        cursor: 'pointer',
                        fontWeight: 600
                    }}
                    onClick={() => navigate('/')}
                >
                    Nexus
                </Typography>

                {/* Icono de carrito para movil, lado derecho del AppBar */}
                {isMobile && (
                    <IconButton
                        color="inherit"
                        onClick={() => setCartOpen(true)}
                        aria-label="Ver carrito"
                        sx={{ml: 'auto'}}
                    >
                        <Badge badgeContent={carrito.reduce((sum, item) => sum + item.cantidad, 0)} color="secondary"
                               showZero>
                            <ShoppingCartIcon/>
                        </Badge>
                    </IconButton>
                )}

                {!isMobile && (
                    <Box sx={{display: 'flex', alignItems: 'center', flexGrow: 1, gap: 1}}>
                        {navItems.map((item) => (
                            <Button
                                key={item.path}
                                component={NavLink}
                                to={item.path}
                                color="inherit"
                                className="nav-item"
                                sx={{
                                    '&.active': {
                                        backgroundColor: 'primary.main',
                                        color: 'primary.contrastText',
                                        '&:hover': {
                                            backgroundColor: 'primary.dark',
                                        }
                                    }
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                )}

                {!isMobile && (
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <IconButton
                            color="inherit"
                            onClick={() => setCartOpen(true)}
                            aria-label="Ver carrito"
                            sx={{position: 'relative'}}
                        >
                            <Badge badgeContent={carrito.reduce((sum, item) => sum + item.cantidad, 0)}
                                   color="secondary" showZero>
                                <ShoppingCartIcon/>
                            </Badge>
                        </IconButton>

                        <IconButton
                            color="inherit"
                            onClick={toggleMode}
                            aria-label={mode === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                        >
                            {mode === 'dark' ? <LightMode/> : <DarkMode/>}
                        </IconButton>

                        {isAuthenticated ? (
                            <IconButton
                                onClick={handleUserMenuOpen}
                                sx={{p: 0}}
                                aria-label="Menú de usuario"
                            >
                                <Avatar
                                    sx={{width: 40, height: 40}}
                                    alt={user?.nombre || 'Usuario'}
                                    src={user?.avatar}
                                >
                                    {user?.nombre?.charAt(0).toUpperCase() || 'U'}
                                </Avatar>
                            </IconButton>
                        ) : (
                            <Button color="primary" variant="contained" component={NavLink} to="/login"
                                    className="nav-item">
                                Login
                            </Button>
                        )}
                    </Box>
                )}
            </Toolbar>

            <MobileDrawer
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                navItems={navItems}
                mode={mode}
                toggleMode={toggleMode}
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
            />

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
            >
                <MenuItem onClick={handleProfileClick}>
                    <ListItemIcon>
                        <Person fontSize="small"/>
                    </ListItemIcon>
                    Perfil
                </MenuItem>
                <Divider/>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Salir
                </MenuItem>
            </Menu>

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)}/>
        </AppBar>
    );
}
