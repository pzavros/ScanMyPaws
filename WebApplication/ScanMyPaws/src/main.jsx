import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider as CustomThemeProvider } from './ThemeContext';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import './index.css';
import './i18n.js';

const theme = createTheme();

createRoot(document.getElementById('root')).render(
    <MUIThemeProvider theme={theme}>
      <CustomThemeProvider>
        <App />
      </CustomThemeProvider>
    </MUIThemeProvider>
);
