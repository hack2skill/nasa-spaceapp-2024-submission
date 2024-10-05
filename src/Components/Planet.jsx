import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { MeshWobbleMaterial } from '@react-three/drei';
import { TextureLoader } from 'three';

const Planet = ({ position, textureURL, size }) => {
  const planetRef = useRef();
  const texture = useLoader(TextureLoader, textureURL);

  useFrame(() => {
    planetRef.current.rotation.y += 0.020 ;
  });

  return (
    <mesh ref={planetRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <MeshWobbleMaterial map={texture} factor={0} speed={1} />
    </mesh>
  );
};

export default Planet;

