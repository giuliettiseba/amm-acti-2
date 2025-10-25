import {useLocation, useNavigate} from 'react-router-dom';
import {type FormEvent, useEffect, useState} from 'react';
import {useAuthContext} from '../context/AuthContext';
import {Alert, Box, Button, Card, CardContent, CircularProgress, TextField, Typography} from '@mui/material';
import {Login as LoginIcon, PersonAdd as PersonAddIcon} from '@mui/icons-material';
import DialogCrearUsuario from '../components/DialogCrearUsuario';

export default function LoginPage() {
    const {login, isAuthenticated} = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation() as any;
    const [username, setUsername] = useState('usuario');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [openCrearUsuario, setOpenCrearUsuario] = useState(false);
    const [usuarioCreado, setUsuarioCreado] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) navigate('/perfil', {replace: true});
    }, [isAuthenticated, navigate]);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(username, password);
            const redirectTo = location.state?.from || '/perfil';
            navigate(redirectTo, {replace: true});
        } catch (e: any) {
            setError(e?.message || 'Error en login');
        } finally {
            setLoading(false);
        }
    }

    if (isAuthenticated) return null;

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

                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 2}}>
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
                            onClick={() => setOpenCrearUsuario(true)}
                            startIcon={<PersonAddIcon />}
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
            <DialogCrearUsuario
                open={openCrearUsuario}
                onClose={() => setOpenCrearUsuario(false)}
                onSuccess={(user) => {
                    setUsuarioCreado(`Usuario '${user.username}' creado correctamente. Ahora puedes iniciar sesión.`);
                    setOpenCrearUsuario(false);
                }}
            />
        </Box>
    );
}
