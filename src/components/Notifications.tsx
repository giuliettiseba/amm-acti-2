
import {
  Snackbar,
  Alert,
  Stack
} from '@mui/material';
import {useNotification} from "../hooks/useNotification.ts";
import type {NotificationItem} from "../context/NotificationContext.tsx";

export default function Notifications() {
  const { notifications, removeNotification } = useNotification();

  return (
    <Stack spacing={1} sx={{ position: 'fixed', top: 80, right: 16, zIndex: 9999 }}>
      {notifications.map((notification: NotificationItem) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification.timeout || 5000}
          onClose={() => removeNotification(notification.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            severity={notification.type}
            onClose={() => removeNotification(notification.id)}
            variant="filled"
            sx={{ minWidth: 300 }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </Stack>
  );
}
