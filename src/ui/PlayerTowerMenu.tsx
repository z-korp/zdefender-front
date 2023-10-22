import { useElementStore } from '@/utils/store';
import { TowerCategory, towerData } from '@/utils/tower';
import { getComponentValue, getEntitiesWithValue } from '@latticexyz/recs';
import { Container, Graphics, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useEffect, useState } from 'react';
import { DefenderType } from './Defender';
import { SellButtonWithGold } from './SellButtonWithGold';
import { TowerAsset } from './TowerAsset';
import { UpgradeButtonWithGold } from './UpgradeButtonWithGold';
import { Text as TextHeader } from './base/Text';

interface PlayerTowerMenuProps {
  x: number;
  y: number;
  tower: any;
  onUpgrade: () => void;
  onSell: () => void;
  towerComponent: any;
}

export const PlayerTowerMenu: React.FC<PlayerTowerMenuProps> = ({ x, y, tower, onUpgrade, onSell, towerComponent }) => {
  const [type, setType] = useState<DefenderType | undefined>(undefined);
  console.log('tower', tower);

  const { total_gold } = useElementStore((state) => state);

  const t = getEntitiesWithValue(towerComponent, { id: tower.id });
  const tower_level = [...t].map((e) => getComponentValue(towerComponent, e)).map((obj) => obj.level)[0];

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

  if (tower === undefined) return null;

  const category = tower.category as TowerCategory;
  const data = towerData[category];

  return (
    <Container>
      <Graphics
        draw={(g) => {
          g.clear();
          g.lineStyle(2, 0xffffff); // 2 is the thickness of the line, 0xffffff is white color
          g.drawRect(x, y, 315, 192); // Adjust the rectangle dimensions and position as needed
        }}
      />
      <TextHeader text={`TOWER`} x={x + 100} y={y + 10} fontSize={22} />
      {type && (
        <>
          <TowerAsset x={x + 20} y={y + 70} type={type} />
          <Text
            text={`LVL: ${tower_level}`}
            x={x + 90}
            y={y + 60}
            style={
              new PIXI.TextStyle({
                align: 'center',
                fontFamily: '"Press Start 2P", Helvetica, sans-serif',
                fontSize: 10,
                fontWeight: '400',
                fill: '#ffffff',
              })
            }
          />
          <Text
            text={`Range:${data.range}`}
            x={x + 90}
            y={y + 80}
            style={
              new PIXI.TextStyle({
                align: 'center',
                fontFamily: '"Press Start 2P", Helvetica, sans-serif',
                fontSize: 10,
                fontWeight: '400',
                fill: '#ffffff',
              })
            }
          />
          <Text
            text={`Speed:${data.speed}`}
            x={x + 90}
            y={y + 100}
            style={
              new PIXI.TextStyle({
                align: 'center',
                fontFamily: '"Press Start 2P", Helvetica, sans-serif',
                fontSize: 10,
                fontWeight: '400',
                fill: '#ffffff',
              })
            }
          />
          <Text
            text={`Damage:${data.damage(tower_level)} -> ${data.damage(tower_level + 1)}`}
            x={x + 90}
            y={y + 120}
            style={
              new PIXI.TextStyle({
                align: 'center',
                fontFamily: '"Press Start 2P", Helvetica, sans-serif',
                fontSize: 10,
                fontWeight: '400',
                fill: '#ffffff',
              })
            }
          />
          <Text
            text={`Cooldown:${data.cooldown}`}
            x={x + 90}
            y={y + 140}
            style={
              new PIXI.TextStyle({
                align: 'center',
                fontFamily: '"Press Start 2P", Helvetica, sans-serif',
                fontSize: 10,
                fontWeight: '400',
                fill: '#ffffff',
              })
            }
          />
          <SellButtonWithGold x={x + 200} y={y + 50} price={16} onClick={onSell} />
          <UpgradeButtonWithGold
            x={x + 200}
            y={y + 85}
            price={data.price(tower_level)}
            onClick={onUpgrade}
            isDisabled={total_gold < data.price(tower_level)}
          />
        </>
      )}
    </Container>
  );
};
