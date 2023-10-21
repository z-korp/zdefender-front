import { Container, Sprite, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import UI_Flat_Checkmark_Large from '../assets/Complete_GUI/UI_Flat_Checkmark_Large.png';
interface BuyButtonProps {
  onClick: () => void;
  x: number;
  y: number;
}

export const BuyButton: React.FC<BuyButtonProps> = ({ onClick, x, y }) => {
  const image = UI_Flat_Checkmark_Large;
  PIXI.Texture.from(image).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  const handleClick = () => {
    console.log('BUY ICI');
    onClick();
  };

  return (
    <Container interactive={true} pointerdown={handleClick}>
      <Sprite image={image} scale={3} x={x + 30} y={y - 100} anchor={new PIXI.Point(0, 0)} />
      <Text
        text="Buy"
        x={x + 10}
        y={y - 65} // Ajustez la position y pour centrer le texte par rapport au bouton
        style={
          new PIXI.TextStyle({
            fontFamily: 'Arial', // Ajustez la police selon vos préférences
            fontSize: 24, // Taille du texte
            fill: '#ffffff', // Couleur du texte
          })
        }
      />
    </Container>
  );
};
