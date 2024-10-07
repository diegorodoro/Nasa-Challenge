import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const HeroCamera = ({ children }) => {
  const group = useRef();

  useFrame((state, delta) => {
    // Constant rotation for planets
    group.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={group}>
      {children}
    </group>
  );
};

export default HeroCamera;