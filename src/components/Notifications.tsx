import {Alert, Snackbar, Stack} from '@mui/material';
import {useNotification} from "../hooks";
import type {NotificationItem} from "../types";

export default function Notifications() {
  const { notifications, removeNotification } = useNotification();

  return (
    <Stack spacing={1} sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}>
      {notifications.map((notification: NotificationItem) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification.timeout || 5000}
          onClose={() => removeNotification(notification.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
