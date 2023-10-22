import { defenderTypes } from '@/utils/defender';
import { useElementStore } from '@/utils/store';
import { TowerCategory } from '@/utils/tower';
import { Container, Graphics, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import TowerButton from './TowerButton';

interface BuyTowerMenuProps {
  x: number;
  y: number;
}

export const BuyTowerMenu: React.FC<BuyTowerMenuProps> = ({ x, y }) => {
  const { setSelectedType } = useElementStore((state) => state);

  const handleClick = (index: number) => {
    setSelectedType(defenderTypes[index]);
  };

  return (
    <Container>
      <Graphics
        draw={(g) => {
          g.clear();
          g.lineStyle(2, 0xffffff); // 2 is the thickness of the line, 0xffffff is white color
          g.drawRect(x, y, 315, 310); // Adjust the rectangle dimensions and position as needed
        }}
      />
      <Text
        text="SHOP"
        x={x + 120}
        y={y + 10}
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
      <TowerButton
        x={x + 20}
        y={y + 55}
        onClick={() => handleClick(TowerCategory.BARBARIAN)}
        category={TowerCategory.BARBARIAN}
      />
      <TowerButton
        x={x + 20}
        y={y + 145}
        onClick={() => handleClick(TowerCategory.BOWMAN)}
        category={TowerCategory.BOWMAN}
      />
      <TowerButton
        x={x + 20}
        y={y + 235}
        onClick={() => handleClick(TowerCategory.WIZARD)}
        category={TowerCategory.WIZARD}
      />
    </Container>
  );
};
