import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './providers/AuthProvider'

import Notifications from './components/Notifications'
import {ErrorBoundary} from './components/errorBoundary/ErrorBoundary.tsx'
import {ThemeProvider} from './providers/ThemeProvider.tsx'
import {OrderProvider} from './providers/OrderProvider'
import {NotificationProvider} from "./providers/NotificationProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <BrowserRouter>
            <NotificationProvider>
                <AuthProvider>
                    <OrderProvider>
                        <ErrorBoundary>
                            <App/>
                        </ErrorBoundary>
                        <Notifications/>
                    </OrderProvider>
                </AuthProvider>
            </NotificationProvider>
        </BrowserRouter>
    </ThemeProvider>
)
