import React from 'react';
import PlanetCanvas from './PlanetCanvas';

// Componente que muestra la ficha con la información del planeta seleccionado
const PlanetInfo = ({ planet, onClose }) => {
  return (
    <div style={infoContainerStyle}>
      <div style={planetContainerStyle}>
        <PlanetCanvas planetTexture={planet.texture} /> {/* Renderizar el planeta en 3D */}
      </div>
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
  top: '5%',
  left: '5%',
  width: '900px',
  height: '600px',
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  color: 'white',
  display: 'flex',
  borderRadius: '10px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
  zIndex: 5,
};

const planetContainerStyle = {
  flex: 1.2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '30px',
};

const descriptionContainerStyle = {
  flex: 1.8,
  padding: '40px',
  overflowY: 'auto',
};

const titleStyle = {
  marginTop: 0,
  fontSize: '32px',
  color: '#ffd700', // Dorado para destacar el nombre del planeta
};

const infoListStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: '20px 0',
};

const closeButtonStyle = {
  padding: '15px 30px',
  backgroundColor: '#ff5f5f',
  border: 'none',
  borderRadius: '8px',
  color: 'white',
  cursor: 'pointer',
  marginTop: '20px',
  fontSize: '16px',
};

export default PlanetInfo;
