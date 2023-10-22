import { MobImages } from '@/assets/mobs/mobs';
import { baseMobCharacteristic } from '@/utils/bestiary';
import { SCALE } from '@/utils/grid';
import { useElementStore } from '@/utils/store';
import { MobCategory, MobType } from '@/utils/wave';
import { Container, Sprite } from '@pixi/react';
import * as PIXI from 'pixi.js';
import armor from '../assets/armor.png';
import boots from '../assets/boots.png';
import hearth from '../assets/heart.png';
import { Text } from './base/Text';

interface MobDetailsProps {
  x: number;
  y: number;
  type: MobCategory;
  mob: MobType;
}

const MobDetails: React.FC<MobDetailsProps> = ({ x, y, type, mob }) => {
  const image = MobImages[mob];
  const mobData = baseMobCharacteristic[type];
  const { wave } = useElementStore();
  const armorIcon = armor;
  const bootsIcon = boots;
  PIXI.Texture.from(image).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  PIXI.Texture.from(bootsIcon).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  PIXI.Texture.from(armorIcon).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  const healthText = mobData.health(wave).toString();
  const heartIconXPosition = mobData.health(wave) > 999 ? 10 : 15;

  return (
    <Container x={x} y={y}>
      <Sprite anchor={0.5} key={`mob`} image={image} scale={SCALE} x={50} y={30} />
      <Text anchor={0.5} x={50} y={80} text={mob.toUpperCase()} />
      <Text anchor={0.5} x={50} y={100} text={''} />
      {/* <Sprite anchor={0.5} image={hearth} x={15} y={120} /> */}
      <Sprite anchor={0.5} image={hearth} x={heartIconXPosition} y={120} />

      <Text anchor={0.5} x={45} y={120} text={mobData.health(wave).toString()} />
      {/* <i className="fa fa-volume-up"></i> */}
      <Text anchor={0.5} x={50} y={140} text={mobData.speed(wave).toString()} />
      <Sprite anchor={0.5} image={bootsIcon} x={30} y={140} />

      <Text anchor={0.5} x={50} y={160} text={mobData.armor(wave).toString()} />
      <Sprite anchor={0.5} image={armorIcon} x={30} y={160} />
    </Container>
  );
};

export default MobDetails;
