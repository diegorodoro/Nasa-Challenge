import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import "@radix-ui/themes/styles.css";  // Importar los estilos de Radix Themes
import MyApp2 from './myApp2';  // Tu componente principal

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme appearance="dark">
      <MyApp2 />
    </Theme>
  </StrictMode>
);