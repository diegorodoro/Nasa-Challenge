import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader } from 'three';
import { Flex, Text } from "@radix-ui/themes";
import background from "../assets/images/background.jpg";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { motion } from 'framer-motion';
import { useSpring, a } from '@react-spring/three'; // Importar useSpring y a (animated)
import planets from '../data/detailDirectory';
import Footer from './components/footer';
import Header from './components/header';
import { CaretRightIcon } from "@radix-ui/react-icons";
import { useSearchParams } from 'react-router-dom';

function Planet({ planet, planetPosition }) {
    const texture = useLoader(TextureLoader, planet.mesh);
    const planetRef = useRef();
    const [gltf, setGltf] = useState(null); // Estado para almacenar el modelo GLB

    // Hacer que el planeta gire lentamente
    useFrame(() => {
        if (planetRef.current) {
            planetRef.current.rotation.y += 0.002; // Rota lentamente sobre el eje Y
        }
    });

    // Cargar el modelo GLB usando GLTFLoader
    useEffect(() => {
        const loader = new GLTFLoader();
        if (planet.name === "Saturn") {
            loader.load(
                '../assets/images/Saturn_GLB.glb', // Asegúrate de que la ruta sea correcta
                (gltf) => setGltf(gltf),
                undefined,
                (error) => console.error('Error cargando el modelo:', error)
            );
        }
    }, [planet.name]);

    // Utilizar spring para animar la posición del planeta
    const { position } = useSpring({ position: planetPosition, config: { mass: 1, tension: 150, friction: 50 } });

    return (
        <a.mesh ref={planetRef} position={position}> {/* a.mesh en lugar de mesh */}
            {planet.name === "Saturn" && gltf ? (
                <primitive object={gltf.scene} />
            ) : (
                <>
                    <sphereGeometry args={[3, 32, 32]} />
                    <meshStandardMaterial map={texture} />
                </>
            )}
        </a.mesh>
    );
}

export default function DetailView() {
    const [searchParams] = useSearchParams();
    const planetIndex = parseInt(searchParams.get('planetIndex'), 10) || 1;
    const [isLoading, setIsLoading] = useState(true);
    const [currentPlanetIndex, setCurrentPlanetIndex] = useState(planetIndex);
    const currentPlanet = planets[currentPlanetIndex];
    const [planetPosition, setPlanetPosition] = useState([0, 0, 0]);

    const nextPlanet = () => {
        // Desplaza el planeta hacia la derecha
        setPlanetPosition([-25, 0, -10]);

        setTimeout(() => {
            // Cambia el planeta después del desplazamiento
            setCurrentPlanetIndex((currentPlanetIndex + 1) % planets.length);
            // Restablece la posición para el nuevo planeta
            setPlanetPosition([0, 0, 0]);
        }, 1000);
    };

    // Simular la carga del planeta
    useEffect(() => {
        const loadPlanet = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsLoading(false);
        };

        loadPlanet();
    }, []);

    return (
        <div
            className="bg-cover bg-center h-screen flex flex-col"
            style={{ backgroundImage: `url(${background})` }}
        >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }}>
                <Header />
            </motion.div>

            <Flex className="flex-1 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    animate={!isLoading ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 1.2 }}
                >
                    <Canvas style={{ width: '65vw', height: '100%', maxWidth: "60vw", overflow: "hidden" }}>
                        <OrbitControls enableZoom={true} enablePan={false} minDistance={5} maxDistance={6} />
                        <ambientLight intensity={1} />
                        <pointLight position={[5, 5, 5]} intensity={1.5} />
                        <Planet planet={currentPlanet} planetPosition={planetPosition} />
                    </Canvas>
                </motion.div>

                <div className="w-[100%] flex flex-row overflow-hidden justify-center">
                    <div className="flex flex-col justify-center w-[100%]">
                        <motion.div
                            key={`${currentPlanet.name}-name`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2.7 }}
                        >
                            <Text className="font-sans font-bold text-white text-7xl">{currentPlanet.name}</Text>
                        </motion.div>
                        <motion.div
                            key={`${currentPlanet.name}-description`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className='mt-4'
                        >
                            <Text className="font-sans text-white text-2xl">
                                {currentPlanet.description}
                            </Text>
                        </motion.div>
                        <motion.div
                            key={`${currentPlanet.name}-info`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                            className='mt-4'
                        >
                            <Text className="font-sans text-white text-xl">
                                <ul className="list-disc pl-6">
                                    <li><span className="font-bold">Diameter:</span> {currentPlanet.diameter}</li>
                                    <li><span className="font-bold">Distance from Sun:</span> {currentPlanet.distanceFromSun}</li>
                                    <li><span className="font-bold">Moons:</span> {currentPlanet.moons}</li>
                                </ul>
                            </Text>
                        </motion.div>
                    </div>

                    <div className="flex flex-col justify-center pr-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.7 }}>
                            <CaretRightIcon className="h-12 w-12 ml-4 text-white hover:cursor-pointer hover:scale-150" onClick={nextPlanet} />
                        </motion.div>
                    </div>
                </div>
            </Flex>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }}>
                <Footer />
            </motion.div>
        </div>
    );
}
