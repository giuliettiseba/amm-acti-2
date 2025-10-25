import {useAuthContext} from '../context/AuthContext';
import {Alert, Avatar, Box, Button, Card, CardContent, Divider, Typography} from '@mui/material';
import {Email, Logout, Person} from '@mui/icons-material';

export default function PerfilUsuarioPage() {
    const {user, logout} = useAuthContext();

    if (!user) {
        return (
            <Alert severity="warning">
                No se encontró la sesión del usuario.
            </Alert>
        );
    }

    return (
        <Box sx={{maxWidth: 600, mx: 'auto'}}>
            <Card>
                <CardContent sx={{p: 4}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3}}>
                        <Avatar
                            src={user.avatar || undefined}
                            sx={{width: 80, height: 80, mb: 2, bgcolor: 'primary.main'}}
                        >
                            {!user.avatar && <Person sx={{fontSize: 40}}/>}
                        </Avatar>
                        <Typography variant="h4" component="h2" sx={{fontWeight: 600}}>
                            Perfil del Usuario
                        </Typography>
                    </Box>

                    <Divider sx={{mb: 3}}/>

                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
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

                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                            <Typography variant="body2" color="text.secondary" sx={{minWidth: 100}}>
                                Usuario
                            </Typography>
                            <Typography variant="body1" sx={{fontWeight: 500}}>
                                {user.username}
                            </Typography>
                        </Box>

                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                            <Typography variant="body2" color="text.secondary" sx={{minWidth: 100}}>
                                Teléfono
                            </Typography>
                            <Typography variant="body1" sx={{fontWeight: 500}}>
                                {user.phoneNumber}
                            </Typography>
                        </Box>

                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                            <Typography variant="body2" color="text.secondary" sx={{minWidth: 100}}>
                                Empresa
                            </Typography>
                            <Typography variant="body1" sx={{fontWeight: 500}}>
                                {user.company || '-'}
                            </Typography>
                        </Box>

                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                            <Typography variant="body2" color="text.secondary" sx={{minWidth: 100}}>
                                ID
                            </Typography>
                            <Typography variant="body1" sx={{fontWeight: 500}}>
                                {user.id}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{my: 3}}/>

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
