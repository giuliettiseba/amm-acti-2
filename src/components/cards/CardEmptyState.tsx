import {Box, Card, CardContent, Typography} from '@mui/material';
import type {EmptyStateProps} from "../../types/props/EmptyStateProps.tsx";

/**
 * CardEmptyState
 *
 * Un componente que muestra un estado vacío con un título, descripción opcional, ícono y acción.
 * Es útil para mostrar mensajes cuando no hay datos disponibles o se requiere una acción del usuario.
 *
 * @component
 * @param {EmptyStateProps} props - Las propiedades del componente.
 * @param {string} [props.title='Sin datos'] - El título que se muestra en el estado vacío.
 * @param {string} [props.description] - Una descripción opcional que proporciona más contexto.
 * @param {React.ReactNode} [props.icon] - Un ícono opcional que se muestra en la parte superior.
 * @param {React.ReactNode} [props.action] - Una acción opcional, como un botón, que el usuario puede realizar.
 * @param {string} [props.className=''] - Clases CSS adicionales para personalizar el estilo del componente.
 *
 * @returns {JSX.Element} Un componente de estado vacío estilizado.
 *
 * @example
 * <CardEmptyState
 *   title="No hay resultados"
 *   description="Intenta ajustar los filtros de búsqueda."
 *   icon={<SearchIcon />}
 *   action={<Button onClick={handleRetry}>Reintentar</Button>}
 * />
 */

export default function CardEmptyState({title = 'Sin datos', description, icon, action, className = ''}: EmptyStateProps) {
    return (
        <Card className={className} sx={{textAlign: 'center'}}>
            <CardContent sx={{py: 4, px: 3}}>
                {icon && (
                    <Box sx={{fontSize: '2rem', opacity: 0.65, mb: 1}}>
                        {icon}
                    </Box>
                )}
                <Typography variant="h6" component="h3" sx={{mb: 1, fontSize: '1.05rem'}}>
                    {title}
                </Typography>
                {description && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{mb: 2.5, fontSize: '0.8rem', lineHeight: 1.35}}
                    >
                        {description}
                    </Typography>
                )}
                {action}
            </CardContent>
        </Card>
    );
}
