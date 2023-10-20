import { Sprite, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import gold from '../assets/gold.png';

interface GoldProps {
  number: number;
  x: number;
  y: number;
}

const Gold: React.FC<GoldProps> = ({ number, x, y }) => {
  PIXI.Texture.from(gold).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  return (
    <>
      <Sprite key={`sword`} image={gold} anchor={0.5} scale={1.5} x={x} y={y} />
      <Text
        text={`${number}`}
        x={x + 20}
        y={y - 10}
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
    </>
  );
};

export default Gold;
