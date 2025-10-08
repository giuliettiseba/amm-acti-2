import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import Notifications from './components/Notifications'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ThemeProvider } from './theme/ThemeProvider'
import { useTheme } from './theme/ThemeProvider'
import './styles/design-system.css'

function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme, mode } = useTheme();

  const muiTheme = createTheme({
    palette: {
      mode,
      primary: {
        main: theme.palette.primary,
      },
      secondary: {
        main: theme.palette.secondary,
      },
      background: {
        default: theme.palette.bg,
        paper: theme.palette.surface,
      },
      text: {
        primary: theme.palette.text,
        secondary: theme.palette.textDim,
      },
    },
    shape: {
      borderRadius: parseInt(theme.radius.md),
    },
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <MuiThemeWrapper>
        <BrowserRouter>
          <NotificationProvider>
            <AuthProvider>
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
              <Notifications />
            </AuthProvider>
          </NotificationProvider>
        </BrowserRouter>
      </MuiThemeWrapper>
    </ThemeProvider>
  </StrictMode>,
)
