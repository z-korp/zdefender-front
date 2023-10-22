import { useElementStore } from '@/utils/store';
import waves, { MobCategory } from '@/utils/wave';
import { Container, Graphics, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import MobDetails from './MobDetails';

interface BestiaryMenuProps {
  x: number;
  y: number;
}

export const BestiaryMenu: React.FC<BestiaryMenuProps> = ({ x, y }) => {
  const { wave } = useElementStore((state) => state);

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

      <MobDetails x={10} y={40} type={MobCategory.NORMAL} mob={waves[wave - 1][MobCategory.NORMAL]} />
      <MobDetails x={110} y={40} type={MobCategory.ELITE} mob={waves[wave - 1][MobCategory.ELITE]} />
      <MobDetails x={210} y={40} type={MobCategory.BOSS} mob={waves[wave - 1][MobCategory.BOSS]} />
    </Container>
  );
};
