import {alpha, Alert, Snackbar, Stack} from '@mui/material';
import type {NotificationItem} from "../types";
import {useNotification} from "../context/NotificationContext.tsx";


/**
 * Notifications
 *
 * Un componente que muestra una lista de notificaciones flotantes utilizando Material-UI.
 * Las notificaciones se muestran como alertas con diferentes niveles de severidad (error, advertencia, información, éxito).
 * Cada notificación tiene un tiempo de vida configurable y se elimina automáticamente o al cerrarla manualmente.
 *
 * @component
 * @returns {JSX.Element} Un contenedor de notificaciones flotantes.
 *
 * @example
 * <Notifications />
 */

/**
 * Contexto de notificaciones:
 * - `notifications`: Un array de objetos de notificación que contiene información como id, tipo, mensaje y tiempo de vida.
 * - `removeNotification`: Función para eliminar una notificación específica por su id.
 */

export default function Notifications() {
    const {notifications, removeNotification} = useNotification();

    return (
        <Stack spacing={1} sx={{position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 9999}}>
            {notifications.map((notification: NotificationItem) => (
                <Snackbar
                    key={notification.id}
                    open={true}
                    autoHideDuration={notification.timeout || 5000}
                    onClose={() => removeNotification(notification.id)}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                >
                    <Alert
                        severity={notification.type}
                        onClose={() => removeNotification(notification.id)}
                        variant="filled"
                        sx={(theme) => ({
                            minWidth: 300,
                            width: 'clamp(300px, 50vw, 500px)', // Ajustar dinamicamente el ancho basado en el tamano de pantalla
                            borderRadius: '12px',
                            // Efecto de vidrio base
                            color: theme.palette.text.primary,
                            background: alpha(theme.palette.background.default, .8),
                            WebkitBackdropFilter: 'blur(16px)',
                            backdropFilter: 'blur(16px)',
                            // Borde neon con color de severidad
                            border: `1px solid ${alpha(
                                notification.type === 'error' ? theme.palette.error.main :
                                notification.type === 'warning' ? theme.palette.warning.main :
                                notification.type === 'info' ? theme.palette.info.main :
                                theme.palette.success.main,
                                0.4
                            )}`,
                            boxShadow: `
                                0 8px 32px ${alpha(
                                    notification.type === 'error' ? theme.palette.error.main :
                                    notification.type === 'warning' ? theme.palette.warning.main :
                                    notification.type === 'info' ? theme.palette.info.main :
                                    theme.palette.success.main,
                                    0.25
                                )},
                                inset 0 0 20px ${alpha(
                                    notification.type === 'error' ? theme.palette.error.main :
                                    notification.type === 'warning' ? theme.palette.warning.main :
                                    notification.type === 'info' ? theme.palette.info.main :
                                    theme.palette.success.main,
                                    0.08
                                )}
                            `
                        })}
                    >
                        {notification.message}
                    </Alert>
                </Snackbar>
            ))}
        </Stack>
    );
}
