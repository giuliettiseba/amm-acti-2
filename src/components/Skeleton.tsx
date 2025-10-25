import {Box, Card, CardActions, CardContent, Skeleton as MuiSkeleton} from '@mui/material';
import './skeleton.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'rectangular' | 'rounded' | 'circular';
  className?: string;
}

export function Skeleton({ width, height, variant = 'rectangular', className }: SkeletonProps) {
  return (
    <MuiSkeleton
      variant={variant}
      width={width}
      height={height}
      className={className}
    />
  );
}

interface SkeletonTextProps { lines?: number; spacing?: number; }
export function SkeletonText({ lines = 3, spacing = 1 }: SkeletonTextProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacing }}>
      {Array.from({ length: lines }).map((_, i) => (
        <MuiSkeleton
          key={i}
          variant="text"
          width={`${90 - i * 7}%`}
          height={20}
        />
      ))}
    </Box>
  );
}

interface BookSkeletonGridProps { count?: number }
export function BookSkeletonGrid({ count = 8 }: BookSkeletonGridProps) {
  return (
    <Box sx={{
      display: 'grid',
      gap: 2,
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))'
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} sx={{ height: 200 }}>
          <CardContent>
            <MuiSkeleton variant="text" width="70%" height={24} />
            <MuiSkeleton variant="text" width="40%" height={16} sx={{ mb: 1 }} />
            <SkeletonText lines={2} />
          </CardContent>
          <CardActions sx={{ justifyContent: 'space-between' }}>
            <MuiSkeleton variant="text" width={60} height={20} />
            <MuiSkeleton variant="rectangular" width={48} height={32} />
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
