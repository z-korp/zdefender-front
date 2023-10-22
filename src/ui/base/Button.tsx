import { Container, Graphics, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';

interface ButtonProps {
  x: number;
  y: number;
  text: string;
  isDisabled?: boolean;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ x, y, text, onClick, isDisabled }) => {
  const handlePointerDown = () => {
    if (!isDisabled) onClick();
  };

  return (
    <Container x={x} y={y}>
      <Graphics
        interactive={true}
        draw={(graphics) => {
          graphics.clear();
          graphics.beginFill(isDisabled ? 0x99b3c2 : 0x0099ff); // Fill color
          graphics.lineStyle(1, !isDisabled ? '#ffffff' : '#f0f0f0'); // Border color
          graphics.drawRect(0, 0, 80, 25); // Smaller rectangle dimensions
          graphics.endFill();
        }}
        pointerdown={handlePointerDown}
      />
      <Text
        text={text}
        anchor={0.5}
        x={40} // Half of the button width to center the text
        y={12.5} // Half of the button height to center the text
        style={
          new PIXI.TextStyle({
            align: 'center',
            fontFamily: '"Press Start 2P", Helvetica, sans-serif',
            fontSize: 10, // Smaller font size
            fontWeight: '400',
            fill: !isDisabled ? '#ffffff' : '#f0f0f0',
          })
        }
      />
    </Container>
  );
};
