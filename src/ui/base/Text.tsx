import { Text as TextPixi } from '@pixi/react';
import * as PIXI from 'pixi.js';

interface TextProps {
  x: number;
  y: number;
  text: string;
  color?: string;
  fontSize?: number;
}

export const Text: React.FC<TextProps> = ({ x, y, text, color, fontSize }) => {
  return (
    <TextPixi
      text={text}
      x={x}
      y={y}
      style={
        new PIXI.TextStyle({
          align: 'center',
          fontFamily: '"Press Start 2P", Helvetica, sans-serif',
          fontSize: fontSize ? fontSize : 12,
          fontWeight: '400',
          fill: color ? color : '#ffffff',
        })
      }
    />
  );
};
