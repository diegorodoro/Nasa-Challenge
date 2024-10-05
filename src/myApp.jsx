<<<<<<< HEAD
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
=======
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import sunTexture from './assets/textures/sun.png';
import mercuryTexture from './assets/textures/mercury.webp';

const MyApp = () => {
    const mountRef = useRef(null);
    const mercuryOrbitRadius = 3; // Distance from the Sun
    const mercuryOrbitSpeed = 0.01; // Speed of Mercury's orbit

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        const controls = new OrbitControls(camera, renderer.domElement);

        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const textureLoader = new THREE.TextureLoader();
        const sunTextureLoaded = textureLoader.load(sunTexture);

        // Create Sun
        const sunGeometry = new THREE.SphereGeometry(2, 124, 124);
        const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTextureLoaded });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sun);

        // Create Mercury
        const mercuryGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const mercuryTextureLoaded = textureLoader.load(mercuryTexture);
        const mercuryMaterial = new THREE.MeshBasicMaterial({ map: mercuryTextureLoaded });
        const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
        scene.add(mercury);

        camera.position.z = 6;

        const animate = (time) => {
            requestAnimationFrame(animate);

            // Rotate the Sun
            sun.rotation.x += 0.002;
            sun.rotation.y += 0.002;

            // Calculate Mercury's orbit position
            const mercuryAngle = (time * mercuryOrbitSpeed) / 1000; // Convert to radians
            mercury.position.x = mercuryOrbitRadius * Math.cos(mercuryAngle); // X position
            mercury.position.z = mercuryOrbitRadius * Math.sin(mercuryAngle); // Z position

            // Render the scene
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <>
            <div ref={mountRef} />
        </>
    );
};

export default MyApp;
>>>>>>> 6e30d1c208349d43d67e8f686c9963df4fddd84e
