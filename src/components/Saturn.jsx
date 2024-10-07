/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Shady Tex (https://sketchfab.com/ShadyTex4u)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/realistic-saturn-8k-e7a4eecf7c114d06828a044c1c4f15ae
Title: Realistic Saturn 8K
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Saturn(props) {
  const { nodes, materials } = useGLTF('/models/realistic_saturn_8k.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          geometry={nodes.saturn_Planet_0.geometry}
          material={materials.Planet}
          rotation={[-0.779, 0.194, -0.033]}
          scale={100}
        />
        <mesh
          geometry={nodes.ring_rings_0.geometry}
          material={materials.rings}
          rotation={[2.362, -0.198, 0.029]}
          scale={[-3383.158, 3383.158, 3383.158]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/realistic_saturn_8k.glb')