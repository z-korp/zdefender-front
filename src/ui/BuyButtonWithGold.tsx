import { Container, Graphics, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import GoldSmall from './GoldSmall';

interface BuyButtonWithGoldProps {
  x: number;
  y: number;
  price: number;
  onClick: () => void;
  isDisabled?: boolean;
}

export const BuyButtonWithGold: React.FC<BuyButtonWithGoldProps> = ({ x, y, price, isDisabled, onClick }) => {
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
          graphics.drawRect(0, 0, 100, 25); // Smaller rectangle dimensions
          graphics.endFill();
        }}
        pointerdown={handlePointerDown}
      />
      <Text
        text="BUY"
        anchor={0.5}
        x={25} // Half of the button width to center the text
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
      <GoldSmall x={55} y={12} number={price} />
    </Container>
  );
};
