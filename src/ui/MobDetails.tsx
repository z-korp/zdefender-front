import { MobImages } from '@/assets/mobs/mobs';
import { SCALE } from '@/utils/grid';
import { MobCategory, MobType } from '@/utils/wave';
import { Container, Sprite } from '@pixi/react';
import { Text } from './base/Text';

interface MobDetailsProps {
  x: number;
  y: number;
  type: MobCategory;
  mob: MobType;
}

const MobDetails: React.FC<MobDetailsProps> = ({ x, y, type, mob }) => {
  const image = MobImages[mob];

  return (
    <Container x={x} y={y}>
      <Sprite anchor={0.5} key={`mob`} image={image} scale={SCALE} x={50} y={30} />
      <Text anchor={0.5} x={50} y={80} text={mob.toUpperCase()} />
    </Container>
  );
};

export default MobDetails;
