import { Sprite } from '@pixi/react';
import * as PIXI from 'pixi.js';
import React from 'react';
import heart from '../assets/heart.png';

interface LifeProps {
  health: number;
  x: number;
  y: number;
}

const Life: React.FC<LifeProps> = ({ health, x, y }) => {
  PIXI.Texture.from(heart).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  return (
    <>
      {Array.from({ length: health as number }).map((_, i) => {
        return <Sprite key={`heart-${i}`} image={heart} anchor={0.5} scale={1.5} x={x + i * 30} y={y} />;
      })}
    </>
  );
};

export default Life;
