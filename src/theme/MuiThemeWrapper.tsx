import {createTheme, CssBaseline, ThemeProvider as MuiThemeProvider} from '@mui/material';
import {useTheme} from './ThemeProvider';
import React from 'react';

interface MuiThemeWrapperProps {
  children: React.ReactNode;
}

export function MuiThemeWrapper({ children }: MuiThemeWrapperProps) {
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

