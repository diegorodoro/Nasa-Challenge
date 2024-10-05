import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const PlanetCanvas = ({ planetTexture }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Crear la escena, cámara y renderizador para el planeta dentro de la ficha
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0); // Fondo transparente
    canvasRef.current.appendChild(renderer.domElement);

    // Crear la geometría y la textura del planeta
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(`/textures/${planetTexture}`);
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
    camera.position.z = 15;

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
      canvasRef.current.removeChild(renderer.domElement);
    };
  }, [planetTexture]);

  return <div ref={canvasRef}></div>;
};

export default PlanetCanvas;
