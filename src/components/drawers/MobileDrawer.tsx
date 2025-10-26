/**
 * MobileDrawer Component
 *
 * This component renders a mobile-friendly navigation drawer with a glass-like appearance.
 * It supports navigation items, theme toggling, and user authentication actions.
 *
 * @param {MobileDrawerProps} props - The props for the MobileDrawer component.
 * @param {boolean} props.open - Determines if the drawer is open.
 * @param {function} props.onClose - Callback to close the drawer.
 * @param {Array<{path: string, label: string}>} props.navItems - List of navigation items with paths and labels.
 * @param {"light" | "dark"} props.mode - Current theme mode (light or dark).
 * @param {function} props.toggleMode - Callback to toggle the theme mode.
 * @param {boolean} props.isAuthenticated - Indicates if the user is authenticated.
 * @param {function} props.onLogout - Callback to log the user out.
 */

// Import necessary modules and components
import {NavLink} from 'react-router-dom';
import {
    alpha,
    Avatar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {Close as CloseIcon} from '@mui/icons-material';
import type {MobileDrawerProps} from "../../types/props/MobileDrawerProps.tsx";
import {useAuthContext} from '../../context/AuthContext';

export default function MobileDrawer({
                                         open,
                                         onClose,
                                         navItems,
                                         mode,
                                         toggleMode,
                                         isAuthenticated,
                                         onLogout
                                     }: MobileDrawerProps) {
    const {user} = useAuthContext(); // Access user data from AuthContext

    /**
     * Handles navigation item click.
     * Closes the drawer after a navigation item is selected.
     */
    const handleNavClick = () => {
        onClose();
    };

    /**
     * Handles logout action.
     * Logs the user out and closes the drawer.
     */
    const handleLogout = () => {
        onLogout();
        onClose();
    };

    return (
        <Drawer
            variant="temporary"
            open={open}
            onClose={onClose}
            ModalProps={{keepMounted: true}}
            slotProps={{
                backdrop: {
                    sx: {
                        backdropFilter: 'blur(8px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                paper: {
                    sx: (theme) => ({
                        width: 250,
                        left: 0,
                        right: 'auto !important',
                        // Glass effect base
                        background: theme.palette.mode === 'dark'
                            ? alpha(theme.palette.background.paper, 0.85)
                            : alpha(theme.palette.background.paper, 0.95),
                        WebkitBackdropFilter: 'blur(24px)',
                        backdropFilter: 'blur(24px)',
                        // Diffuse neon border with secondary color
                        borderRight: `2px solid ${alpha(theme.palette.secondary.main, 0.4)}`,
                        boxShadow: `
                            30px 0 60px ${alpha(theme.palette.secondary.main, 0.2)},
                            inset 0 0 30px ${alpha(theme.palette.secondary.main, 0.08)}
                        `,
                        position: 'fixed',
                        overflow: 'visible',
                        // Decorative glow blob
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            left: '-15%',
                            top: '20%',
                            width: '60%',
                            height: '60%',
                            pointerEvents: 'none',
                            backgroundImage: `radial-gradient(400px 500px at 20% 50%,
                                ${alpha(theme.palette.secondary.main, 0.2)} 0%,
                                transparent 50%)`,
                            zIndex: 0,
                            filter: 'blur(40px)',
                            mixBlendMode: 'screen',
                            opacity: 0.9
                        }
                    })
                }
            }}
        >
            <Box sx={{
                width: 250,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                zIndex: 1
            }}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2}}>
                    {isAuthenticated ? (
                        <ListItemButton component={NavLink} to="/perfil" onClick={handleNavClick} className="nav-item">
                            <ListItemIcon>
                                <Avatar
                                    sx={{width: 24, height: 24}}
                                    alt={user?.firstName || 'Usuario'}
                                    src={user?.avatar}
                                >
                                    {user?.nombre?.charAt(0).toUpperCase() || 'U'}
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText primary={user?.firstName}/>
                        </ListItemButton>
                    ) : <ListItemButton component={NavLink} to="/login" onClick={handleNavClick}
                                        className="nav-item">
                        <ListItemText primary="Login"/>
                    </ListItemButton>}
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
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <Divider sx={(theme) => ({
                    mb: 1,
                    borderColor: alpha(theme.palette.secondary.main, 0.2)
                })}/>
                <List className="list-drawer">


                    <ListItem disablePadding>

                    </ListItem>


                    {navItems.map((item) => (
                        <ListItem key={item.path} disablePadding>
                            <ListItemButton
                                component={NavLink}
                                to={item.path}
                                onClick={handleNavClick}
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
                                <ListItemText primary={item.label}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {
                            toggleMode();
                            handleNavClick();
                        }} className="nav-item">
                            <ListItemText primary={mode === 'dark' ? '🌙 Oscuro' : '☀️ Claro'}/>
                        </ListItemButton>
                    </ListItem>


                    <ListItem disablePadding>
                        {isAuthenticated ? (
                            <ListItemButton onClick={handleLogout} className="nav-item">
                                <ListItemText primary="Salir"/>
                            </ListItemButton>
                        ) : null}
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
        ;
}
