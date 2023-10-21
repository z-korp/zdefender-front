import { Container, Graphics, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';

interface BuyButtonProps {
  x: number;
  y: number;
  onClick: () => void;
}

export const BuyButton2: React.FC<BuyButtonProps> = ({ x, y, onClick }) => {
  const handlePointerDown = () => {
    onClick();
  };

  return (
    <Container x={x} y={y}>
      <Graphics
        interactive={true}
        draw={(graphics) => {
          graphics.clear();
          graphics.beginFill(0x0099ff); // Fill color
          graphics.lineStyle(1, 0xffffff); // Border color
          graphics.drawRect(0, 0, 50, 25); // Smaller rectangle dimensions
          graphics.endFill();
        }}
        pointerdown={handlePointerDown}
      />
      <Text
        text="BUY"
        anchor={{ x: 0.5, y: 0.5 }}
        x={25} // Half of the button width to center the text
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
