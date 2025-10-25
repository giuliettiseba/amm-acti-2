/**
 * NotFoundPage
 *
 * Página de error 404 para rutas no encontradas.
 * Muestra un mensaje de error, un icono y un botón para volver al inicio.
 * Utiliza Material UI para el diseño y estilos.
 *
 * @component
 * @returns {JSX.Element} Página de error 404 con mensaje y botón de navegación.
 *
 * @example
 * <NotFoundPage />
 */
import {Box, Button, Card, CardContent, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {Error, Home} from '@mui/icons-material';

export default function NotFoundPage() {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh'}}>
            <Card sx={{maxWidth: 500, textAlign: 'center'}}>
                <CardContent sx={{p: 4}}>
                    <Box sx={{mb: 3}}>
                        <Error sx={{fontSize: 80, color: 'error.main', mb: 2}}/>
                        <Typography variant="h3" component="h2" sx={{fontWeight: 600, mb: 1}}>
                            404
                        </Typography>
                        <Typography variant="h5" color="text.secondary" gutterBottom>
                            Recurso no encontrado
                        </Typography>
                    </Box>

                    <Typography variant="body1" color="text.secondary" sx={{mb: 3}}>
                        La ruta solicitada no existe. Verifique la URL o utilice el menú de navegación.
                    </Typography>

                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        startIcon={<Home/>}
                        size="large"
                    >
                        Volver al inicio
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}
