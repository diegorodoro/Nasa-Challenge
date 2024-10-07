import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, useFont } from '@react-three/drei';
import * as THREE from 'three';
import { Earth, Instances as EarthInstances } from './Earth';
import { Mars } from './Mars';
import { Venus } from './Venus';
import { Mercury } from './Mercury';
import { Jupiter } from './Jupiter';
import { Saturn } from './Saturn';
import { Uranus } from './Uranus';
import { Neptune } from './Neptune';
import Hero from './Hero';
import HeroCamera from './HeroCamera';
import { useSpring, animated } from '@react-spring/three';
import Navbar from './Navbar';  // Add this line
import RadialMenu from './RadialMenu';  // Add this line
import StarField from './StarField';
import Loading2D from './Loading2D';
import RocketLaunch from './RocketLaunch';


const CurvedText = ({ text, radius, size, color }) => {
  const [textRotation, setTextRotation] = useState(0);
  const font = useFont('https://cdn.jsdelivr.net/npm/three/examples/fonts/droid/droid_sans_bold.typeface.json')

  useFrame(() => {
    setTextRotation((prev) => prev + 0.0005);
  });

  const getKerning = (char, nextChar) => {
    if (char === 'M' && nextChar === 'a') return 0.3;
    if (char === 'i' && nextChar === 't') return -0.05;
    if (char === 'r' && nextChar === 'c') return -0.05;
    if (char === 'M' && nextChar === 'e') return 0.2;
    if (char === 'u' && nextChar === 'p') return 0.2;
    return 0;
  };

  return (
    <group rotation={[0, textRotation, 0]}>
      {text.split('').reverse().map((char, i, arr) => {
        const kerning = getKerning(char, arr[i - 1]);
        const angle = (i + kerning) * 0.2 + Math.PI / 2;
        return (
          <Text
            key={i}
            color={color}
            fontSize={size}
            font={font.path}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius
            ]}
            rotation={[0, -angle + Math.PI / 2, 0]}
          >
            {char}
          </Text>
        );
      })}
    </group>
  );
};

const Planet = ({ Component, Instances, scale, name, textSize, textRadius, color, isActive, rotation }) => {
  const { scaleSpring, opacitySpring } = useSpring({
    scaleSpring: isActive ? scale : 0.001,
    opacitySpring: isActive ? 1 : 0,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  const planetRef = useRef();

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.001;
    }
  });

  return (
    <animated.group scale={scaleSpring}>
      <group ref={planetRef} rotation={rotation}>
        {Instances ? (
          <Instances>
            <Component scale={1} castShadow receiveShadow />
          </Instances>
        ) : (
          <Component scale={1} castShadow receiveShadow />
        )}
      </group>
      <animated.group opacity={opacitySpring}>
        <CurvedText
          text={name}
          radius={textRadius}
          size={textSize}
          color={color}
        />
      </animated.group>
    </animated.group>
  );
};

const Carousel = ({ activePlanet }) => {
  const lightRef = useRef();

  const planets = [
    {
      component: Mercury,
      name: 'Mercury   Mercury   Mercury',
      scale: 0.2,
      textSize: 30,
      textRadius: 75,
      color: '#9AD9B9'
    },
    {
      component: Venus,
      name: 'Venus   Venus   Venus   Venus',
      scale: 0.3,
      textSize: 25,
      textRadius: 70,
      color: '#e6a66f'
    },
    {
      component: Earth,
      instances: EarthInstances,
      name: 'Earth   Earth   Earth   Earth',
      scale: 4.5,
      textSize: 2.5,
      textRadius: 6.5,
      color: '#6b93d6'
    },
    {
      component: Mars,
      name: 'Mars   Mars   Mars   Mars',
      scale: 10,
      textSize: 1.2,
      textRadius: 3,
      color: '#E75353'
    },
    {
      component: Jupiter,
      name: 'Jupiter              Jupiter              Jupiter',
      scale: 0.2,
      textSize: 65,
      textRadius: 155,
      color: '#e3a551'
    },
    {
      component: Saturn,
      name: 'Saturn         Saturn',
      scale: 1,
      textSize: 10,
      textRadius: 20,
      color: '#FFA500',
      rotation: [0.4, 0, 0],
    },
    {
      component: Uranus,
      name: 'Uranus             Uranus',
      scale: 0.035,
      textSize: 300,
      textRadius: 800,
      color: '#7FCFCF',
      rotation: [0.4, 0, 0],
    },
    {
      component: Neptune,
      name: 'Neptune         Neptune',
      scale: 2,
      textSize: 6,
      textRadius: 15,
      color: '#5364E7',
      rotation: [0.4, 0, 0],
    },
  ];

  return (
    <HeroCamera>
      <StarField />  // Add the StarField component here
      {/* Simulated sunlight from the right side */}
      <directionalLight
        ref={lightRef}
        color={0xffffff}
        intensity={2}
        position={[50, 0, 0]}  // Positioned to the right
      />

      {/* Ambient light for overall scene brightness */}
      <ambientLight intensity={0.3} />

      {planets.map((planet, index) => (
        <Planet
          key={planet.name}
          Component={planet.component}
          Instances={planet.instances}
          scale={planet.scale}
          name={planet.name}
          textSize={planet.textSize}
          textRadius={planet.textRadius}
          color={planet.color}
          isActive={index === activePlanet}
          rotation={planet.rotation || [0, 0, 0]}
        />
      ))}
    </HeroCamera>
  );
};


const PlanetCarousel = () => {
  const [activePlanet, setActivePlanet] = useState(() => Math.floor(Math.random() * 8));
  const [showRadialMenu, setShowRadialMenu] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const totalPlanets = 8;
  const navigate = useNavigate();

  const planets = [
    { name: 'Mercury' },
    { name: 'Venus' },
    { name: 'Earth' },
    { name: 'Mars' },
    { name: 'Jupiter' },
    { name: 'Saturn' },
    { name: 'Uranus' },
    { name: 'Neptune' },
  ];

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      setActivePlanet((prev) => (prev + 1) % 8);
      setShowRadialMenu(true);
    } else if (e.key === 'ArrowLeft') {
      setActivePlanet((prev) => (prev - 1 + 8) % 8);
      setShowRadialMenu(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust this value to control the minimum loading time

    return () => clearTimeout(timer);
  }, []);

  const handleDetailsClick = () => {
    console.log(`Traveling to ${planets[activePlanet].name}`);
    navigate(`/about`);

  };

  if (isLoading) {
    return <Loading2D />;
  }

  return (
    <section className="min-h-screen w-full flex flex-col relative overflow-hidden" id="home">
      <Navbar currentPlanet={activePlanet} totalPlanets={totalPlanets} />
      <div className="w-full h-full absolute inset-0">
        <Canvas camera={{ position: [0, 0, 50], fov: 75 }} shadows>
          <Suspense fallback={null}>
            <Carousel activePlanet={activePlanet} />
          </Suspense>
        </Canvas>
        <RadialMenu
          isVisible={showRadialMenu}
          planetName={planets[activePlanet].name}
          onDetailsClick={handleDetailsClick}
        />
      </div>
      <Hero />
      <div className="absolute bottom-7 left-0 right-0 text-center text-white">
        Use left and right arrow keys to change planets
      </div>
    </section>
  );
};

export default PlanetCarousel;