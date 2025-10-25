import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './providers/AuthProvider'

import Notifications from './components/Notifications'
import {ErrorBoundary} from './components/ErrorBoundary'
import {ThemeProvider} from './theme/ThemeProvider'
import {MuiThemeWrapper} from './theme/MuiThemeWrapper';
import {OrderProvider} from './providers/OrderProvider'
import {NotificationProvider} from "./providers/NotificationProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
      <MuiThemeWrapper>
        <BrowserRouter>
          <NotificationProvider>
            <AuthProvider>
              <OrderProvider>
                <ErrorBoundary>
                  <App />
                </ErrorBoundary>
                <Notifications />
              </OrderProvider>
            </AuthProvider>
          </NotificationProvider>
        </BrowserRouter>
      </MuiThemeWrapper>
    </ThemeProvider>
)
