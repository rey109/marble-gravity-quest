import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import * as THREE from 'three';
import type { GameState } from './Game';

interface BallProps {
  onGameOver: () => void;
  onWin: () => void;
  gameState: GameState;
}

export const Ball = forwardRef<any, BallProps>(({ onGameOver, onWin, gameState }, ref) => {
  const [ballRef, api] = useSphere(() => ({
    mass: 1,
    position: [0, 2, 0],
    material: { friction: 0.4, restitution: 0.6 }
  }));

  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false
  });

  const velocity = useRef([0, 0, 0]);
  const position = useRef([0, 2, 0]);

  useImperativeHandle(ref, () => ({
    position: ballRef.current?.position,
    api
  }));

  useEffect(() => {
    const unsub = api.velocity.subscribe((v) => (velocity.current = v));
    const unsub2 = api.position.subscribe((p) => (position.current = p));
    return () => {
      unsub();
      unsub2();
    };
  }, [api]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          keys.current.forward = true;
          break;
        case 'ArrowDown':
        case 'KeyS':
          keys.current.backward = true;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          keys.current.left = true;
          break;
        case 'ArrowRight':
        case 'KeyD':
          keys.current.right = true;
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          keys.current.forward = false;
          break;
        case 'ArrowDown':
        case 'KeyS':
          keys.current.backward = false;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          keys.current.left = false;
          break;
        case 'ArrowRight':
        case 'KeyD':
          keys.current.right = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  useFrame(() => {
    if (gameState !== 'playing') return;

    const force = 15;
    let forceX = 0;
    let forceZ = 0;

    if (keys.current.forward) forceZ -= force;
    if (keys.current.backward) forceZ += force;
    if (keys.current.left) forceX -= force;
    if (keys.current.right) forceX += force;

    api.applyImpulse([forceX, 0, forceZ], [0, 0, 0]);

    // Check if ball fell off the track
    if (position.current[1] < -10) {
      onGameOver();
    }

    // Check if ball reached the finish line (far end of the track)
    if (position.current[2] < -45) {
      onWin();
    }
  });

  return (
    <mesh ref={ballRef as any} castShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshPhysicalMaterial
        color="#00ffff"
        transparent
        opacity={0.8}
        roughness={0.1}
        metalness={0.1}
        clearcoat={1}
        clearcoatRoughness={0}
      />
      {/* Glow effect */}
      <mesh scale={1.2}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.3}
        />
      </mesh>
    </mesh>
  );
});

Ball.displayName = 'Ball';