import { Coordinate } from '@/types/GridElement';
import { useElementStore } from '@/utils/store';
import { Container, Graphics, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useState } from 'react';
import Button from './Button';
import { BuyButton } from './BuyButton';
import { DefenderType } from './Defender';

interface BottomMenuProps {
  hoveredTile?: Coordinate;
  selectedTile?: Coordinate;
  isBuying: boolean;
  onClose: () => void;
  onBuy: (towerType: DefenderType, x: number, y: number) => void;
}

export const BottomMenu: React.FC<BottomMenuProps> = ({ selectedTile, onClose, isBuying, onBuy }) => {
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
            g.drawRect(870, 0, 315, 85 * 3 + 80); // Adjust the rectangle dimensions and position as needed
          }}
        />
        <Text
          text={`TOWERS`}
          x={970}
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
        {isBuying && selectedTile && selectedType && (
          <BuyButton x={1000} y={85} onClick={() => onBuy(selectedType, selectedTile?.x, selectedTile?.y)} />
        )}
        {/*<CloseButton x={900} y={85} onClick={handleClose} />*/}
        <Button x={900} y={85} onClick={() => handleClick(0)} index={0} price={50} />
        <Button x={900} y={85 * 2} onClick={() => handleClick(1)} index={1} price={50} />
        <Button x={900} y={85 * 3} onClick={() => handleClick(2)} index={2} price={50} />
      </Container>
    )
  );
};
