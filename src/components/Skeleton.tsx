import {Box, Card, CardContent, Grid, Skeleton as MuiSkeleton, Stack} from '@mui/material';
import type {CardSkeletonProps} from "../types/props/CardSkeletonProps.tsx";

export function CardSkeleton({width = '100%', imageHeight = 160, showCategory = true}: CardSkeletonProps) {
    return (
        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
            {Array.from({length: 12}).map((_, index) => (
                <Grid key={index} size={{xs: 2, sm: 4, md: 4}}>

                    <Card sx={{width, borderRadius: 2, overflow: 'hidden'}}>
                        <Box sx={{position: 'relative'}}>
                            {/* image skeleton */}
                            <MuiSkeleton variant="rectangular" width="100%" height={imageHeight}/>

                            {/* floating category chip skeleton */}
                            {showCategory && (
                                <Box sx={{position: 'absolute', top: 12, left: 12}}>
                                    <MuiSkeleton variant="rounded" width={80} height={28}/>
                                </Box>
                            )}
                        </Box>

                        <CardContent>
                            <Stack spacing={1}>
                                {/* title */}
                                <MuiSkeleton variant="text" width="60%" height={28}/>

                                {/* subtitle */}
                                <MuiSkeleton variant="text" width="40%"/>

                                {/* description block */}
                                <MuiSkeleton variant="rectangular" width="100%" height={72}/>

                                {/* price + button row */}
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mt: 1
                                }}>
                                    <MuiSkeleton variant="text" width={80}/>
                                    <MuiSkeleton variant="rounded" width={120} height={36}/>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}