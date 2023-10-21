import { Coordinate } from '@/types/GridElement';
import { Container } from '@pixi/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Button from './Button';
import { BuyButton } from './BuyButton';
import { CloseButton } from './CloseButton';
import { DefenderType } from './Defender';
import { useElementStore } from '@/utils/store';

interface BottomMenuProps {
  hoveredTile?: Coordinate;
  selectedTile?: Coordinate;
  isBuying: boolean;
  onClose: () => void;
  onBuy: (towerType: DefenderType, x: number, y: number) => void;
}

export const BottomMenu: React.FC<BottomMenuProps> = ({ selectedTile, onClose, isBuying, onBuy }) => {
  const [isOpen, setIsOpen] = useState<boolean>(selectedTile !== undefined);
  const { selectedType, setSelectedType } = useElementStore((state) => state);

  const defenderTypes = ['barbarian', 'bowman', 'wizard'] as DefenderType[];

  const handleClick = (index: number) => {
    setSelectedType(defenderTypes[index]);
  };
  useEffect(() => {
    setIsOpen(selectedTile !== undefined);
  }, [selectedTile]);

  const handleClose = () => {
    console.log('Close');
    setIsOpen(false);
    console.log('Close');
    onClose();
  };

  return (
    isOpen && (
      <Container>
        {isBuying && selectedTile && selectedType && (
          <BuyButton x={1000} y={85} onClick={() => onBuy(selectedType, selectedTile?.x, selectedTile?.y)} />
        )}
        <CloseButton x={900} y={85} onClick={handleClose} />
        <Button x={900} y={85} onClick={() => handleClick(0)} index={0} price={50} />
        <Button x={900} y={85 * 2} onClick={() => handleClick(1)} index={1} price={50} />
        <Button x={900} y={85 * 3} onClick={() => handleClick(2)} index={2} price={50} />
      </Container>
    )
  );
};
