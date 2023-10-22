import { Container, Graphics, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { sound } from '@pixi/sound';
import { useEffect } from 'react';

interface SellButtonWithGoldProps {
  x: number;
  y: number;
  price: number;
  onClick: () => void;
  isDisabled?: boolean;
}

export const SellButtonWithGold: React.FC<SellButtonWithGoldProps> = ({ x, y, price, isDisabled, onClick }) => {
  const handlePointerDown = () => {
    onClick();
    sound.play('sell');
  };
  useEffect(() => {
    sound.add('sell', './assets/destroy.mp3');
  }, []);

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
        text="SELL"
        anchor={0.5}
        x={50} // Half of the button width to center the text
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
      {/*<GoldSmall x={62} y={12} number={price} />*/}
    </Container>
  );
};

// color="AEEA00"
