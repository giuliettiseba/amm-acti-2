import {alpha, Box, Card, Fade, Grid, Skeleton as MuiSkeleton, Stack} from '@mui/material';
import type {CardSkeletonProps} from "../types/props/CardSkeletonProps.tsx";
import {useTheme} from '@mui/material/styles';

export function CardSkeleton({width = '100%', imageHeight = 160, showCategory = true, visible = true}: CardSkeletonProps) {
    const theme = useTheme();

    return (
        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
            {Array.from({length: 12}).map((_, index) => (
                <Grid key={index} size={{xs: 2, sm: 4, md: 4}}>
                    <Fade
                        in={visible}
                        timeout={{enter: 100, exit: 350}}
                        unmountOnExit
                    >
                        <Box sx={{
                            transform: 'scale(0.5)',
                            transformOrigin: 'center center',
                            transition: 'transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 350ms ease'
                        }}>
                            <Card sx={{
                                width,
                                borderRadius: '20px',
                                overflow: 'visible',
                                padding: 3,
                                gap: 0.5,
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                // Glass effect base
                                background: theme.palette.mode === 'dark'
                                    ? alpha(theme.palette.background.paper, 0.04)
                                    : alpha(theme.palette.background.paper, 0.35),
                                WebkitBackdropFilter: 'blur(20px)',
                                backdropFilter: 'blur(20px)',
                                // Diffuse neon border with secondary color
                                border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                                boxShadow: `
                                    0 0 20px ${alpha(theme.palette.secondary.main, 0.15)},
                                    0 0 40px ${alpha(theme.palette.secondary.main, 0.1)},
                                    inset 0 0 20px ${alpha(theme.palette.secondary.main, 0.05)}
                                `,
                                // Overall opacity
                                opacity: 0.6,
                                // Subtle inner glow
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
                                    left: '-10%',
                                    top: '-10%',
                                    width: '60%',
                                    height: '80%',
                                    pointerEvents: 'none',
                                    backgroundImage: `radial-gradient(400px 300px at 20% 40%,
                                        ${alpha(theme.palette.secondary.main, 0.12)} 0%,
                                        transparent 40%)`,
                                    zIndex: 0,
                                    filter: 'blur(30px)',
                                    mixBlendMode: 'screen',
                                    opacity: 0.8
                                },
                                // Ensure children are above decorative elements
                                '& > *': {
                                    position: 'relative',
                                    zIndex: 2
                                }
                            }}>
                                <Box sx={{position: 'relative', mb: 0.5}}>
                                    {/* image skeleton - matches GenericCardImage height */}
                                    <MuiSkeleton
                                        variant="rectangular"
                                        width="100%"
                                        height={imageHeight}
                                        sx={{
                                            borderRadius: 1,
                                            bgcolor: alpha(theme.palette.secondary.main, 0.15),
                                            opacity: 0.5
                                        }}
                                    />

                                    {/* floating category chip skeleton */}
                                    {showCategory && (
                                        <Box sx={{position: 'absolute', top: 12, left: 12}}>
                                            <MuiSkeleton
                                                variant="rounded"
                                                width={80}
                                                height={24}
                                                sx={{
                                                    borderRadius: 9999,
                                                    bgcolor: alpha(theme.palette.secondary.main, 0.2),
                                                    opacity: 0.6
                                                }}
                                            />
                                        </Box>
                                    )}
                                </Box>

                                <Stack spacing={0.5}>
                                    {/* title - h6 typography */}
                                    <MuiSkeleton
                                        variant="text"
                                        width="70%"
                                        height={32}
                                        sx={{
                                            bgcolor: alpha(theme.palette.secondary.main, 0.15),
                                            opacity: 0.5
                                        }}
                                    />

                                    {/* subtitle - subtitle2 */}
                                    <MuiSkeleton
                                        variant="text"
                                        width="45%"
                                        height={22}
                                        sx={{
                                            bgcolor: alpha(theme.palette.secondary.main, 0.12),
                                            opacity: 0.5
                                        }}
                                    />

                                    {/* description - body2 */}
                                    <MuiSkeleton
                                        variant="text"
                                        width="100%"
                                        height={20}
                                        sx={{
                                            bgcolor: alpha(theme.palette.secondary.main, 0.1),
                                            opacity: 0.5
                                        }}
                                    />
                                    <MuiSkeleton
                                        variant="text"
                                        width="90%"
                                        height={20}
                                        sx={{
                                            bgcolor: alpha(theme.palette.secondary.main, 0.1),
                                            opacity: 0.5
                                        }}
                                    />

                                    {/* price - subtitle1 */}
                                    <MuiSkeleton
                                        variant="text"
                                        width={80}
                                        height={28}
                                        sx={{
                                            mt: 0.5,
                                            bgcolor: alpha(theme.palette.secondary.main, 0.18),
                                            opacity: 0.6
                                        }}
                                    />

                                    {/* button */}
                                    <MuiSkeleton
                                        variant="rounded"
                                        width={160}
                                        height={36}
                                        sx={{
                                            mt: 0.5,
                                            bgcolor: alpha(theme.palette.secondary.main, 0.2),
                                            opacity: 0.6
                                        }}
                                    />
                                </Stack>
                            </Card>
                        </Box>
                    </Fade>
                </Grid>
            ))}
        </Grid>
    );
}