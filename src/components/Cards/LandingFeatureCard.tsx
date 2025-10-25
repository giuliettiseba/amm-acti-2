import {Box, Button, Card, CardContent, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import React from 'react';

/**
 * LandingFeatureCard
 *
 * Card para mostrar una funcionalidad destacada en la landing page.
 *
 * @param {object} props
 * @param {React.ReactNode} props.icon - Icono a mostrar.
 * @param {string} props.title - Título de la funcionalidad.
 * @param {string} props.description - Descripción de la funcionalidad.
 * @param {string} props.link - Ruta a la que navegar.
 * @returns {JSX.Element}
 */
export default function LandingFeatureCard({icon, title, description, link}: {
    icon: React.ReactNode,
    title: string,
    description: string,
    link: string
}) {
    return (
        <Card
            sx={{
                width: '100%',
                maxWidth: 360,
                height: 'auto',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <CardContent sx={{textAlign: 'center', flexGrow: 1}}>
                <Box sx={{color: 'primary.main', mb: 2}}>
                    {icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" component="p">
                    {description}
                </Typography>
                <Button
                    component={Link}
                    to={link}
                    variant="contained"
                    color="primary"
                    sx={{mt: 2}}
                >
                    Explorar
                </Button>
            </CardContent>
        </Card>
    );
}

