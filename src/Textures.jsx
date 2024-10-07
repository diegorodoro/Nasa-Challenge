import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import sunTexture from './assets/textures/sun.png';
import mercuryTexture from './assets/textures/mercury.webp';
import venusTexture from './assets/textures/venus.webp';
import earthTexture from './assets/textures/earth.jpg';
import marsTexture from './assets/textures/mars.webp';
import jupiterTexture from './assets/textures/jupiter.jpg';
import saturnTexture from './assets/textures/saturn.jpg';
import saturnRingTexture from './assets/textures/saturn-ring.png';
import uranusTexture from './assets/textures/uranus.webp';
import neptuneTexture from './assets/textures/neptune.jpg';
import plutoTexture from './assets/textures/pluto.jpg';

const Textures = () => {
    const mountRef = useRef(null);

    // Definir la velocidad de rotación del Sol
    const sunRotationSpeed = 0.002; // Velocidad de rotación del Sol

    // Definir parámetros de órbita para Mercurio
    const mercuryOrbitRadius = 3; // Distancia del Sol
    const mercuryOrbitSpeed = 0.01; // Velocidad de la órbita de Mercurio

    // Definir parámetros de órbita para Venus
    const venusOrbitRadius = 4; // Distancia del Sol
    const venusOrbitSpeed = 0.005; // Velocidad de la órbita de Venus

    // Definir parámetros de órbita para la Tierra
    const earthOrbitRadius = 6; // Distancia del Sol
    const earthOrbitSpeed = 0.002; // Velocidad de la órbita de la Tierra

    // Definir parámetros de órbita para Marte
    const marsOrbitRadius = 8; // Distancia del Sol
    const marsOrbitSpeed = 0.001; // Velocidad de la órbita de Marte

    // Definir parámetros de órbita para Júpiter
    const jupiterOrbitRadius = 15; // Distancia del Sol
    const jupiterOrbitSpeed = 0.0005; // Velocidad de la órbita de Júpiter

    // Definir parámetros de órbita para Saturno
    const saturnOrbitRadius = 20; // Distancia del Sol
    const saturnOrbitSpeed = 0.0003; // Velocidad de la órbita de Saturno

    //definir parámetros de órbita para Urano
    const uranusOrbitRadius = 25; // Distancia del Sol
    const uranusOrbitSpeed = 0.0002; // Velocidad de la órbita de Urano

    //definir parámetros de órbita para Neptuno
    const neptuneOrbitRadius = 30; // Distancia del Sol
    const neptuneOrbitSpeed = 0.0001; // Velocidad de la órbita de Neptuno

    //definir parámetros de órbita para Plutón
    const plutoOrbitRadius = 35; // Distancia del Sol
    const plutoOrbitSpeed = 0.00005; // Velocidad de la órbita de Plutón

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        const controls = new OrbitControls(camera, renderer.domElement);

        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const textureLoader = new THREE.TextureLoader();

        // Crear el Sol
        const sunTextureLoaded = textureLoader.load(sunTexture);
        const sunGeometry = new THREE.SphereGeometry(2, 124, 124);
        const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTextureLoaded });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sun);

        // Crear Mercurio
        const mercuryTextureLoaded = textureLoader.load(mercuryTexture);
        const mercuryGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const mercuryMaterial = new THREE.MeshBasicMaterial({ map: mercuryTextureLoaded });
        const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
        scene.add(mercury);

        // Crear Venus
        const venusTextureLoaded = textureLoader.load(venusTexture);
        const venusGeometry = new THREE.SphereGeometry(0.7, 32, 32); // Radio ligeramente mayor para Venus
        const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTextureLoaded });
        const venus = new THREE.Mesh(venusGeometry, venusMaterial);
        scene.add(venus);

        // Crear la Tierra
        const earthTextureLoaded = textureLoader.load(earthTexture);
        const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
        const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTextureLoaded });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        scene.add(earth);

        // Crear Marte
        const marsTextureLoaded = textureLoader.load(marsTexture);
        const marsGeometry = new THREE.SphereGeometry(0.8, 32, 32);
        const marsMaterial = new THREE.MeshBasicMaterial({ map: marsTextureLoaded });
        const mars = new THREE.Mesh(marsGeometry, marsMaterial);
        scene.add(mars);

        // Crear Júpiter
        const jupiterTextureLoaded = textureLoader.load(jupiterTexture);
        const jupiterGeometry = new THREE.SphereGeometry(2, 32, 32);
        const jupiterMaterial = new THREE.MeshBasicMaterial({ map: jupiterTextureLoaded });
        const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
        scene.add(jupiter);

        // Crear Saturno
        const saturnTextureLoaded = textureLoader.load(saturnTexture);
        const saturnGeometry = new THREE.SphereGeometry(2.5, 32, 32);
        const saturnMaterial = new THREE.MeshBasicMaterial({ map: saturnTextureLoaded });
        const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
        scene.add(saturn);

        // Crear el anillo de Saturno
        const saturnRingTextureLoaded = textureLoader.load(saturnRingTexture);
        const saturnRingGeometry = new THREE.RingGeometry(3, 4, 32); // Radio interno y externo
        const saturnRingMaterial = new THREE.MeshBasicMaterial({ map: saturnRingTextureLoaded, side: THREE.DoubleSide });
        const saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
        saturnRing.rotation.x = -Math.PI / 2; // Rotar el anillo para que esté plano
        saturn.add(saturnRing); // Agregar el anillo como hijo de Saturno

        // Crear Urano
        const uranusTextureLoaded = textureLoader.load(uranusTexture);
        const uranusGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        const uranusMaterial = new THREE.MeshBasicMaterial({ map: uranusTextureLoaded });
        const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
        scene.add(uranus);

        // Crear Neptuno
        const neptuneTextureLoaded = textureLoader.load(neptuneTexture);
        const neptuneGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        const neptuneMaterial = new THREE.MeshBasicMaterial({ map: neptuneTextureLoaded });
        const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
        scene.add(neptune);

        // Crear Plutón
        const plutoTextureLoaded = textureLoader.load(plutoTexture);
        const plutoGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const plutoMaterial = new THREE.MeshBasicMaterial({ map: plutoTextureLoaded });
        const pluto = new THREE.Mesh(plutoGeometry, plutoMaterial);
        scene.add(pluto);

        camera.position.z = 25; // Ajustar la posición de la cámara

        const animate = (time) => {
            requestAnimationFrame(animate);

            // Rotar el Sol
            sun.rotation.x += sunRotationSpeed; // Rotación del Sol en el eje X
            sun.rotation.y += sunRotationSpeed; // Rotación del Sol en el eje Y

            // Calcular la posición de órbita de Mercurio
            const mercuryAngle = (time * mercuryOrbitSpeed) / 1000; // Convertir a radianes
            mercury.position.x = mercuryOrbitRadius * Math.cos(mercuryAngle); // Posición X
            mercury.position.z = mercuryOrbitRadius * Math.sin(mercuryAngle); // Posición Z

            // Calcular la posición de órbita de Venus
            const venusAngle = (time * venusOrbitSpeed) / 1000; // Convertir a radianes
            venus.position.x = venusOrbitRadius * Math.cos(venusAngle); // Posición X
            venus.position.z = venusOrbitRadius * Math.sin(venusAngle); // Posición Z

            // Calcular la posición de órbita de la Tierra
            const earthAngle = (time * earthOrbitSpeed) / 1000; // Convertir a radianes
            earth.position.x = earthOrbitRadius * Math.cos(earthAngle); // Posición X
            earth.position.z = earthOrbitRadius * Math.sin(earthAngle); // Posición Z

            // Calcular la posición de órbita de Marte
            const marsAngle = (time * marsOrbitSpeed) / 1000; // Convertir a radianes
            mars.position.x = marsOrbitRadius * Math.cos(marsAngle); // Posición X
            mars.position.z = marsOrbitRadius * Math.sin(marsAngle); // Posición Z

            // Calcular la posición de órbita de Júpiter
            const jupiterAngle = (time * jupiterOrbitSpeed) / 1000; // Convertir a radianes
            jupiter.position.x = jupiterOrbitRadius * Math.cos(jupiterAngle); // Posición X
            jupiter.position.z = jupiterOrbitRadius * Math.sin(jupiterAngle); // Posición Z

            // Calcular la posición de órbita de Saturno
            const saturnAngle = (time * saturnOrbitSpeed) / 1000; // Convertir a radianes
            saturn.position.x = saturnOrbitRadius * Math.cos(saturnAngle); // Posición X
            saturn.position.z = saturnOrbitRadius * Math.sin(saturnAngle); // Posición Z

            // Calcular la posición de órbita de Urano
            const uranusAngle = (time * uranusOrbitSpeed) / 1000; // Convertir a radianes
            uranus.position.x = uranusOrbitRadius * Math.cos(uranusAngle); // Posición X
            uranus.position.z = uranusOrbitRadius * Math.sin(uranusAngle); // Posición Z

            // Calcular la posición de órbita de Neptuno
            const neptuneAngle = (time * neptuneOrbitSpeed) / 1000; // Convertir a radianes
            neptune.position.x = neptuneOrbitRadius * Math.cos(neptuneAngle); // Posición X
            neptune.position.z = neptuneOrbitRadius * Math.sin(neptuneAngle); // Posición Z

            // Calcular la posición de órbita de Plutón
            const plutoAngle = (time * plutoOrbitSpeed) / 1000; // Convertir a radianes
            pluto.position.x = plutoOrbitRadius * Math.cos(plutoAngle); // Posición X
            pluto.position.z = plutoOrbitRadius * Math.sin(plutoAngle); // Posición Z

            // Renderizar la escena
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

export default Textures;