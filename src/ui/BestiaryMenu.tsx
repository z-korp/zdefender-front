import { defenderTypes } from '@/utils/defender';
import { useElementStore } from '@/utils/store';
import { MobCategory, MobType } from '@/utils/wave';
import { Container, Graphics, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import MobDetails from './MobDetails';

interface BestiaryMenuProps {
  x: number;
  y: number;
}

export const BestiaryMenu: React.FC<BestiaryMenuProps> = ({ x, y }) => {
  const { setSelectedType } = useElementStore((state) => state);

  const handleClick = (index: number) => {
    setSelectedType(defenderTypes[index]);
  };

  return (
    <Container x={x} y={y}>
      <Graphics
        draw={(g) => {
          g.clear();
          g.lineStyle(2, 0xffffff);
          g.drawRect(0, 0, 315, 310); // Adjust based on the container's position
        }}
      />
      <Text
        text="MOBS"
        x={120}
        y={10}
        style={
          new PIXI.TextStyle({
            align: 'center',
            fontFamily: '"Press Start 2P", Helvetica, sans-serif',
            fontSize: 22,
            fontWeight: '400',
            fill: '#ffffff',
          })
        }
      />
      <MobDetails x={10} y={40} type={MobCategory.NORMAL} mob={MobType.CHICKEN} />
      <MobDetails x={110} y={40} type={MobCategory.ELITE} mob={MobType.BOAR} />
      <MobDetails x={210} y={40} type={MobCategory.BOSS} mob={MobType.MAMMOTH} />
    </Container>
  );
};
