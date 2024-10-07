import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const PlanetCanvas = ({ planetTexture, size }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Crear la escena, cámara y renderizador para el planeta dentro de la ficha
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(400, 400); // Tamaño del canvas más grande
    renderer.setClearColor(0x000000, 0); // Fondo transparente
    canvasRef.current.appendChild(renderer.domElement);

    // Crear la geometría y la textura del planeta con tamaño ajustable
    const geometry = new THREE.SphereGeometry(size, 32, 32); // Ajustar el tamaño del planeta
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(planetTexture);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    // Añadir iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Posicionar la cámara
    camera.position.z = size * 2.5; // Ajustar posición de cámara con base en el tamaño del planeta

    // Configurar controles de órbita para rotar el planeta
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false; // Desactivar zoom para esta vista
    controls.enablePan = false; // Desactivar paneo
    controls.autoRotate = true; // Rotación automática
    controls.autoRotateSpeed = 0.5; // Velocidad de rotación automática

    // Animar el planeta
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Limpiar recursos al desmontar el componente
    return () => {
      controls.dispose();
      renderer.dispose();
      geometry.dispose();
      material.dispose();

      if (renderer.domElement && canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, [planetTexture, size]);

  return <div ref={canvasRef}></div>;
};

export default PlanetCanvas;
