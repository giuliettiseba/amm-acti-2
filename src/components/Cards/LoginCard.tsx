import {Alert, alpha, Box, Button, Card, CardContent, CircularProgress, TextField, Typography} from '@mui/material';
import {Login as LoginIcon, PersonAdd as PersonAddIcon} from '@mui/icons-material';
import React from 'react';

/**
 * LoginCard
 *
 * Muestra el formulario de login y el botón para crear usuario en una tarjeta.
 *
 * @param {object} props
 * @param {string} props.username - Nombre de usuario.
 * @param {function} props.setUsername - Setter para el nombre de usuario.
 * @param {string} props.password - Contraseña.
 * @param {function} props.setPassword - Setter para la contraseña.
 * @param {string|null} props.error - Mensaje de error.
 * @param {boolean} props.loading - Estado de carga.
 * @param {function} props.onSubmit - Función para manejar el submit del formulario.
 * @param {string|null} props.usuarioCreado - Mensaje de usuario creado.
 * @param {function} props.onOpenCrearUsuario - Función para abrir el modal de crear usuario.
 * @param {React.ReactNode} props.children - Elementos hijos (por ejemplo, el modal de crear usuario).
 * @returns {JSX.Element}
 */
export default function LoginCard({
    username,
    setUsername,
    password,
    setPassword,
    error,
    loading,
    onSubmit,
    usuarioCreado,
    onOpenCrearUsuario,
    children
}: {
    username: string,
    setUsername: (v: string) => void,
    password: string,
    setPassword: (v: string) => void,
    error: string | null,
    loading: boolean,
    onSubmit: (e: React.FormEvent) => void,
    usuarioCreado: string | null,
    onOpenCrearUsuario: () => void,
    children?: React.ReactNode
}) {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh'}}>
            <Card sx={(theme) => ({
                maxWidth: 400,
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
                        <LoginIcon sx={{fontSize: 40, color: 'primary.main', mb: 1}}/>
                        <Typography variant="h4" component="h2" sx={{fontWeight: 600}}>
                            Iniciar Sesión
                        </Typography>
                    </Box>

                    <Box component="form" onSubmit={onSubmit} sx={{mt: 2}}>
                        <TextField
                            fullWidth
                            label="Usuario"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Contraseña"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            margin="normal"
                            variant="outlined"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{mt: 3, mb: 2, py: 1.5}}
                            startIcon={loading ? <CircularProgress size={20}/> : <LoginIcon/>}
                        >
                            {loading ? 'Accediendo...' : 'Entrar'}
                        </Button>

                        {error && (
                            <Alert severity="error" sx={{mt: 2}}>
                                {error}
                            </Alert>
                        )}

                        {usuarioCreado && (
                            <Alert severity="success" sx={{mt: 2}}>{usuarioCreado}</Alert>
                        )}
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{mt: 2, mb: 0.5, py: 1.2}}
                            onClick={onOpenCrearUsuario}
                            startIcon={<PersonAddIcon/>}
                        >
                            Crear usuario
                        </Button>
                        <Alert severity="info" sx={{mt: 2}}>
                            <Typography variant="body2">
                                Login simulado: cualquier combinación será aceptada si la API mock no responde.
                            </Typography>
                        </Alert>
                    </Box>
                </CardContent>
            </Card>
            {children}
        </Box>
    );
}

