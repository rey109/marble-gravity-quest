import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface GameCameraProps {
  ballRef: React.RefObject<any>;
}

export const GameCamera: React.FC<GameCameraProps> = ({ ballRef }) => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const currentPosition = useRef(new THREE.Vector3(0, 8, 12));

  useFrame(() => {
    if (ballRef.current?.position) {
      const ballPosition = ballRef.current.position;
      
      // Calculate desired camera position (behind and above the ball)
      targetPosition.current.set(
        ballPosition.x,
        ballPosition.y + 6,
        ballPosition.z + 10
      );

      // Smoothly interpolate camera position
      currentPosition.current.lerp(targetPosition.current, 0.05);
      camera.position.copy(currentPosition.current);

      // Make camera look at the ball
      camera.lookAt(ballPosition.x, ballPosition.y + 1, ballPosition.z);
    }
  });

  return null;
};