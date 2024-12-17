import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider as CustomThemeProvider } from './ThemeContext';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import './index.css';
import './i18n.js';

const theme = createTheme(); // Create the MUI theme directly here

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MUIThemeProvider theme={theme}>
      <CustomThemeProvider>
        <App />
      </CustomThemeProvider>
    </MUIThemeProvider>
  </StrictMode>
);
