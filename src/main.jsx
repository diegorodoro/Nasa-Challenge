import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import "@radix-ui/themes/styles.css";  // Importar los estilos de Radix Themes
import Details from './detailViewAlex/DetailPlanets';  // Tu componente principal
import "../src/index.css";  // Importar tus estilos

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
      <Details />
    </Theme>
  </StrictMode>
);