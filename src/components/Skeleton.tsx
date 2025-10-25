import {Box, Card, Fade, Grid, Skeleton as MuiSkeleton, Stack} from '@mui/material';
import type {CardSkeletonProps} from "../types/props/CardSkeletonProps.tsx";

export function CardSkeleton({width = '100%', imageHeight = 160, showCategory = true, visible = true}: CardSkeletonProps) {
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
                                overflow: 'hidden',
                                padding: 3,
                                gap: 0.5,
                                display: 'flex',
                                flexDirection: 'column',
                                opacity: 0.2
                            }}>
                                <Box sx={{position: 'relative', mb: 0.5}}>
                                    {/* image skeleton - matches GenericCardImage height */}
                                    <MuiSkeleton variant="rectangular" width="100%" height={imageHeight} sx={{borderRadius: 1}}/>

                                    {/* floating category chip skeleton */}
                                    {showCategory && (
                                        <Box sx={{position: 'absolute', top: 12, left: 12}}>
                                            <MuiSkeleton variant="rounded" width={80} height={24} sx={{borderRadius: 9999}}/>
                                        </Box>
                                    )}
                                </Box>

                                <Stack spacing={0.5}>
                                    {/* title - h6 typography */}
                                    <MuiSkeleton variant="text" width="70%" height={32}/>

                                    {/* subtitle - subtitle2 */}
                                    <MuiSkeleton variant="text" width="45%" height={22}/>

                                    {/* description - body2 */}
                                    <MuiSkeleton variant="text" width="100%" height={20}/>
                                    <MuiSkeleton variant="text" width="90%" height={20}/>

                                    {/* price - subtitle1 */}
                                    <MuiSkeleton variant="text" width={80} height={28} sx={{mt: 0.5}}/>

                                    {/* button */}
                                    <MuiSkeleton variant="rounded" width={160} height={36} sx={{mt: 0.5}}/>
                                </Stack>
                            </Card>
                        </Box>
                    </Fade>
                </Grid>
            ))}
        </Grid>
    );
}