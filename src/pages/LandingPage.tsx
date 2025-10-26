/**
 * LandingPage
 *
 * Página principal de la aplicación Nexus.
 *
 * Muestra una introducción y una selección de funcionalidades principales (catálogo de libros, coworking, cafetería)
 * mediante tarjetas de acceso rápido. Utiliza el componente LandingFeatureCard para cada funcionalidad destacada.
 *
 * @component
 * @returns {JSX.Element} Página de bienvenida con tarjetas de funcionalidades.
 *
 * @example
 * <LandingPage />
 */
import {Box, Typography} from '@mui/material';
import {MenuBook, Work, LocalCafe} from '@mui/icons-material';
import LandingFeatureCard from '../components/cards/LandingFeatureCard.tsx';

export default function LandingPage() {
    /**
     * Lista de funcionalidades principales a mostrar en la landing.
     * @type {Array<{icon: React.ReactNode, title: string, description: string, link: string}>}
     */
    const features = [
        {
            icon: <MenuBook sx={{fontSize: 40}}/>,
            title: 'Catálogo de Libros',
            description: 'Explora nuestra amplia colección de libros académicos y literatura.',
            link: '/catalogo'
        },
        {
            icon: <Work sx={{fontSize: 40}}/>,
            title: 'Espacio Co-working',
            description: 'Reserva tu espacio de estudio en un ambiente colaborativo.',
            link: '/coworking'
        },
        {
            icon: <LocalCafe sx={{fontSize: 40}}/>,
            title: 'Cafetería',
            description: 'Disfruta de nuestro menú mientras estudias o trabajas.',
            link: '/cafeteria'
        }
    ];

    return (
        <Box>
            <Box sx={{textAlign: 'center', mb: 6}}>
                <Typography variant="h2" component="h1" gutterBottom sx={{fontWeight: 600}}>
                    Librería Universitaria Nexus
                </Typography>
                <Typography variant="h5" color="text.secondary" component="p" gutterBottom sx={{fontWeight: 400}}>
                    Bienvenido/a a la plataforma integral que combina librería, zona de co-working y cafetería.
                </Typography>
                <Typography variant="body1" color="text.secondary" component="p">
                    Explora el catálogo, reserva un espacio o disfruta de nuestra cafetería.
                </Typography>
            </Box>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(auto-fit, minmax(280px, 1fr))',
                    md: 'repeat(auto-fit, minmax(300px, 1fr))',
                    lg: 'repeat(auto-fit, minmax(360px, 1fr))'
                },
                gap: {xs: 2, sm: 3},
                justifyItems: 'center',
                mt: 4
            }}>
                {features.map((feature, index) => (
                    <LandingFeatureCard
                        key={index}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                        link={feature.link}
                    />
                ))}
            </Box>
        </Box>
    );
}
