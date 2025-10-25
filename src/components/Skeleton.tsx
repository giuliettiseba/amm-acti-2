import {Skeleton as MuiSkeleton} from '@mui/material';
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