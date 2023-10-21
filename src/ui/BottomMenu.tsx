import { Coordinate } from '@/types/GridElement';
import { Container } from '@pixi/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Button from './Button';
import { BuyButton } from './BuyButton';
import { CloseButton } from './CloseButton';
import { DefenderType } from './Defender';

interface BottomMenuProps {
  hoveredTile?: Coordinate;
  selectedTile?: Coordinate;
  setSelectedType: Dispatch<SetStateAction<DefenderType>>;
  isBuying: boolean;
  onClose: () => void;
  onBuy: (towerType: DefenderType, x: number, y: number) => void;
}

export const BottomMenu: React.FC<BottomMenuProps> = ({ hoveredTile, selectedTile, onClose, isBuying, onBuy }) => {
  const [isOpen, setIsOpen] = useState<boolean>(selectedTile !== undefined);

  const [selectedType, setSelectedType] = useState<DefenderType>('knight');
  const mobTypes = ['knight', 'bowman', 'wizard', 'barbarian'] as DefenderType[];

  const handleClick = (index: number) => {
    console.log('===================');
    console.log(mobTypes);
    console.log(index);
    setSelectedType(mobTypes[index]);
    console.log('Button Change Build idem!');
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
        {isBuying && selectedTile && (
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
