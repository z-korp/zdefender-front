import { Sprite, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import React from 'react';
import barbarian_transparent from '../assets/barbarian_transparent.png';
import bowman_transparent from '../assets/bowman_transparent.png';
import tower from '../assets/tower.png';
import wizard_transparent from '../assets/wizard_transparent.png';
import Gold from './Gold';
import { SCALE } from '@/utils/grid';

interface ButtonProps {
  onClick: () => void;
  x: number;
  y: number;
  index: number;
  price: number;
}

const Button: React.FC<ButtonProps> = ({ onClick, x, y, index, price }) => {
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
      <Text
        text={index === 0 ? 'BARBARIAN' : index === 1 ? 'BOWMAN' : 'WIZARD'}
        x={x + 80}
        y={y}
        style={
          new PIXI.TextStyle({
            align: 'center',
            fontFamily: '"Press Start 2P", Helvetica, sans-serif',
            fontSize: 20,
            fontWeight: '400',
            fill: '#ffffff',
          })
        }
      />
      <Gold number={10} x={x + 90} y={y + 40} />
    </>
  );
};

export default Button;
