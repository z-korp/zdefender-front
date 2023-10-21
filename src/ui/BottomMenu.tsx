import { Coordinate } from '@/types/GridElement';
import { Container } from '@pixi/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Button from './Button';
import { CloseButton } from './CloseButton';
import { MobType } from './Mob';
import { BuyButton } from './BuyButton';

interface BottomMenuProps {
  hoveredTile?: Coordinate;
  selectedTile?: Coordinate;
  setSelectedType: Dispatch<SetStateAction<MobType>>;
  isBuying: boolean;
  onClose: () => void;
}

export const BottomMenu: React.FC<BottomMenuProps> = ({ hoveredTile, selectedTile, onClose, isBuying }) => {
  const [isOpen, setIsOpen] = useState<boolean>(selectedTile !== undefined);

  const [selectedType, setSelectedType] = useState<MobType>('knight');
  const mobTypes = ['knight', 'bowman', 'wizard', 'barbarian'] as MobType[];

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
  const handleBuy = () => {
    console.log('Buy');
    console.log(selectedType);
  };

  return (
    isOpen && (
      <Container>
        {isBuying && <BuyButton x={1000} y={85} onClick={() => handleBuy()} />}
        <CloseButton x={900} y={85} onClick={handleClose} />
        <Button x={900} y={85} onClick={() => handleClick(0)} index={0} price={50} />
        <Button x={900} y={85 * 2} onClick={() => handleClick(1)} index={1} price={50} />
        <Button x={900} y={85 * 3} onClick={() => handleClick(2)} index={2} price={50} />
      </Container>
    )
  );
};
