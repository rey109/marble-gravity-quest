import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { OrbitControls } from '@react-three/drei';
import { Ball } from './Ball';
import { Track } from './Track';
import { GameUI } from './GameUI';
import { GameCamera } from './GameCamera';
import { Obstacles } from './Obstacles';

export type GameState = 'playing' | 'gameOver' | 'won';

export const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('playing');
  const [startTime] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState(Date.now());
  const ballRef = useRef<any>();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleGameOver = () => {
    setGameState('gameOver');
  };

  const handleWin = () => {
    setGameState('won');
  };

  const handleRestart = () => {
    setGameState('playing');
    if (ballRef.current) {
      // Reset ball position
      ballRef.current.position.set(0, 2, 0);
      ballRef.current.api.velocity.set(0, 0, 0);
      ballRef.current.api.angularVelocity.set(0, 0, 0);
    }
  };

  const elapsedTime = Math.floor((currentTime - startTime) / 1000);

  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [0, 8, 12], fov: 75 }}
        shadows
        className="bg-gradient-to-b from-background to-muted"
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, 15, 0]} intensity={0.5} color="#00ffff" />
        
        <Physics gravity={[0, -20, 0]}>
          <Ball 
            ref={ballRef}
            onGameOver={handleGameOver}
            onWin={handleWin}
            gameState={gameState}
          />
          <Track />
          <Obstacles />
        </Physics>
        
        <GameCamera ballRef={ballRef} />
      </Canvas>
      
      <GameUI
        gameState={gameState}
        elapsedTime={elapsedTime}
        onRestart={handleRestart}
      />
    </div>
  );
};