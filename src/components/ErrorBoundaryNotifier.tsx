import {useNotification} from "../context/NotificationContext.tsx";

interface ErrorBoundaryNotifierProps {
    error?: Error;
}

export default function ErrorBoundaryNotifier({error}: ErrorBoundaryNotifierProps) {
    const {addNotification} = useNotification();

    if (error) {
        addNotification({type: 'error', message: `Error inesperado: ${error.message}`});
    }

    return null;
}
