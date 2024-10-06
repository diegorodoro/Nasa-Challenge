import React from 'react';
import SolarSystem from './components/SolarSystem';
import './styles/stars.css'; // Importar el archivo de estilos

function App() {
  return (
    <div className="App" style={{ width: '100vw', height: '100vh' }}>
      {/* Componente del Sistema Solar con Three.js */}
      <SolarSystem />
    </div>
  );
}

export default App;
