import { Sprite } from '@pixi/react';
import * as PIXI from 'pixi.js';
import React from 'react';
import heart from '../assets/heart.png';

interface LifeProps {
  health: number;
}

const Life: React.FC<LifeProps> = ({ health }) => {
  PIXI.Texture.from(heart).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  return (
    <>
      {Array.from({ length: health as number }).map((_, i) => {
        return <Sprite key={`heart-${i}`} image={heart} anchor={0.5} scale={1.5} x={1100 - i * 30} y={20} />;
      })}
    </>
  );
};

export default Life;
