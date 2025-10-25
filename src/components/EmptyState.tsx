import type {ReactNode} from 'react';
import {Box, Card, CardContent, Typography} from '@mui/material';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode; // botón o enlace
  className?: string;
}

export function EmptyState({ title = 'Sin datos', description, icon, action, className = '' }: EmptyStateProps) {
  return (
    <Card className={className} sx={{ textAlign: 'center' }}>
      <CardContent sx={{ py: 4, px: 3 }}>
        {icon && (
          <Box sx={{ fontSize: '2rem', opacity: 0.65, mb: 1 }}>
            {icon}
          </Box>
        )}
        <Typography variant="h6" component="h3" sx={{ mb: 1, fontSize: '1.05rem' }}>
          {title}
        </Typography>
        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2.5, fontSize: '0.8rem', lineHeight: 1.35 }}
          >
            {description}
          </Typography>
        )}
        {action}
      </CardContent>
    </Card>
  );
}
