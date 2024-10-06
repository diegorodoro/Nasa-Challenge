import React from 'react';
import PlanetCanvas from './PlanetCanvas';

// Componente que muestra la ficha con la información del planeta seleccionado
const PlanetInfo = ({ planet, onClose }) => {
  return (
    <div style={infoContainerStyle}>
      {/* Contenedor del planeta */}
      <div style={planetContainerStyle}>
        {/* Componente que muestra el planeta con el tamaño ajustable */}
        <PlanetCanvas planetTexture={planet.texture} size={18} /> {/* Ajusta el tamaño del planeta a 18 */}
      </div>

      {/* Contenedor de la descripción del planeta */}
      <div style={descriptionContainerStyle}>
        <h2 style={titleStyle}>{planet.name}</h2>
        <p>{planet.description}</p>
        <ul style={infoListStyle}>
          <li><strong>Diameter:</strong> {planet.diameter} km</li>
          <li><strong>Distance from Sun:</strong> {planet.distanceFromSun} km</li>
          <li><strong>Rotation Period:</strong> {planet.rotationPeriod} hours</li>
          <li><strong>Orbital Period:</strong> {planet.orbitalPeriod} days</li>
          <li><strong>Moons:</strong> {planet.moons}</li>
        </ul>
        <button style={closeButtonStyle} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

// Estilos para la ficha informativa
const infoContainerStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%', // Cambia el ancho para centrarlo mejor
  height: 'auto',
  maxWidth: '1200px',
  backgroundColor: 'rgba(20, 20, 20, 0.85)', // Un fondo más oscuro para contraste
  color: 'white',
  display: 'flex',
  borderRadius: '20px', // Bordes más redondeados
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8)', // Sombra más suave
  zIndex: 5,
  padding: '30px',
  overflowY: 'auto',
};

const planetContainerStyle = {
  flex: 1.5, // Aumenta el espacio del contenedor del planeta
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '30px',
};

const descriptionContainerStyle = {
  flex: 1.8,
  padding: '30px',
  overflowY: 'auto',
  fontSize: '18px', // Tamaño de fuente mayor para mejor lectura
  lineHeight: '1.6',
};

const titleStyle = {
  marginTop: 0,
  fontSize: '38px', // Título más grande
  color: '#ffd700', // Dorado para destacar el nombre del planeta
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const infoListStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: '20px 0',
  fontSize: '18px',
};

const closeButtonStyle = {
  padding: '15px 30px',
  backgroundColor: '#ff5f5f',
  border: 'none',
  borderRadius: '12px', // Botón con bordes redondeados
  color: 'white',
  cursor: 'pointer',
  marginTop: '30px',
  fontSize: '18px',
  alignSelf: 'flex-start', // Alineación del botón de cerrar
  transition: 'background 0.3s',
};

export default PlanetInfo;
