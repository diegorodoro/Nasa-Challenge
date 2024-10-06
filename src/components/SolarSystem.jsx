import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import PlanetInfo from './PlanetInfo';

const SolarSystem = () => {
  const mountRef = useRef(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null); // Estado para el planeta seleccionado
  const [planets, setPlanets] = useState([]); // Estado para almacenar los planetas

  useEffect(() => {
    // Crear la escena, cámara y renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // Habilitar sombras para mejorar el renderizado

    // Añadir el renderizador al DOM
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Configurar controles de la cámara
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Ajustar la posición inicial de la cámara para ver el sistema solar completo
    camera.position.set(0, 50, 200);

    // Crear una luz ambiente y una luz puntual
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Aumentar la intensidad de la luz ambiente
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 3);
    pointLight.position.set(0, 0, 0); // Posición en el Sol
    pointLight.castShadow = true; // Permitir sombras
    scene.add(pointLight);

    // Añadir más luces direccionales para mejorar la iluminación
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.set(50, 50, 50);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight2.position.set(-50, -50, -50);
    scene.add(directionalLight2);

    // Cargar las texturas de los planetas, anillos y estrellas
    const textureLoader = new THREE.TextureLoader();
    const saturnRingTexture = textureLoader.load('/textures/saturn_ring.png'); // Textura del anillo de Saturno

    // Datos de los planetas con más información y texturas
    const planetData = [
      { name: 'Sun', size: 10, distance: 0, texture: 'sun.jpg', description: 'The Sun is the star at the center of the Solar System.', diameter: 1392000, distanceFromSun: 0, rotationPeriod: 609, orbitalPeriod: 'N/A', moons: 0, y: 0, inclination: 0, ascendingNode: 0 },
      { name: 'Mercury', size: 1, distance: 15, texture: 'mercury.jpg', description: 'Mercury is the smallest planet in the Solar System.', diameter: 4879, distanceFromSun: 57910000, rotationPeriod: 1407.6, orbitalPeriod: 88, moons: 0, y: 0, inclination: 7, ascendingNode: 48.3 },
      { name: 'Venus', size: 1.5, distance: 25, texture: 'venus.jpg', description: 'Venus is the second planet from the Sun.', diameter: 12104, distanceFromSun: 108200000, rotationPeriod: 5832, orbitalPeriod: 225, moons: 0, y: 0, inclination: 3.4, ascendingNode: 76.7 },
      { name: 'Earth', size: 2, distance: 35, texture: 'earth.jpg', description: 'Earth is the third planet from the Sun and our home planet.', diameter: 12742, distanceFromSun: 149600000, rotationPeriod: 24, orbitalPeriod: 365.25, moons: 1, y: 0, inclination: 0, ascendingNode: 0 },
      { name: 'Mars', size: 1.2, distance: 45, texture: 'mars.jpg', description: 'Mars is the fourth planet from the Sun, also known as the Red Planet.', diameter: 6779, distanceFromSun: 227900000, rotationPeriod: 24.6, orbitalPeriod: 687, moons: 2, y: 0, inclination: 1.85, ascendingNode: 49.6 },
      { name: 'Jupiter', size: 5, distance: 65, texture: 'jupiter.jpg', description: 'Jupiter is the largest planet in the Solar System.', diameter: 139820, distanceFromSun: 778500000, rotationPeriod: 9.9, orbitalPeriod: 4333, moons: 79, y: 0, inclination: 1.3, ascendingNode: 100.5 },
      { name: 'Saturn', size: 4.5, distance: 85, texture: 'saturn.jpg', description: 'Saturn is the sixth planet from the Sun, known for its ring system.', diameter: 116460, distanceFromSun: 1434000000, rotationPeriod: 10.7, orbitalPeriod: 10759, moons: 62, y: 0, inclination: 2.5, ascendingNode: 113.7 },
      { name: 'Uranus', size: 3, distance: 105, texture: 'uranus.jpg', description: 'Uranus is the seventh planet from the Sun.', diameter: 50724, distanceFromSun: 2871000000, rotationPeriod: 17.2, orbitalPeriod: 30688, moons: 27, y: 0, inclination: 0.8, ascendingNode: 74 },
      { name: 'Neptune', size: 3, distance: 125, texture: 'neptune.jpg', description: 'Neptune is the eighth planet from the Sun.', diameter: 49244, distanceFromSun: 4495000000, rotationPeriod: 16.1, orbitalPeriod: 60182, moons: 14, y: 0, inclination: 1.8, ascendingNode: 131.8 }
    ];

    // Crear planetas y órbitas con texturas y órbitas más finas
    const createdPlanets = [];
    planetData.forEach((data) => {
      // Crear geometría y material del planeta
      const geometry = new THREE.SphereGeometry(data.size, 32, 32);
      const texture = textureLoader.load(`/textures/${data.texture}`);
      const material = new THREE.MeshStandardMaterial({ map: texture });
      const planet = new THREE.Mesh(geometry, material);

      // Posicionar el planeta basado en su distancia al Sol
      planet.position.set(data.distance, 0, 0);
      planet.castShadow = true; // Permitir sombras en el planeta
      planet.receiveShadow = true; // Permitir que reciba sombras

      // Crear grupo para aplicar rotación e inclinación de órbita
      const orbitGroup = new THREE.Group();
      orbitGroup.rotation.z = THREE.MathUtils.degToRad(data.inclination); // Inclinación de la órbita
      orbitGroup.rotation.y = THREE.MathUtils.degToRad(data.ascendingNode); // Nodo ascendente
      orbitGroup.add(planet);

      // Añadir la propiedad de nombre y descripción a cada planeta
      planet.userData = { name: data.name, description: data.description, texture: data.texture, ...data };
      createdPlanets.push(planet);

      // Crear la órbita del planeta usando geometría de anillo con grosor reducido
      if (data.name !== 'Sun') {
        const orbitGeometry = new THREE.RingGeometry(data.distance - 0.2, data.distance + 0.2, 64);
        const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, opacity: 0.3, transparent: true });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2; // Rotar la órbita para que esté plana
        orbitGroup.add(orbit);
      }

      // Añadir el grupo a la escena
      scene.add(orbitGroup);

      // Añadir anillo de Saturno
      if (data.name === 'Saturn') {
        const ringGeometry = new THREE.RingGeometry(data.size + 1, data.size + 3, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({ map: saturnRingTexture, side: THREE.DoubleSide, transparent: true });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2; // Orientar el anillo de Saturno
        planet.add(ring); // Añadir el anillo como hijo del planeta Saturno
      }
    });

    setPlanets(createdPlanets); // Guardar los planetas creados en el estado

    // Crear el fondo de estrellas utilizando puntos
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });

    // Crear posiciones aleatorias para las estrellas
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = THREE.MathUtils.randFloatSpread(1000); // Distribuir las estrellas en una caja 3D de 1000x1000x1000
      const y = THREE.MathUtils.randFloatSpread(1000);
      const z = THREE.MathUtils.randFloatSpread(1000);
      starVertices.push(x, y, z);
    }

    // Agregar los vértices a la geometría de estrellas
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

    // Crear el sistema de partículas para las estrellas
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Raycaster para detectar clics en los planetas
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event) => {
      // Convertir las coordenadas del mouse a valores normalizados
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Utilizar el raycaster para detectar intersecciones
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(createdPlanets);

      if (intersects.length > 0) {
        // Si se ha hecho clic en un planeta, mostrar la ficha informativa
        const planet = intersects[0].object.userData;
        setSelectedPlanet(planet);
      }
    };

    window.addEventListener('click', onMouseClick);

    // Función de animación con rotación de los planetas y el sol
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      // Hacer que cada planeta gire sobre su eje
      createdPlanets.forEach((planet) => {
        planet.rotation.y += 0.001; // Ajustar la velocidad de rotación
      });

      renderer.render(scene, camera);
    };

    animate();

    // Ajustar tamaño del renderizador al cambiar tamaño de ventana
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Limpiar recursos al desmontar componente
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', onMouseClick);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div ref={mountRef} style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, zIndex: 1 }} />
      {selectedPlanet && (
        <PlanetInfo
          planet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)} // Ocultar la ficha al hacer clic en el botón de cerrar
        />
      )}
    </>
  );
};

export default SolarSystem;
