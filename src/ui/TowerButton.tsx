import { defenderTypes } from '@/utils/defender';
import { useElementStore } from '@/utils/store';
import { TowerCategory, towerData } from '@/utils/tower';
import { Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import React, { useEffect } from 'react';
import barbarian_transparent from '../assets/barbarian_transparent.png';
import bowman_transparent from '../assets/bowman_transparent.png';
import tower from '../assets/tower.png';
import wizard_transparent from '../assets/wizard_transparent.png';
import { BuyButtonWithGold } from './BuyButtonWithGold';
import { CancelButton } from './CancelButton';
import { TowerAsset } from './TowerAsset';

interface TowerButtonProps {
  onClick: () => void;
  x: number;
  y: number;
  category: TowerCategory;
}

const TowerButton: React.FC<TowerButtonProps> = ({ onClick, x, y, category }) => {
  const image =
    category === TowerCategory.BARBARIAN
      ? barbarian_transparent
      : category === TowerCategory.BOWMAN
      ? bowman_transparent
      : wizard_transparent;
  PIXI.Texture.from(image).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  PIXI.Texture.from(tower).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  const { price, damage, range } = towerData[category];

  const [isBuying, setIsBuying] = React.useState(false);

  const { set_is_building, is_building, selectedType, total_gold } = useElementStore((state) => state);

  useEffect(() => {
    if (!is_building) {
      setIsBuying(false);
    }
  }, [is_building]);

  useEffect(() => {
    if (selectedType !== defenderTypes[category]) {
      setIsBuying(false);
    }
  }, [category, selectedType]);

  return (
    <>
      <TowerAsset type={defenderTypes[category]} x={x - 5} y={y} />
      <Text
        text={category === TowerCategory.BARBARIAN ? 'BARBAR' : category === TowerCategory.BOWMAN ? 'BOWMAN' : 'WIZARD'}
        x={x + 70}
        y={y + 2}
        style={
          new PIXI.TextStyle({
            align: 'center',
            fontFamily: '"Press Start 2P", Helvetica, sans-serif',
            fontSize: 20,
            fontWeight: '400',
            fill: '#ffffff',
          })
        }
      />
      <Text
        text={`Damage: ${damage(1)}`}
        x={x + 70}
        y={y + 28}
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
        text={`Range:  ${range}`}
        x={x + 70}
        y={y + 43}
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

      <BuyButtonWithGold
        x={x + 200}
        y={y}
        isDisabled={isBuying || total_gold < price(1)}
        onClick={() => {
          setIsBuying(true);
          set_is_building(true);
          onClick();
        }}
        price={price(1)}
      />
      {isBuying && (
        <CancelButton
          x={x + 200}
          y={y}
          onClick={() => {
            setIsBuying(false);
            set_is_building(false);
          }}
        />
      )}
    </>
  );
};

export default TowerButton;
