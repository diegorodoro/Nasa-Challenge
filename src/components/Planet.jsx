import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const Planet = ({ position, onClick, isActive, name }) => {
  const meshRef = useRef();
  const { nodes, materials } = useGLTF(`/models/${name.toLowerCase()}.glb`);

  useFrame((state, delta) => {
    if (isActive) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} onClick={onClick} scale={isActive ? 1.2 : 1}>
      <primitive object={nodes.Sphere002_0} />
      <meshStandardMaterial {...materials[name.toLowerCase()]} />
    </mesh>
  );
};

export default Planet;