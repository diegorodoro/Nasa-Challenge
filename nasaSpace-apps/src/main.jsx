import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import "@radix-ui/themes/styles.css";  // Importar los estilos de Radix Themes
import MyApp from './myApp';  // Tu componente principal

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme appearance="dark">
      <MyApp />
    </Theme>
  </StrictMode>
);