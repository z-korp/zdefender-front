import { Coordinate } from '@/types/GridElement';
import { useElementStore } from '@/utils/store';
import { TowerCategory, towerData } from '@/utils/tower';
import { Container, Graphics, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useState } from 'react';
import Button from './Button';
import { BuyButton } from './BuyButton';
import { DefenderType } from './Defender';

interface BottomMenuProps {
  x: number;
  y: number;
  hoveredTile?: Coordinate;
  selectedTile?: Coordinate;
  isBuying: boolean;
  onClose: () => void;
  onBuy: (towerType: DefenderType, x: number, y: number) => void;
}

export const BottomMenu: React.FC<BottomMenuProps> = ({ x, y, selectedTile, onClose, isBuying, onBuy }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { selectedType, setSelectedType } = useElementStore((state) => state);

  const defenderTypes = ['barbarian', 'bowman', 'wizard'] as DefenderType[];

  const handleClick = (index: number) => {
    setSelectedType(defenderTypes[index]);
  };

  const handleClose = () => {
    console.log('Close');
    setIsOpen(false);
    console.log('Close');
    onClose();
  };

  return (
    isOpen && (
      <Container>
        <Graphics
          draw={(g) => {
            g.clear();
            g.lineStyle(2, 0xffffff); // 2 is the thickness of the line, 0xffffff is white color
            g.drawRect(x, y, 315, 85 * 3 + 80); // Adjust the rectangle dimensions and position as needed
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
        {isBuying && selectedTile && selectedType && (
          <BuyButton x={1000} y={85} onClick={() => onBuy(selectedType, selectedTile?.x, selectedTile?.y)} />
        )}
        {/*<CloseButton x={900} y={85} onClick={handleClose} />*/}
        <Button
          x={900}
          y={85}
          onClick={() => handleClick(TowerCategory.BARBARIAN)}
          index={TowerCategory.BARBARIAN}
          price={towerData[TowerCategory.BARBARIAN].basePrice}
        />
        <Button
          x={900}
          y={85 * 2}
          onClick={() => handleClick(TowerCategory.BOWMAN)}
          index={TowerCategory.BOWMAN}
          price={towerData[TowerCategory.BOWMAN].basePrice}
        />
        <Button
          x={900}
          y={85 * 3}
          onClick={() => handleClick(TowerCategory.WIZARD)}
          index={TowerCategory.WIZARD}
          price={towerData[TowerCategory.WIZARD].basePrice}
        />
      </Container>
    )
  );
};
