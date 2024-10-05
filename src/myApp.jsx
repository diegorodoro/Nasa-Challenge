import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import SolarSystem from './components/SolarSystem';
import './styles/stars.css'; // Importar el archivo de estilos

// Definición de estilos antes del componente para evitar errores de referencia
const triggerButtonStyle = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  padding: '10px 20px',
  background: '#333',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  zIndex: 2,
};

const overlayStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  position: 'fixed',
  inset: 0,
  zIndex: 2,
};

const contentStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  width: '300px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 3,
};

const titleStyle = {
  fontSize: '20px',
  margin: 0,
};

const descriptionStyle = {
  marginTop: '10px',
  marginBottom: '20px',
  lineHeight: '1.5',
};

const closeButtonStyle = {
  padding: '10px 20px',
  background: '#ff5f5f',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  zIndex: 3,
};

function App() {
  return (
    <div className="App" style={{ width: '100vw', height: '100vh' }}>
      {/* Componente del Sistema Solar con Three.js */}
      <SolarSystem />

      {/* Componente de Diálogo de Radix UI */}
      <Dialog.Root>
        <Dialog.Trigger asChild>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay style={overlayStyle} />
          <Dialog.Content style={contentStyle}>
            <Dialog.Title style={titleStyle}>Sistema Solar</Dialog.Title>
            <Dialog.Description style={descriptionStyle}>
              Explora los diferentes planetas y estrellas de nuestro sistema solar.
            </Dialog.Description>
            <Dialog.Close asChild>
              <button style={closeButtonStyle}>Cerrar</button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
