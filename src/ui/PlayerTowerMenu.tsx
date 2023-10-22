import { TowerCategory } from '@/utils/tower';
import { Container, Graphics } from '@pixi/react';
import { useEffect, useState } from 'react';
import { DefenderType } from './Defender';
import { TowerAsset } from './TowerAsset';
import { Button } from './base/Button';
import { Text } from './base/Text';

interface PlayerTowerMenuProps {
  x: number;
  y: number;
  tower: any;
}

export const PlayerTowerMenu: React.FC<PlayerTowerMenuProps> = ({ x, y, tower }) => {
  console.log(tower);

  const [type, setType] = useState<DefenderType | undefined>(undefined);

  useEffect(() => {
    if (tower && tower.category !== undefined) {
      const type =
        tower.category === TowerCategory.BARBARIAN
          ? 'barbarian'
          : tower.category === TowerCategory.BOWMAN
          ? 'bowman'
          : tower.category === TowerCategory.WIZARD
          ? 'wizard'
          : 'knight';
      setType(type);
    }
  }, [tower]);

  return (
    <Container>
      <Graphics
        draw={(g) => {
          g.clear();
          g.lineStyle(2, 0xffffff); // 2 is the thickness of the line, 0xffffff is white color
          g.drawRect(x, y, 315, 162); // Adjust the rectangle dimensions and position as needed
        }}
      />
      <Text text={`TOWER`} x={x + 100} y={y + 10} fontSize={22} />
      {type && (
        <>
          <TowerAsset x={x + 20} y={y + 70} type={type} />
          <Text text={`LVL ${tower.level}`} x={x + 120} y={y + 112} fontSize={12} />
          <Button x={x + 200} y={y + 70} text="SELL" onClick={() => console.log('sell')} />
          <Button x={x + 200} y={y + 105} text="UPGRADE" onClick={() => console.log('upgrade')} />
        </>
      )}
    </Container>
  );
};
