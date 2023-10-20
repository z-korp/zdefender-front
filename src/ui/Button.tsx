import React from 'react';
import * as PIXI from 'pixi.js';
import { Sprite } from '@pixi/react';
import tower from '../assets/tower.png';
import knight from '../assets/knight.png';
import { SCALE } from './Map';

interface ButtonProps {
  onClick: () => void;
  x: number;
  y: number;
}

const Button: React.FC<ButtonProps> = ({ onClick, x, y }) => {
  PIXI.Texture.from(knight).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  const handleClick = () => {
    onClick();
  };

  return (
    <>
      <Sprite
        scale={SCALE}
        image={tower}
        x={x}
        y={y}
        interactive={true}
        pointerdown={() => {
          onClick();
          console.log('Sprite was clicked!');
        }}
      />
      <Sprite
        scale={SCALE - 1}
        image={knight}
        anchor={0.33}
        x={x + 15}
        y={y - 15}
        interactive={true}
        pointerdown={() => {
          onClick();
          console.log('Sprite was clicked!');
        }}
      />
    </>
  );
};

export default Button;
