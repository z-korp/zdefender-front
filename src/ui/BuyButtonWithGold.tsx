import { Container, Graphics, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import Gold from './Gold';

interface BuyButtonWithGoldProps {
  x: number;
  y: number;
  price: number;
  onClick: () => void;
}

export const BuyButtonWithGold: React.FC<BuyButtonWithGoldProps> = ({ x, y, price, onClick }) => {
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
          graphics.drawRect(0, 0, 100, 25); // Smaller rectangle dimensions
          graphics.endFill();
        }}
        pointerdown={handlePointerDown}
      />
      <Text
        text="BUY"
        anchor={0.5}
        x={50} // Half of the button width to center the text
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
      <Gold x={10} y={10} number={price} />
    </Container>
  );
};
