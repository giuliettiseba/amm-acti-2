import { useNotification } from '../context/NotificationContext';
import {
  Snackbar,
  Alert,
  AlertTitle,
  Stack
} from '@mui/material';

export default function Notifications() {
  const { notifications, removeNotification } = useNotification();

  return (
    <Stack spacing={1} sx={{ position: 'fixed', top: 80, right: 16, zIndex: 9999 }}>
      {notifications.map((notification: any) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification.duration || 5000}
          onClose={() => removeNotification(notification.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            severity={notification.type}
            onClose={() => removeNotification(notification.id)}
            variant="filled"
            sx={{ minWidth: 300 }}
          >
            {notification.title && <AlertTitle>{notification.title}</AlertTitle>}
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </Stack>
  );
}
