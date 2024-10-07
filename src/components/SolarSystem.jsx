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
  const [labels, setLabels] = useState([]);


  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Control de la cámara
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.25;
    // controls.enablePan = true; // Permitir arrastrar la cámara libremente
    // controls.screenSpacePanning = true;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; 
    controls.dampingFactor = 0.15; 
    controls.rotateSpeed = 0.7; 
    controls.zoomSpeed = 1.5; 
    controls.panSpeed = 0.9; 
    controls.screenSpacePanning = true; 

    controls.minDistance = 5; // Mínimo acercamiento
    controls.maxDistance = 14000; // Máximo alejamiento
    camera.position.set(0, 1000, 2000);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 3);
    pointLight.position.set(0, 0, 0);
    pointLight.castShadow = true;
    scene.add(pointLight);

    const textureLoader = new THREE.TextureLoader();


    // Crear el fondo de estrellas
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
    const starVertices = [];
    const starCount = 4000;  
    for (let i = 0; i < starCount; i++) {
      const x = THREE.MathUtils.randFloatSpread(10000); 
      const y = THREE.MathUtils.randFloatSpread(10000);
      const z = THREE.MathUtils.randFloatSpread(10000);
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    const orbitColors = {
      Mercury: '#9AD9B9',
      Venus: '#e6a66f',
      Earth: '#6b93d6',
      Mars: '#E75353',
      Jupiter: '#e3a551',
      Saturn: '#FFA500',
      Uranus: '#7FCFCF',
      Neptune: '#5364E7',
      '617 Patroclus': '#FF5733',
      Ceres: '#FFD700',
      Pallas: '#7FFF00',
      '1 Ceres': '#FFD700',
      '2 Pallas': '#7FFF00',
      '3 Juno': '#8B4513',
      '4 Vesta': '#FFA500',
      '10 Hygiea': '#D3D3D3',
      '243 Ida': '#808080',
      '433 Eros': '#DAA520',
      '951 Gaspra': '#B22222',
      '101955 Bennu': '#778899',
      '25143 Itokawa': '#A0522D',
      '1P/Halley': '#ADD8E6',
      '67P/Churyumov–Gerasimenko': '#808080',
      '19P/Borrelly': '#A9A9A9',
      '81P/Wild': '#A52A2A',
      '2P/Encke': '#5F9EA0'
    };
    


    // Datos de los cuerpos celestes con información completa para las fichas
    // Escalas
    const sizeScale = 10 / 1392000;  // Escala de tamaño para que el Sol tenga un tamaño de 10 unidades
    const distanceScale = 1 / 1000000;  // Escala de distancia para que 1 unidad represente 1 millón de kilómetros

    // Cuerpos celestes con tamaños y distancias reales, luego escalados
    const celestialBodies = [
      {
        name: 'Sun',
        size: 1392000 * sizeScale,  // Tamaño real del Sol escalado
        distance: 0,  // El Sol está en el centro
        texture: sunTexture,
        inclination: 0,
        eccentricity: 0,
        ascendingNode: 0,
        orbitalSpeed: 0,
        rotationPeriod: 609,
        diameter: 1392000,
        distanceFromSun: 0,
        orbitalPeriod: 'N/A',
        moons: 0,
        description: 'The Sun is the star at the center of the Solar System.'
      },
      {
        name: 'Mercury',
        size: 4879 * sizeScale * 10,  // Tamaño real de Mercurio escalado
        distance: 57910000 * distanceScale,  // Distancia real de Mercurio al Sol escalada
        texture: mercuryTexture,
        SMA: 0.38709927,
        inclination: 7.00497902,
        eccentricity: 0.20563593,
        ascendingNode: 48.3,
        orbitalSpeed: 0.02,
        rotationPeriod: 1407.6,
        diameter: 4879,
        distanceFromSun: 57910000,
        orbitalPeriod: 88,
        moons: 0,
        description: 'Mercury is the smallest planet in the Solar System.'
      },
      {
        name: 'Venus',
        size: 12104 * sizeScale * 10,
        distance: 108200000 * distanceScale,
        texture: venusTexture,
        SMA: 0.72333566,
        inclination: 3.39467605,
        eccentricity: 0.00677672,
        ascendingNode: 76.7,
        orbitalSpeed: 0.015,
        rotationPeriod: 5832,
        diameter: 12104,
        distanceFromSun: 108200000,
        orbitalPeriod: 225,
        moons: 0,
        description: 'Venus is the second planet from the Sun.'
      },
      {
        name: 'Earth',
        size: 12742 * sizeScale * 10,
        distance: 149600000 * distanceScale,
        texture: earthTexture,
        SMA: 1.00000261,
        inclination: 0,
        eccentricity: 0.01671123,
        ascendingNode: 0,
        orbitalSpeed: 0.01,
        rotationPeriod: 24,
        diameter: 12742,
        distanceFromSun: 149600000,
        orbitalPeriod: 365.25,
        moons: 1,
        description: 'Earth is the third planet from the Sun.'
      },
      {
        name: 'Mars',
        size: 6779 * sizeScale * 10,
        distance: 227900000 * distanceScale,
        texture: marsTexture,
        SMA: 1.52371034,
        inclination: 1.84969142,
        eccentricity: 0.09339410,
        ascendingNode: 49.6,
        orbitalSpeed: 0.008,
        rotationPeriod: 24.6,
        diameter: 6779,
        distanceFromSun: 227900000,
        orbitalPeriod: 687,
        moons: 2,
        description: 'Mars is the fourth planet from the Sun.'
      },
      {
        name: 'Jupiter',
        size: 139820 * sizeScale * 10,
        distance: 778500000 * distanceScale,
        texture: jupiterTexture,
        SMA: 5.20288700,
        inclination: 1.30439695,
        eccentricity: 0.04838624,
        ascendingNode: 100.5,
        orbitalSpeed: 0.005,
        rotationPeriod: 9.9,
        diameter: 139820,
        distanceFromSun: 778500000,
        orbitalPeriod: 4333,
        moons: 79,
        description: 'Jupiter is the largest planet in the Solar System.'
      },
      {
        name: 'Saturn',
        size: 116460 * sizeScale * 10,
        distance: 1434000000 * distanceScale,
        texture: saturnTexture,
        SMA: 9.53667594,
        inclination: 2.48599187,
        eccentricity: 0.05386179,
        ascendingNode: 113.7,
        orbitalSpeed: 0.003,
        rotationPeriod: 10.7,
        diameter: 116460,
        distanceFromSun: 1434000000,
        orbitalPeriod: 10759,
        moons: 62,
        description: 'Saturn is famous for its ring system.'
      },
      {
        name: 'Uranus',
        size: 50724 * sizeScale * 10,
        distance: 2871000000 * distanceScale,
        texture: uranusTexture,
        SMA: 19.18916464,
        inclination: 0.77263783,
        eccentricity: 0.04725744,
        ascendingNode: 74,
        orbitalSpeed: 0.002,
        rotationPeriod: 17.2,
        diameter: 50724,
        distanceFromSun: 2871000000,
        orbitalPeriod: 30688,
        moons: 27,
        description: 'Uranus is the seventh planet from the Sun.'
      },
      {
        name: 'Neptune',
        size: 49244 * sizeScale * 10,
        distance: 4495000000 * distanceScale,
        texture: neptuneTexture,
        SMA: 30.06992276,
        inclination: 1.77004347,
        eccentricity: 0.00859048,
        ascendingNode: 131.8,
        orbitalSpeed: 0.0015,
        rotationPeriod: 16.1,
        diameter: 49244,
        distanceFromSun: 4495000000,
        orbitalPeriod: 60182,
        moons: 14,
        description: 'Neptune is the eighth planet from the Sun.'
      },
      {
        name: '617 Patroclus',
        size: 140 * sizeScale * 10,
        distance: 780000000 * distanceScale,
        texture: null,
        SMA: 5.206645,
        color: 0xff0000,
        inclination: 22.0,
        eccentricity: 0.14,
        ascendingNode: 120.0,
        orbitalSpeed: 0.0007,
        rotationPeriod: 0,
        diameter: 140,
        distanceFromSun: 780000000,
        orbitalPeriod: 4300,
        moons: 0,
        description: '617 Patroclus is a binary Jupiter trojan asteroid.'
      },
      {
        name: 'Ceres',
        size: 939.4 * sizeScale * 10,
        distance: 414000000 * distanceScale,
        texture: null,
        SMA: 2.77,
        color: 0xFFD700,
        inclination: 10.59,
        eccentricity: 0.07934,
        ascendingNode: 80.0,
        orbitalSpeed: 0.002,
        rotationPeriod: 9,
        diameter: 939.4,
        distanceFromSun: 414000000,
        orbitalPeriod: 1680,
        moons: 0,
        description: 'Ceres is the largest object in the asteroid belt, considered both an asteroid and a dwarf planet.'
      },
      {
        name: 'Pallas',
        size: 512 * sizeScale * 10,
        distance: 414000000 * distanceScale,
        texture: null,
        SMA: 2.77,
        color: 0x7FFF00,
        inclination: 34.8,
        eccentricity: 0.22995,
        ascendingNode: 173.1,
        orbitalSpeed: 0.002,
        rotationPeriod: 7,
        diameter: 512,
        distanceFromSun: 414000000,
        orbitalPeriod: 1684,
        moons: 0,
        description: 'Pallas is the third largest object in the asteroid belt.'
      },
      {
        name: '1 Ceres',
        size: 939.4 * sizeScale * 10,
        distance: 414000000 * distanceScale,
        SMA: 2.77,
        color: 0xFFD700,
        inclination: 10.59,
        eccentricity: 0.07934,
        ascendingNode: 80.0,
        orbitalSpeed: 0.002,
        rotationPeriod: 9,
        diameter: 939.4,
        distanceFromSun: 414000000,
        orbitalPeriod: 1680,
        moons: 0,
        description: 'Ceres is the largest object in the asteroid belt, considered both an asteroid and a dwarf planet.',
      },
      {
        name: '2 Pallas',
        size: 512 * sizeScale * 10,
        distance: 414000000 * distanceScale,
        SMA: 2.77,
        color: 0x7FFF00,
        inclination: 34.8,
        eccentricity: 0.22995,
        ascendingNode: 173.1,
        orbitalSpeed: 0.002,
        rotationPeriod: 7,
        diameter: 512,
        distanceFromSun: 414000000,
        orbitalPeriod: 1684,
        moons: 0,
        description: 'Pallas is the third largest object in the asteroid belt.',
      },
      {
        name: '3 Juno',
        size: 233 * sizeScale * 10,
        distance: 395000000 * distanceScale,
        SMA: 2.67,
        color: 0x8B4513,
        inclination: 12.98,
        eccentricity: 0.255,
        ascendingNode: 170.0,
        orbitalSpeed: 0.003,
        rotationPeriod: 7.2,
        diameter: 233,
        distanceFromSun: 395000000,
        orbitalPeriod: 1593,
        moons: 0,
        description: 'Juno is one of the largest members of the asteroid belt.',
      },
      {
        name: '4 Vesta',
        size: 525.4 * sizeScale * 10,
        distance: 353000000 * distanceScale,
        SMA: 2.36,
        color: 0xFFA500,
        inclination: 7.14,
        eccentricity: 0.089,
        ascendingNode: 103.8,
        orbitalSpeed: 0.003,
        rotationPeriod: 5.3,
        diameter: 525.4,
        distanceFromSun: 353000000,
        orbitalPeriod: 1325,
        moons: 0,
        description: 'Vesta is the second largest object in the asteroid belt.',
      },
      {
        name: '10 Hygiea',
        size: 431 * sizeScale * 10,
        distance: 470000000 * distanceScale,
        SMA: 3.14,
        color: 0xD3D3D3,
        inclination: 3.84,
        eccentricity: 0.117,
        ascendingNode: 283.0,
        orbitalSpeed: 0.0017,
        rotationPeriod: 27,
        diameter: 431,
        distanceFromSun: 470000000,
        orbitalPeriod: 2038,
        moons: 0,
        description: 'Hygiea is the fourth largest object in the asteroid belt.',
      },
      {
        name: '243 Ida',
        size: 31.4 * sizeScale * 10,
        distance: 428000000 * distanceScale,
        SMA: 2.86,
        color: 0x808080,
        inclination: 1.14,
        eccentricity: 0.045,
        ascendingNode: 163.8,
        orbitalSpeed: 0.001,
        rotationPeriod: 4.63,
        diameter: 31.4,
        distanceFromSun: 428000000,
        orbitalPeriod: 1684,
        moons: 1,
        description: 'Ida is a member of the Koronis family of asteroids.',
      },
      {
        name: '433 Eros',
        size: 16.84 * sizeScale * 10,
        distance: 218000000 * distanceScale,
        SMA: 1.46,
        color: 0xDAA520,
        inclination: 10.83,
        eccentricity: 0.223,
        ascendingNode: 304.4,
        orbitalSpeed: 0.002,
        rotationPeriod: 5.27,
        diameter: 16.84,
        distanceFromSun: 218000000,
        orbitalPeriod: 643,
        moons: 0,
        description: 'Eros is a near-Earth asteroid.',
      },
      {
        name: '951 Gaspra',
        size: 18.2 * sizeScale * 10,
        distance: 329000000 * distanceScale,
        SMA: 2.21,
        color: 0xB22222,
        inclination: 4.11,
        eccentricity: 0.173,
        ascendingNode: 90.2,
        orbitalSpeed: 0.001,
        rotationPeriod: 7,
        diameter: 18.2,
        distanceFromSun: 329000000,
        orbitalPeriod: 1194,
        moons: 0,
        description: 'Gaspra was the first asteroid to be closely approached by a spacecraft.',
      },
      {
        name: '101955 Bennu',
        size: 0.49 * sizeScale * 10,
        distance: 135000000 * distanceScale,
        SMA: 1.13,
        color: 0x778899,
        inclination: 6.03,
        eccentricity: 0.203,
        ascendingNode: 2.04,
        orbitalSpeed: 0.0015,
        rotationPeriod: 4.3,
        diameter: 0.49,
        distanceFromSun: 135000000,
        orbitalPeriod: 436,
        moons: 0,
        description: 'Bennu is a near-Earth asteroid and the target of the OSIRIS-REx mission.',
      },
      {
        name: '25143 Itokawa',
        size: 0.33 * sizeScale * 10,
        distance: 150000000 * distanceScale,
        SMA: 1.32,
        color: 0xA0522D,
        inclination: 1.62,
        eccentricity: 0.28,
        ascendingNode: 128.2,
        orbitalSpeed: 0.002,
        rotationPeriod: 12.1,
        diameter: 0.33,
        distanceFromSun: 150000000,
        orbitalPeriod: 556,
        moons: 0,
        description: 'Itokawa is a near-Earth asteroid studied by the Hayabusa mission.',
      },
      {
        name: '1P/Halley',
        size: 11 * sizeScale * 10,
        distance: 0.586 * distanceScale,
        SMA: 17.8,
        color: 0xADD8E6,
        inclination: 162.26,
        eccentricity: 0.967,
        ascendingNode: 58.4,
        orbitalSpeed: 0.0007,
        rotationPeriod: 2.2,
        diameter: 11,
        distanceFromSun: 58600000,
        orbitalPeriod: 27690,
        moons: 0,
        description: 'Halley\'s Comet is the most famous periodic comet visible from Earth.',
      },
      {
        name: '67P/Churyumov–Gerasimenko',
        size: 4.1 * sizeScale * 10,
        distance: 370000000 * distanceScale,
        SMA: 3.5,
        color: 0x808080,
        inclination: 7.04,
        eccentricity: 0.64,
        ascendingNode: 50.4,
        orbitalSpeed: 0.001,
        rotationPeriod: 12.4,
        diameter: 4.1,
        distanceFromSun: 370000000,
        orbitalPeriod: 2339,
        moons: 0,
        description: '67P is the target of the Rosetta mission and has a distinct "rubber duck" shape.',
      },
      {
        name: '19P/Borrelly',
        size: 8 * sizeScale * 10,
        distance: 290000000 * distanceScale,
        SMA: 3.58,
        color: 0xA9A9A9,
        inclination: 30.33,
        eccentricity: 0.624,
        ascendingNode: 75.1,
        orbitalSpeed: 0.001,
        rotationPeriod: 12.5,
        diameter: 8,
        distanceFromSun: 290000000,
        orbitalPeriod: 2304,
        moons: 0,
        description: 'Borrelly is a periodic comet, visited by the Deep Space 1 mission.',
      },
      {
        name: '81P/Wild',
        size: 5 * sizeScale * 10,
        distance: 385000000 * distanceScale,
        SMA: 3.5,
        color: 0xA52A2A,
        inclination: 3.24,
        eccentricity: 0.54,
        ascendingNode: 136.2,
        orbitalSpeed: 0.001,
        rotationPeriod: 13.5,
        diameter: 5,
        distanceFromSun: 385000000,
        orbitalPeriod: 2360,
        moons: 0,
        description: 'Wild 2 is a periodic comet visited by the Stardust mission.',
      },
      {
        name: '2P/Encke',
        size: 4.8 * sizeScale * 10,
        distance: 170000000 * distanceScale,
        SMA: 2.21,
        color: 0x5F9EA0,
        inclination: 11.78,
        eccentricity: 0.847,
        ascendingNode: 334.6,
        orbitalSpeed: 0.001,
        rotationPeriod: 15.6,
        diameter: 4.8,
        distanceFromSun: 170000000,
        orbitalPeriod: 1204,
        moons: 0,
        description: 'Encke is a periodic comet with the shortest period of any known comet.',
      }
    ];

    
    const createdObjects = [];
    const labelElements = [];

    celestialBodies.forEach((data) => {
      const material = data.texture
        ? new THREE.MeshStandardMaterial({ map: textureLoader.load(data.texture) })
        : new THREE.MeshStandardMaterial({ color: data.color || 0xff0000 });
      const geometry = new THREE.SphereGeometry(data.size, 32, 32);
      const celestialBody = new THREE.Mesh(geometry, material);

      celestialBody.position.set(data.distance, 0, 0);
      celestialBody.castShadow = true;
      celestialBody.receiveShadow = true;

      const orbitGroup = new THREE.Group();
      orbitGroup.rotation.z = THREE.MathUtils.degToRad(data.inclination || 0);
      orbitGroup.rotation.y = THREE.MathUtils.degToRad(data.ascendingNode || 0);
      orbitGroup.add(celestialBody);
      scene.add(orbitGroup);

      // Crear órbitas usando ecuación polar y aplicar colores personalizados
      if (data.name !== 'Sun') {
        const orbitPoints = new THREE.BufferGeometry();
        const points = [];
        for (let theta = 0; theta <= 2 * Math.PI; theta += 0.01) {
          const r = (data.SMA * (1 - Math.pow(data.eccentricity, 2))) / (1 + data.eccentricity * Math.cos(theta));
          const x = r * Math.cos(theta);
          const z = r * Math.sin(theta);
          points.push(new THREE.Vector3(x * 100, 0, z * 100));
        }

        if (data.name === 'Saturn') {
          const saturnRing = textureLoader.load(saturnRingTexture);
          const ringGeometry = new THREE.RingGeometry(data.size + 1, data.size + 3, 64);
          const ringMaterial = new THREE.MeshBasicMaterial({ map: saturnRing, side: THREE.DoubleSide, transparent: true });
          const ring = new THREE.Mesh(ringGeometry, ringMaterial);
          ring.rotation.x = Math.PI / 2;
          celestialBody.add(ring);
        }
  
        orbitPoints.setFromPoints(points);
        const orbitLine = new THREE.Line(
          orbitPoints,
          new THREE.LineBasicMaterial({ color: orbitColors[data.name] || 0xffffff }) // Color personalizado
        );
        orbitGroup.add(orbitLine);
      }

      celestialBody.userData = { ...data, orbitGroup };
      createdObjects.push(celestialBody);

      // Crear y posicionar la etiqueta
      const label = document.createElement('div');
      label.style.position = 'absolute';
      label.style.color = 'white';
      label.style.fontSize = '12px';
      label.style.fontWeight = 'bold';
      label.textContent = data.name;
      label.style.pointerEvents = 'none';
      labelElements.push(label);
      document.body.appendChild(label);
    });

    setLabels(labelElements);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(createdObjects);
      if (intersects.length > 0) {
        const celestialBody = intersects[0].object.userData;
        // Redirigir a la página correspondiente en lugar de mostrar información
        window.location.href = `#`; // Coloca aquí la URL específica de cada planeta
      }
    };

    window.addEventListener('click', onMouseClick);

    const startTime = Date.now();
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      const elapsedTime = (Date.now() - startTime) * 0.001;

      // Ajuste dinámico de la velocidad de controles
      const distanceToCenter = camera.position.length();
      controls.rotateSpeed = distanceToCenter < 200 ? 0.2 : 0.7;
      controls.zoomSpeed = distanceToCenter < 200 ? 0.6 : 1.5;

      createdObjects.forEach((object, index) => {
        const { SMA, eccentricity, orbitalPeriod, rotationPeriod } = object.userData;
        if (object.userData.name !== 'Sun') {
          const angle = (2 * Math.PI * elapsedTime) / orbitalPeriod;
          const r = (SMA * (1 - Math.pow(eccentricity, 2))) / (1 + eccentricity * Math.cos(angle));
          object.position.x = r * Math.cos(angle) * 100;
          object.position.z = r * Math.sin(angle) * 100;
        }

        object.rotation.y += rotationPeriod ? (1 / rotationPeriod) * 0.01 : 0.001;

        const vector = new THREE.Vector3();
        object.getWorldPosition(vector);
        vector.project(camera);

        const screenX = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const screenY = (vector.y * -0.5 + 0.5) * window.innerHeight;

        if (labelElements[index]) {
          labelElements[index].style.left = `${screenX}px`;
          labelElements[index].style.top = `${screenY}px`;
        }
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
      renderer.dispose();

      labelElements.forEach((label) => {
        if (label && label.parentNode) {
          label.parentNode.removeChild(label);
        }
      });

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
