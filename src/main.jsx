import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import "@radix-ui/themes/styles.css";  // Importar los estilos de Radix Themes
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme appearance="dark">
      <App />
    </Theme>
  </StrictMode>
);