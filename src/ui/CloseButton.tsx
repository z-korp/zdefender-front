import { Container, Sprite } from '@pixi/react';
import * as PIXI from 'pixi.js';
import UI_FLAT_CROSS_LARGE from '../assets/Complete_GUI/UI_Flat_Cross_Large.png';
interface CloseButtonProps {
  onClick: () => void;
  x: number;
  y: number;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick, x, y }) => {
  const image = UI_FLAT_CROSS_LARGE;
  PIXI.Texture.from(image).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  const handleClick = () => {
    onClick();
  };

  return (
    <Container>
      <Sprite
        image={image}
        interactive={true}
        scale={3}
        pointerdown={handleClick}
        x={x - 20}
        y={y - 100}
        anchor={new PIXI.Point(0, 0)}
      />
    </Container>
  );
};
