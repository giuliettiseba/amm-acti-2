import {useNotification} from "../../context/NotificationContext.tsx";
import type {ErrorBoundaryNotifierProps} from "../../types/props/ErrorBoundaryNotifierProps.tsx";

export default function ErrorBoundaryNotifier({error}: ErrorBoundaryNotifierProps) {
    const {addNotification} = useNotification();

    if (error) {
        addNotification({type: 'error', message: `Error inesperado: ${error.message}`});
    }

    return null;
}
