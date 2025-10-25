/**
 * PerfilUsuarioCard
 *
 * Muestra la información del usuario autenticado en una tarjeta (Card) con opción de cerrar sesión.
 * Utiliza Material UI para el diseño y estilos.
 *
 * - Muestra avatar, nombre, email, usuario, teléfono, empresa e ID del usuario.
 * - Si no hay usuario autenticado, muestra una alerta de advertencia.
 * - Permite cerrar sesión mediante un botón.
 *
 * @component
 * @returns {JSX.Element} Card con los datos del usuario y botón de logout.
 *
 * @example
 * <PerfilUsuarioCard />
 */
import {Alert, alpha, Avatar, Box, Button, Card, CardContent, Divider, Typography} from '@mui/material';
import {Email, Logout, Person} from '@mui/icons-material';
import {useAuthContext} from '../../context/AuthContext.tsx';

export default function PerfilUsuarioCard() {
    // Obtiene el usuario autenticado y la función de logout del contexto de autenticación
    const {user, logout} = useAuthContext();

    // Si no hay usuario, muestra una alerta
    if (!user) {
        return (
            <Alert severity="warning">
                No se encontró la sesión del usuario.
            </Alert>
        );
    }

    // Renderiza la tarjeta con los datos del usuario
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)', px: 2}}>
            <Card sx={(theme) => ({
                maxWidth: 600,
                width: '100%',
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
                <CardContent sx={{p: 4}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3}}>
                        <Avatar
                            src={user.avatar || undefined}
                            sx={{width: 80, height: 80, mb: 2, bgcolor: 'primary.main'}}
                        >
                            {/* Si no hay avatar, muestra el icono de persona */}
                            {!user.avatar && <Person sx={{fontSize: 40}}/>}
                        </Avatar>
                        <Typography variant="h4" component="h2" sx={{fontWeight: 600}}>
                            Perfil del Usuario
                        </Typography>
                    </Box>

                    <Divider sx={{mb: 3}}/>

                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        {/* Nombre */}
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                            <Person color="action"/>
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Nombre
                                </Typography>
                                <Typography variant="body1" sx={{fontWeight: 500}}>
                                    {user.firstName + ' ' + user.lastName}
                                </Typography>
                            </Box>
                        </Box>
                        {/* Email */}
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                            <Email color="action"/>
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Email
                                </Typography>
                                <Typography variant="body1" sx={{fontWeight: 500}}>
                                    {user.email}
                                </Typography>
                            </Box>
                        </Box>
                        {/* Usuario */}
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                            <Typography variant="body2" color="text.secondary" sx={{minWidth: 100}}>
                                Usuario
                            </Typography>
                            <Typography variant="body1" sx={{fontWeight: 500}}>
                                {user.username}
                            </Typography>
                        </Box>
                        {/* Teléfono */}
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                            <Typography variant="body2" color="text.secondary" sx={{minWidth: 100}}>
                                Teléfono
                            </Typography>
                            <Typography variant="body1" sx={{fontWeight: 500}}>
                                {user.phoneNumber}
                            </Typography>
                        </Box>
                        {/* Empresa */}
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                            <Typography variant="body2" color="text.secondary" sx={{minWidth: 100}}>
                                Empresa
                            </Typography>
                            <Typography variant="body1" sx={{fontWeight: 500}}>
                                {user.company || '-'}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{my: 3}}/>

                    {/* Botón para cerrar sesión */}
                    <Button
                        variant="contained"
                        color="error"
                        onClick={logout}
                        startIcon={<Logout/>}
                        fullWidth
                        sx={{py: 1.5}}
                    >
                        Cerrar sesión
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}
