import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { TextureLoader } from 'three';
import { Flex, Text } from "@radix-ui/themes";
import background from "../assets/images/background.jpg";
import planetTexture from '../assets/images/8k_mars.jpg'; // Importa la textura
import { motion } from 'framer-motion';
import planets from '../data/detailDirectory';
import Footer from './components/footer';
import Header from './components/header';

function Planet() {
    const texture = useLoader(TextureLoader, planetTexture);
    const planetRef = useRef(); // Crear una referencia para el planeta

    // Hacer que el planeta gire lentamente
    useFrame(() => {
        if (planetRef.current) {
            planetRef.current.rotation.y += 0.003; // Rota lentamente sobre el eje Y
        }
    });

    return (
        <mesh ref={planetRef}>
            <sphereGeometry args={[2.5, 32, 32]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
}

export default function MyApp() {
    const [isLoading, setIsLoading] = useState(true);
    const mars = planets[0]; // Selecciona Marte

    // Simular la carga del planeta
    useEffect(() => {
        const loadPlanet = async () => {
            // Simula un retraso de carga (ajusta según sea necesario)
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsLoading(false);
        };

        loadPlanet();
    }, []);

    return (
        <div
            className="bg-cover bg-center h-screen flex flex-col" // Establece flex-col para que el footer esté al final
            style={{ backgroundImage: `url(${background})` }} // Establece la imagen de fondo aquí
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5 }}  // Ajusta la duración del fade in
            >
                <Header />
            </motion.div>

            <Flex align="center" justify="center" className="flex-1 overflow-hidden"> {/* Evitar el desbordamiento */}
                {/* Contenedor de movimiento para el Canvas */}
                <motion.div
                    className="transform translate-x-4" // Ajusta la posición del Canvas
                    initial={{ opacity: 0, x: '-100%' }} // Empieza fuera de la vista
                    animate={!isLoading ? { opacity: 1, x: 0 } : {}} // Solo animar si no está cargando
                    transition={{ duration: 1.2 }}
                >
                    <Canvas style={{ width: '50vw', height: '100vh' }}>
                        <OrbitControls enableZoom={true} minDistance={4.5} maxDistance={10} />
                        <ambientLight intensity={1} />
                        <pointLight position={[5, 5, 5]} intensity={1.5} />
                        <Planet />
                    </Canvas>
                </motion.div>

                <div className="w-[30%] flex flex-col p-4 overflow-hidden"> {/* Asegura disposición en columna */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2.5 }}  // Ajusta la duración del fade in
                    >
                        <Text className="font-sans font-bold text-white text-7xl">{mars.name}</Text>
                    </motion.div>

                    <motion.div // Segundo div de movimiento para el texto
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className='mt-4' // Retraso para el texto
                    >
                        <Text className="font-sans text-white text-2xl">
                            {mars.description}
                        </Text>
                    </motion.div>

                    <motion.div // Tercer div de movimiento para la información
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className='mt-4' // Retraso para la información
                    >
                        <Text className="font-sans text-white text-xl">
                            <ul className="list-disc pl-6"> {/* Estilo para la lista desordenada */}
                                <li>
                                    <span className="font-bold">Diameter:</span> {mars.diameter}
                                </li>
                                <li>
                                    <span className="font-bold">Distance from Sun:</span> {mars.distanceFromSun}
                                </li>
                                <li>
                                    <span className="font-bold">Moons:</span> {mars.moons}
                                </li>
                            </ul>
                        </Text>
                    </motion.div>
                </div>
            </Flex>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5 }}  // Ajusta la duración del fade in
            >
                <Footer />
            </motion.div>
        </div>
    );
}
