import {alpha, Box, Button, Card, CardContent, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import React, {type JSX} from 'react';

/**
 * LandingFeatureCard
 *
 * Card para mostrar una funcionalidad destacada en la landing page con glass effect y borde neón.
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
}): JSX.Element {
    return (
        <Card
            sx={(theme) => ({
                width: '100%',
                maxWidth: 360,
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                borderRadius: '20px',
                overflow: 'visible',
                // Glass effect base
                background: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.background.paper, 0.06)
                    : alpha(theme.palette.background.paper, 0.48),
                WebkitBackdropFilter: 'blur(16px)',
                backdropFilter: 'blur(16px)',
                // Diffuse neon border with secondary color
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                boxShadow: `
                    0 24px 40px ${alpha(theme.palette.secondary.main, 0.12)},
                    0 0 20px ${alpha(theme.palette.secondary.main, 0.1)},
                    inset 0 0 20px ${alpha(theme.palette.secondary.main, 0.05)}
                `,
                transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.35s ease',
                '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: `
                        0 42px 100px ${alpha(theme.palette.secondary.main, 0.28)},
                        0 0 40px ${alpha(theme.palette.secondary.main, 0.2)},
                        inset 0 0 30px ${alpha(theme.palette.secondary.main, 0.08)}
                    `,
                    borderColor: alpha(theme.palette.secondary.main, 0.5),
                },
                // Subtle inner glow gradient
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '20px',
                    padding: '1px',
                    background: `linear-gradient(135deg,
                        ${alpha(theme.palette.secondary.main, 0.2)} 0%,
                        ${alpha(theme.palette.secondary.light, 0.1)} 50%,
                        ${alpha(theme.palette.secondary.main, 0.15)} 100%)`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none',
                    zIndex: 1
                },
                // Decorative glow blobs
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: '-18%',
                    top: '-5%',
                    width: '80%',
                    height: '130%',
                    pointerEvents: 'none',
                    backgroundImage: `radial-gradient(600px 400px at 8% 50%,
                        ${alpha(theme.palette.secondary.main, 0.18)} 0%,
                        transparent 35%),
                    radial-gradient(500px 300px at 95% 70%,
                        ${alpha(theme.palette.primary.main, 0.12)} 0%,
                        transparent 30%)`,
                    zIndex: 0,
                    filter: 'blur(22px) saturate(1.1)',
                    mixBlendMode: 'screen',
                    opacity: 0.95,
                    transition: 'filter 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.35s ease',
                },
                '&:hover::after': {
                    filter: 'blur(28px) saturate(1.3)',
                    opacity: 1,
                },
                // Ensure children are above decorative elements
                '& > *': {
                    position: 'relative',
                    zIndex: 2
                }
            })}
        >
            <CardContent sx={{
                textAlign: 'center',
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 4,
                gap: 2
            }}>
                <Box sx={(theme) => ({
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
                    transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    '& > svg': {
                        fontSize: '2.5rem'
                    },
                    '.MuiCard-root:hover &': {
                        transform: 'scale(1.1) rotate(5deg)',
                        boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.3)}`
                    }
                })}>
                    {icon}
                </Box>
                <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        letterSpacing: '-0.02em',
                        color: 'text.primary',
                        mt: 1
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body1"
                    component="p"
                    sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                        flex: 1
                    }}
                >
                    {description}
                </Typography>
                <Button
                    component={Link}
                    to={link}
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={(theme) => ({
                        mt: 2,
                        px: 4,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderRadius: 2,
                        textTransform: 'none',
                        boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 6px 24px ${alpha(theme.palette.primary.main, 0.4)}`
                        }
                    })}
                >
                    Explorar
                </Button>
            </CardContent>
        </Card>
    );
}

