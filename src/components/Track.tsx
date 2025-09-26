import React from 'react';
import { useBox } from '@react-three/cannon';
import * as THREE from 'three';

export const Track: React.FC = () => {
  // Main track segments
  const [segment1] = useBox(() => ({
    position: [0, -0.5, 0],
    args: [10, 1, 15],
    type: 'Static'
  }));

  const [segment2] = useBox(() => ({
    position: [0, -0.5, -20],
    args: [8, 1, 10],
    type: 'Static'
  }));

  const [segment3] = useBox(() => ({
    position: [0, -0.5, -35],
    args: [6, 1, 10],
    type: 'Static'
  }));

  // Finish platform
  const [finishPlatform] = useBox(() => ({
    position: [0, -0.5, -50],
    args: [8, 1, 8],
    type: 'Static'
  }));

  return (
    <group>
      {/* Segment 1 - Start */}
      <mesh ref={segment1 as any} receiveShadow>
        <boxGeometry args={[10, 1, 15]} />
        <meshStandardMaterial color="#4a5568" roughness={0.8} />
      </mesh>
      
      {/* Track borders for segment 1 */}
      <mesh position={[-5.5, 0.5, 0]} receiveShadow>
        <boxGeometry args={[1, 2, 15]} />
        <meshStandardMaterial color="#2d3748" transparent opacity={0.8} />
      </mesh>
      <mesh position={[5.5, 0.5, 0]} receiveShadow>
        <boxGeometry args={[1, 2, 15]} />
        <meshStandardMaterial color="#2d3748" transparent opacity={0.8} />
      </mesh>

      {/* Segment 2 - Middle */}
      <mesh ref={segment2 as any} receiveShadow>
        <boxGeometry args={[8, 1, 10]} />
        <meshStandardMaterial color="#4a5568" roughness={0.8} />
      </mesh>
      
      {/* Track borders for segment 2 */}
      <mesh position={[-4.5, 0.5, -20]} receiveShadow>
        <boxGeometry args={[1, 2, 10]} />
        <meshStandardMaterial color="#2d3748" transparent opacity={0.8} />
      </mesh>
      <mesh position={[4.5, 0.5, -20]} receiveShadow>
        <boxGeometry args={[1, 2, 10]} />
        <meshStandardMaterial color="#2d3748" transparent opacity={0.8} />
      </mesh>

      {/* Segment 3 - Narrow */}
      <mesh ref={segment3 as any} receiveShadow>
        <boxGeometry args={[6, 1, 10]} />
        <meshStandardMaterial color="#4a5568" roughness={0.8} />
      </mesh>
      
      {/* Track borders for segment 3 */}
      <mesh position={[-3.5, 0.5, -35]} receiveShadow>
        <boxGeometry args={[1, 2, 10]} />
        <meshStandardMaterial color="#2d3748" transparent opacity={0.8} />
      </mesh>
      <mesh position={[3.5, 0.5, -35]} receiveShadow>
        <boxGeometry args={[1, 2, 10]} />
        <meshStandardMaterial color="#2d3748" transparent opacity={0.8} />
      </mesh>

      {/* Finish Platform */}
      <mesh ref={finishPlatform as any} receiveShadow>
        <boxGeometry args={[8, 1, 8]} />
        <meshStandardMaterial color="#38a169" emissive="#38a169" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Finish line marker */}
      <mesh position={[0, 1, -46]} receiveShadow>
        <boxGeometry args={[8, 0.1, 0.5]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>

      {/* Start line */}
      <mesh position={[0, 1, 7]} receiveShadow>
        <boxGeometry args={[10, 0.1, 0.5]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>

      {/* Environmental elements */}
      <mesh position={[-15, 5, -25]} scale={[2, 2, 2]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#9f7aea" emissive="#9f7aea" emissiveIntensity={0.2} />
      </mesh>
      
      <mesh position={[15, 3, -10]} scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#ed64a6" emissive="#ed64a6" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
};