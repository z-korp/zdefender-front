import { Container, Graphics, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';

interface BuyButtonProps {
  x: number;
  y: number;
  onClick: () => void;
}

export const CancelButton: React.FC<BuyButtonProps> = ({ x, y, onClick }) => {
  const handlePointerDown = () => {
    onClick();
  };

  return (
    <Container x={x} y={y}>
      <Graphics
        interactive={true}
        draw={(graphics) => {
          graphics.clear();
          graphics.beginFill(0x000000); // Fill color
          graphics.lineStyle(1, 0xffffff); // Border color
          graphics.drawRect(0, 0, 80, 25); // Smaller rectangle dimensions
          graphics.endFill();
        }}
        pointerdown={handlePointerDown}
      />
      <Text
        text="CANCEL"
        anchor={0.5}
        x={40} // Half of the button width to center the text
        y={12.5} // Half of the button height to center the text
        style={
          new PIXI.TextStyle({
            align: 'center',
            fontFamily: '"Press Start 2P", Helvetica, sans-serif',
            fontSize: 10, // Smaller font size
            fontWeight: '400',
            fill: '#ffffff',
          })
        }
      />
    </Container>
  );
};
