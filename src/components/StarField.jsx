import React, { useMemo } from 'react';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const StarField = ({ count = 5000 }) => {
  const [positions] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }
    return [positions];
  }, [count]);

  return (
    <Points positions={positions}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={1.3}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

export default StarField;