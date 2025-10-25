import {Box, Button, Card, CardContent, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {LocalCafe, MenuBook, Work} from '@mui/icons-material';

export default function LandingPage() {
  const features = [
    {
      icon: <MenuBook sx={{ fontSize: 40 }} />,
      title: 'Catálogo de Libros',
      description: 'Explora nuestra amplia colección de libros académicos y literatura.',
      link: '/catalogo'
    },
    {
      icon: <Work sx={{ fontSize: 40 }} />,
      title: 'Espacio Co-working',
      description: 'Reserva tu espacio de estudio en un ambiente colaborativo.',
      link: '/coworking'
    },
    {
      icon: <LocalCafe sx={{ fontSize: 40 }} />,
      title: 'Cafetería',
      description: 'Disfruta de nuestro menú mientras estudias o trabajas.',
      link: '/cafeteria'
    }
  ];

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Librería Universitaria Nexus
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Bienvenido/a a la plataforma integral que combina librería, zona de co-working y cafetería.
        </Typography>
        <Typography variant="body1" color="text.secondary">
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
        gap: { xs: 2, sm: 3 },
        justifyItems: 'center',
        mt: 4
      }}>
        {features.map((feature, index) => (
          <Card
            key={index}
            sx={{
              width: '100%',
              maxWidth: 360,
              height: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {feature.icon}
              </Box>
              <Typography variant="h6" component="h3" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {feature.description}
              </Typography>
              <Button
                component={Link}
                to={feature.link}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Explorar
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
