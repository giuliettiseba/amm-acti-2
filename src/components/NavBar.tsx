import {NavLink, useNavigate} from 'react-router-dom';
import React, {useState} from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme as useMuiTheme
} from '@mui/material';
import {Close as CloseIcon, DarkMode, LightMode, Logout, Menu as MenuIcon, Person} from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useAuthContext} from '../context/AuthContext';
import CartDrawer from './CartDrawer';
import Badge from '@mui/material/Badge';
import {useTheme} from '../context/ThemeContext.tsx';
import {useOrder} from "../context/OrderContext.tsx";

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

    function handleLogout() {
        logout();
        navigate('/', {replace: true});
        setMobileOpen(false);
        handleUserMenuClose();
    }

    function handleProfileClick() {
        navigate('/perfil');
        handleUserMenuClose();
    }

    function handleNavClick() {
        setMobileOpen(false);
    }

    const navItems = [
        {label: 'Inicio', path: '/'},
        {label: 'Catálogo', path: '/catalogo'},
        {label: 'Cafetería', path: '/cafeteria'},
        {label: 'Co-working', path: '/coworking'},
    ];

    const drawer = (
        <Box sx={{width: 250}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2}}>
                <Typography variant="h6">Nexus</Typography>
                <IconButton onClick={() => setMobileOpen(false)}>
                    <CloseIcon/>
                </IconButton>
            </Box>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton
                            component={NavLink}
                            to={item.path}
                            onClick={handleNavClick}
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
                            <ListItemText primary={item.label}/>
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {
                        toggleMode();
                        handleNavClick();
                    }}>
                        <ListItemText primary={mode === 'dark' ? '🌙 Oscuro' : '☀️ Claro'}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    {isAuthenticated ? (
                        <ListItemButton onClick={handleLogout}>
                            <ListItemText primary="Salir"/>
                        </ListItemButton>
                    ) : (
                        <ListItemButton component={NavLink} to="/login" onClick={handleNavClick}>
                            <ListItemText primary="Login"/>
                        </ListItemButton>
                    )}
                </ListItem>
            </List>
        </Box>
    );

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

                {/* Cart icon for mobile, right side of AppBar */}
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
                            <Button color="primary" variant="contained" component={NavLink} to="/login">
                                Login
                            </Button>
                        )}
                    </Box>
                )}
            </Toolbar>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                ModalProps={{keepMounted: true}}
            >
                {drawer}
            </Drawer>

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
