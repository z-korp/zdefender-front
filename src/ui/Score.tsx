import { Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import React from 'react';
import heart from '../assets/heart.png';

interface ScoreProps {
  score: number;
  x: number;
  y: number;
}

const Score: React.FC<ScoreProps> = ({ score, x, y }) => {
  PIXI.Texture.from(heart).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  return (
    <Text
      text={`SCORE: ${score}`}
      x={x}
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
  );
};

export default Score;
