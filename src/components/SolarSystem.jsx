import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import PlanetInfo from './PlanetInfo';

import sunTexture from '../assets/textures/sun.png';
import mercuryTexture from '../assets/textures/mercury.webp';
import venusTexture from '../assets/textures/venus.webp';
import earthTexture from '../assets/textures/earth.jpg';
import marsTexture from '../assets/textures/mars.webp';
import jupiterTexture from '../assets/textures/jupiter.jpg';
import saturnTexture from '../assets/textures/saturn.jpg';
import saturnRingTexture from '../assets/textures/saturn-ring.png';
import uranusTexture from '../assets/textures/uranus.webp';
import neptuneTexture from '../assets/textures/neptune.jpg';

const SolarSystem = () => {
  const mountRef = useRef(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    camera.position.set(0, 50, 200);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 3);
    pointLight.position.set(0, 0, 0);
    pointLight.castShadow = true;
    scene.add(pointLight);

    const textureLoader = new THREE.TextureLoader();
    const saturnRingTexture = textureLoader.load('/textures/saturn_ring.png');

    // Datos de los cuerpos celestes con información completa para las fichas
    const celestialBodies = [
      { name: 'Sun', size: 10, distance: 0, texture: sunTexture, inclination: 0, ascendingNode: 0, orbitalSpeed: 0, rotationPeriod: 609, diameter: 1392000, distanceFromSun: 0, orbitalPeriod: 'N/A', moons: 0, description: 'The Sun is the star at the center of the Solar System.' },
      { name: 'Mercury', size: 0.5, distance: 15, texture: mercuryTexture, inclination: 7.00497902, ascendingNode: 48.3, orbitalSpeed: 0.02, rotationPeriod: 1407.6, diameter: 4879, distanceFromSun: 57910000, orbitalPeriod: 88, moons: 0, description: 'Mercury is the smallest planet in the Solar System.' },
      { name: 'Venus', size: 0.85, distance: 25, texture: venusTexture, inclination: 3.39467605, ascendingNode: 76.7, orbitalSpeed: 0.015, rotationPeriod: 5832, diameter: 12104, distanceFromSun: 108200000, orbitalPeriod: 225, moons: 0, description: 'Venus is the second planet from the Sun.' },
      { name: 'Earth', size: 1.0, distance: 35, texture: earthTexture, inclination: 0, ascendingNode: 0, orbitalSpeed: 0.01, rotationPeriod: 24, diameter: 12742, distanceFromSun: 149600000, orbitalPeriod: 365.25, moons: 1, description: 'Earth is the third planet from the Sun.' },
      { name: 'Mars', size: 0.65, distance: 45, texture: marsTexture, inclination: 1.84969142, ascendingNode: 49.6, orbitalSpeed: 0.008, rotationPeriod: 24.6, diameter: 6779, distanceFromSun: 227900000, orbitalPeriod: 687, moons: 2, description: 'Mars is the fourth planet from the Sun.' },
      { name: 'Jupiter', size: 2.0, distance: 65, texture: jupiterTexture, inclination: 1.30439695, ascendingNode: 100.5, orbitalSpeed: 0.005, rotationPeriod: 9.9, diameter: 139820, distanceFromSun: 778500000, orbitalPeriod: 4333, moons: 79, description: 'Jupiter is the largest planet in the Solar System.' },
      { name: 'Saturn', size: 1.7, distance: 85, texture: saturnTexture, inclination: 2.48599187, ascendingNode: 113.7, orbitalSpeed: 0.003, rotationPeriod: 10.7, diameter: 116460, distanceFromSun: 1434000000, orbitalPeriod: 10759, moons: 62, description: 'Saturn is famous for its ring system.' },
      { name: 'Uranus', size: 1.5, distance: 105, texture: uranusTexture, inclination: 0.77263783, ascendingNode: 74, orbitalSpeed: 0.002, rotationPeriod: 17.2, diameter: 50724, distanceFromSun: 2871000000, orbitalPeriod: 30688, moons: 27, description: 'Uranus is the seventh planet from the Sun.' },
      { name: 'Neptune', size: 1.3, distance: 125, texture: neptuneTexture, inclination: 1.77004347, ascendingNode: 131.8, orbitalSpeed: 0.0015, rotationPeriod: 16.1, diameter: 49244, distanceFromSun: 4495000000, orbitalPeriod: 60182, moons: 14, description: 'Neptune is the eighth planet from the Sun.' },
      { name: '617 Patroclus', size: 0.3, distance: 140, texture: null, color: 0xff0000, inclination: 22.0, ascendingNode: 120.0, orbitalSpeed: 0.0007, rotationPeriod: 0, diameter: 140, distanceFromSun: 780000000, orbitalPeriod: 4300, moons: 0, description: '617 Patroclus is a binary Jupiter trojan asteroid.' }
    ];

    const createdObjects = [];
    celestialBodies.forEach((data) => {
      let material;
      if (data.texture) {
        const texture = textureLoader.load(data.texture);
        material = new THREE.MeshStandardMaterial({ map: texture });
      } else {
        material = new THREE.MeshStandardMaterial({ color: data.color }); // Asignar color rojo para el asteroide
      }

      const geometry = new THREE.SphereGeometry(data.size, 32, 32);
      const celestialBody = new THREE.Mesh(geometry, material);

      celestialBody.position.set(data.distance, 0, 0);
      celestialBody.castShadow = true;
      celestialBody.receiveShadow = true;

      const orbitGroup = new THREE.Group();
      orbitGroup.rotation.z = THREE.MathUtils.degToRad(data.inclination);
      orbitGroup.rotation.y = THREE.MathUtils.degToRad(data.ascendingNode);
      orbitGroup.add(celestialBody);

      celestialBody.userData = { ...data, orbitGroup };
      createdObjects.push(celestialBody);

      if (data.name !== 'Sun') {
        const orbitGeometry = new THREE.RingGeometry(data.distance - 0.2, data.distance + 0.2, 64);
        const orbitMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, side: THREE.DoubleSide, opacity: 0.6, transparent: true });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2;
        orbitGroup.add(orbit);
      }

      if (data.name === 'Saturn') {
        const ringGeometry = new THREE.RingGeometry(data.size + 1, data.size + 3, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({ map: saturnRingTexture, side: THREE.DoubleSide, transparent: true });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        celestialBody.add(ring);
      }

      scene.add(orbitGroup);
    });

    setObjects(createdObjects);

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = THREE.MathUtils.randFloatSpread(1000);
      const y = THREE.MathUtils.randFloatSpread(1000);
      const z = THREE.MathUtils.randFloatSpread(1000);
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(createdObjects);

      if (intersects.length > 0) {
        const celestialBody = intersects[0].object.userData;
        setSelectedObject(celestialBody);
      }
    };

    window.addEventListener('click', onMouseClick);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      createdObjects.forEach((object) => {
        const { distance, orbitalSpeed, rotationPeriod } = object.userData;
        object.position.x = distance * Math.cos(orbitalSpeed * Date.now() * 0.0001);
        object.position.z = distance * Math.sin(orbitalSpeed * Date.now() * 0.0001);
        object.rotation.y += rotationPeriod ? (1 / rotationPeriod) * 0.1 : 0.001;
      });

      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    return () => {
      window.removeEventListener('resize', () => {});
      window.removeEventListener('click', onMouseClick);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div ref={mountRef} style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, zIndex: 1 }} />
      {selectedObject && (
        <PlanetInfo planet={selectedObject} onClose={() => setSelectedObject(null)} />
      )}
    </>
  );
};

export default SolarSystem;
