import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { GameState } from './Game';

interface GameUIProps {
  gameState: GameState;
  elapsedTime: number;
  onRestart: () => void;
}

export const GameUI: React.FC<GameUIProps> = ({ gameState, elapsedTime, onRestart }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-ui">
      {/* Timer - always visible during gameplay */}
      {gameState === 'playing' && (
        <div className="absolute top-6 left-6 pointer-events-none">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full pulse-glow"></div>
                <span className="text-xl font-mono font-bold text-primary">
                  {formatTime(elapsedTime)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Controls hint */}
      {gameState === 'playing' && (
        <div className="absolute bottom-6 left-6 pointer-events-none">
          <Card className="bg-card/60 backdrop-blur-sm border-secondary/20">
            <CardContent className="p-3">
              <div className="text-sm text-muted-foreground">
                <div className="font-semibold text-secondary mb-1">Controls:</div>
                <div>WASD / Arrow Keys to move</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameOver' && (
        <div className="game-overlay pointer-events-auto">
          <Card className="bg-card/95 backdrop-blur-md border-destructive/30 bounce-in max-w-md mx-4">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <h2 className="text-4xl font-bold text-destructive mb-2">Game Over</h2>
                <p className="text-muted-foreground">You fell off the track!</p>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-1">Time Survived:</div>
                <div className="text-2xl font-mono font-bold text-primary">
                  {formatTime(elapsedTime)}
                </div>
              </div>

              <Button 
                onClick={onRestart}
                className="w-full bg-gradient-cosmic hover:opacity-90 transition-opacity pulse-glow"
                size="lg"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Win Screen */}
      {gameState === 'won' && (
        <div className="game-overlay pointer-events-auto">
          <Card className="bg-card/95 backdrop-blur-md border-finish-success/30 bounce-in max-w-md mx-4">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <h2 className="text-4xl font-bold text-finish-success mb-2">You Win!</h2>
                <p className="text-muted-foreground">Congratulations! You reached the finish line!</p>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-1">Completion Time:</div>
                <div className="text-3xl font-mono font-bold text-finish-success">
                  {formatTime(elapsedTime)}
                </div>
              </div>

              <Button 
                onClick={onRestart}
                className="w-full bg-gradient-cosmic hover:opacity-90 transition-opacity pulse-glow"
                size="lg"
              >
                Play Again
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};