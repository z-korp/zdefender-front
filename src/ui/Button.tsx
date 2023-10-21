import { SCALE } from '@/utils/grid';
import { Sprite, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import React from 'react';
import barbarian_transparent from '../assets/barbarian_transparent.png';
import bowman_transparent from '../assets/bowman_transparent.png';
import tower from '../assets/tower.png';
import wizard_transparent from '../assets/wizard_transparent.png';
import { BuyButton2 } from './BuyButton2';
import Gold from './Gold';

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
  PIXI.Texture.from(tower).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

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
      <Gold number={price} x={x + 90} y={y + 40} />
      <BuyButton2 x={x + 170} y={y + 28} onClick={() => console.log('9')} />
    </>
  );
};

export default Button;
