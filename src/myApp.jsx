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
