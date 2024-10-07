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

    controls.minDistance = 11; // Mínimo acercamiento
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
    const starCount = 2500;  
    for (let i = 0; i < starCount; i++) {
      const x = THREE.MathUtils.randFloatSpread(10000); 
      const y = THREE.MathUtils.randFloatSpread(10000);
      const z = THREE.MathUtils.randFloatSpread(10000);
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);


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
        name: 'Bennu',
        size: 482,
        type: 'Risk',
        distance: 14767294, //au
        texture: '',
        SMA: 1.125960,
        inclination: 6,
        eccentricity: 0.204,
        ascendingNode: '',
        orbitalSpeed: '',
        rotationPeriod: '',
        distanceFromSun: '',
        orbitalPeriod: '',
        moons: 0,
        description: 'Bennu is a near-Earth asteroid.'
      },
      {
        name: '951 Gaspra',
        size: 1300,
        type: 'Near',
        distance: NaN, //au
        texture: '',
        SMA: 2.209877,
        inclination: 4.1061,
        eccentricity: 0.173250,
        ascendingNode: '',
        orbitalSpeed: '',
        rotationPeriod: '',
        distanceFromSun: '',
        orbitalPeriod: '',
        moons: 0,
        description: 'Bennu is a near-Earth asteroid.'
      },
      {
        name: '1 Ceres',
        size: 500000,
        type: 'Near',
        distance: '', //au
        texture: '',
        SMA: 2.766620,
        inclination: 10.6,
        eccentricity: 0.079,
        ascendingNode: '',
        orbitalSpeed: '',
        rotationPeriod: '',
        distanceFromSun: '',
        orbitalPeriod: '',
        moons: 0,
        description: 'Bennu is a near-Earth asteroid.'
      },
      // {
      //   name: '1 Ceres',
      //   size: ,
      //   type: '',
      //   distance: , //au
      //   texture: '',
      //   SMA: ,
      //   inclination: ,
      //   eccentricity: ,
      //   ascendingNode: '',
      //   orbitalSpeed: '',
      //   rotationPeriod: '',
      //   distanceFromSun: '',
      //   orbitalPeriod: '',
      //   moons: 0,
      //   description: 'Bennu is a near-Earth asteroid.'
      // },
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

      // Crear órbitas usando ecuación polar (igual que antes)
      if (data.name !== 'Sun') {
        const orbitPoints = new THREE.BufferGeometry();
        const points = [];
        for (let theta = 0; theta <= 2 * Math.PI; theta += 0.01) {
          const r = (data.SMA * (1 - Math.pow(data.eccentricity, 2))) / (1 + data.eccentricity * Math.cos(theta));
          const x = r * Math.cos(theta);
          const z = r * Math.sin(theta);
          points.push(new THREE.Vector3(x * 100, 0, z * 100));
        }
        orbitPoints.setFromPoints(points);
        var color 
        if (data.type === 'Risk') {
          color = 0xff0000
        } else if (data.type === 'Near') {
          color = 0x0000ff
        } else {
          color = 0xffffff
        }

        const orbitLine = new THREE.Line(
          orbitPoints,
          new THREE.LineBasicMaterial({ color: color })
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
        setSelectedObject(celestialBody);
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

        // Rotación sobre su eje
        object.rotation.y += rotationPeriod ? (1 / rotationPeriod) * 0.01 : 0.001;

        // Proyectar la posición para etiquetas
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
