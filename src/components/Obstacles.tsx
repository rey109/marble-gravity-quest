import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import * as THREE from 'three';

export const Obstacles: React.FC = () => {
  // Moving obstacle 1
  const [obstacle1Ref, obstacle1Api] = useBox(() => ({
    position: [-2, 1, -15],
    args: [1, 1, 1],
    type: 'Kinematic'
  }));

  // Moving obstacle 2
  const [obstacle2Ref, obstacle2Api] = useBox(() => ({
    position: [3, 1, -25],
    args: [1, 1, 1],
    type: 'Kinematic'
  }));

  // Moving obstacle 3
  const [obstacle3Ref, obstacle3Api] = useBox(() => ({
    position: [0, 1, -32],
    args: [1, 1, 1],
    type: 'Kinematic'
  }));

  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;

    // Move obstacle 1 left-right
    const x1 = Math.sin(time.current * 2) * 3;
    obstacle1Api.position.set(x1, 1, -15);

    // Move obstacle 2 right-left (opposite phase)
    const x2 = Math.sin(time.current * 2 + Math.PI) * 2.5;
    obstacle2Api.position.set(x2, 1, -25);

    // Move obstacle 3 left-right (slower)
    const x3 = Math.sin(time.current * 1.5) * 2;
    obstacle3Api.position.set(x3, 1, -32);
  });

  return (
    <group>
      {/* Obstacle 1 */}
      <mesh ref={obstacle1Ref as any} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color="#e53e3e" 
          emissive="#e53e3e" 
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Obstacle 2 */}
      <mesh ref={obstacle2Ref as any} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color="#e53e3e" 
          emissive="#e53e3e" 
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Obstacle 3 */}
      <mesh ref={obstacle3Ref as any} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color="#e53e3e" 
          emissive="#e53e3e" 
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Static obstacles */}
      <mesh position={[4, 1, -18]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color="#9f7aea" 
          emissive="#9f7aea" 
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh position={[-3, 1, -38]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color="#9f7aea" 
          emissive="#9f7aea" 
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};