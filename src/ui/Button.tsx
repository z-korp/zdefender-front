import React from 'react';
import * as PIXI from 'pixi.js';
import { Sprite } from '@pixi/react';
import tower from '../assets/tower.png';
import knight from '../assets/knight.png';
import { SCALE } from './Map';
import barbarian_transparent from '../assets/barbarian_transparent.png';
import bowman_transparent from '../assets/bowman_transparent.png';
import wizard_transparent from '../assets/wizard_transparent.png';

interface ButtonProps {
  onClick: () => void;
  x: number;
  y: number;
  index: number;
}

const Button: React.FC<ButtonProps> = ({ onClick, x, y, index }) => {
  const image = index === 0 ? barbarian_transparent : index === 1 ? bowman_transparent : wizard_transparent;
  PIXI.Texture.from(image).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

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
        image={image}
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
