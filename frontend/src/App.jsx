import { useEffect, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSettings } from '@/providers/SettingsProvider';
import { AppRouting } from '@/routing';
import { PathnameProvider } from '@/providers';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { BASE_URL } = import.meta.env;

const App = () => {
  const { settings } = useSettings();

  // MUI theme mengikuti settings.themeMode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: settings.themeMode === 'dark' ? 'dark' : 'light',
          background: {
            default: settings.themeMode === 'dark' ? '#181818' : '#fff',
            paper: settings.themeMode === 'dark' ? '#181818' : '#fff',
          },
        },
      }),
    [settings.themeMode]
  );

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add(settings.themeMode);
  }, [settings]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename={BASE_URL} future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true
      }}>
        <PathnameProvider>
          <AppRouting />
        </PathnameProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export { App };