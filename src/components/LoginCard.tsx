import {Alert, Box, Button, Card, CardContent, CircularProgress, TextField, Typography} from '@mui/material';
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
            <Card sx={{maxWidth: 400, width: '100%'}}>
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

