import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import "@radix-ui/themes/styles.css";  // Importar los estilos de Radix Themes
import MyApp from './detailViewAlex/myApp';  // Tu componente principal
import "../src/index.css";  // Importar tus estilos

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
      <MyApp />
    </Theme>
  </StrictMode>
);