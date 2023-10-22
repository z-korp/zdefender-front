import { MobCategory, MobType } from '@/utils/wave';
import { Container, Sprite } from '@pixi/react';
import * as PIXI from 'pixi.js';
import barbarian_transparent from '../assets/barbarian_transparent.png';
import { Text } from './base/Text';

interface MobDetailsProps {
  x: number;
  y: number;
  type: MobCategory;
  mob: MobType;
}

const MobDetails: React.FC<MobDetailsProps> = ({ x, y, type, mob }) => {
  PIXI.Texture.from(barbarian_transparent).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  return (
    <Container x={x} y={y}>
      <Sprite key={`mob`} image={barbarian_transparent} scale={0.75} x={0} y={0} />
      <Text x={x + 10} y={y + 10} text="test" />
    </Container>
  );
};

export default MobDetails;
