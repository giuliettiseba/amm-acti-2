import {alpha, Alert, Snackbar, Stack} from '@mui/material';
import type {NotificationItem} from "../types";
import {useNotification} from "../context/NotificationContext.tsx";


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
                            borderRadius: '12px',
                            // Glass effect base
                            background: theme.palette.mode === 'dark'
                                ? alpha(theme.palette.background.paper, 0.06)
                                : alpha(theme.palette.background.paper, 0.48),
                            WebkitBackdropFilter: 'blur(16px)',
                            backdropFilter: 'blur(16px)',
                            // Neon border with severity color
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
