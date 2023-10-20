import { Container, Text } from '@pixi/react';
import Button from './Button';
import { Coordinate } from '@/types/GridElement';
import * as PIXI from 'pixi.js';
import { CloseButton } from './CloseButton';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MobType } from './Mob';

interface BottomMenuProps {
  hoveredTile?: Coordinate;
  selectedTile?: Coordinate;
  setSelectedType: Dispatch<SetStateAction<MobType>>;
  onClose: () => void;
}

export const BottomMenu: React.FC<BottomMenuProps> = ({ hoveredTile, selectedTile, setSelectedType, onClose }) => {
  const [isOpen, setIsOpen] = useState<boolean>(selectedTile !== undefined);

  const mobTypes = ['knight', 'bowman', 'wizard', 'barbarian'] as MobType[];

  const handleClick = (index: number) => {
    console.log('===================');
    console.log(mobTypes);
    console.log(index);
    setSelectedType(mobTypes[index]);
    console.log('Button Change Build idem!');
  };
  useEffect(() => {
    console.log('selectedTile', selectedTile);
    setIsOpen(selectedTile !== undefined);
  }, [selectedTile]);

  const handleClose = () => {
    onClose();
  };

  return (
    isOpen && (
      <Container>
        <CloseButton x={800} y={85} onClick={handleClose} />
        <Button x={800} y={85} onClick={() => handleClick(0)} index={0} price={50} />
        <Button x={800} y={85 * 2} onClick={() => handleClick(1)} index={1} price={50} />
        <Button x={800} y={85 * 3} onClick={() => handleClick(2)} index={2} price={50} />
      </Container>
    )
  );
};
