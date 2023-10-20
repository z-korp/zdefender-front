import { Container, Text } from '@pixi/react';
import Button from './Button';
import { Coordinate } from '@/types/GridElement';
import * as PIXI from 'pixi.js';
import { CloseButton } from './CloseButton';
import { useEffect, useState } from 'react';

interface BottomMenuProps {
  hoveredTile?: Coordinate;
  selectedTile?: Coordinate;
  onClose: () => void;
}

export const BottomMenu: React.FC<BottomMenuProps> = ({ hoveredTile, selectedTile, onClose }) => {
  const [isOpen, setIsOpen] = useState<boolean>(selectedTile !== undefined);
  const handleClick = () => {
    console.log(selectedTile);
    console.log('Button clicked!');
  };
  useEffect(() => {
    console.log('selectedTile', selectedTile);
    setIsOpen(selectedTile !== undefined);
  }, [selectedTile]);

  const handleClose = () => {
    console.log('Close button clicked!');
    onClose();
  };

  return (
    isOpen && (
      <Container>
        <CloseButton x={800} y={85} onClick={handleClose} />
        <Button x={800} y={85} onClick={handleClick} index={0} price={50} />
        <Button x={800} y={85 * 2} onClick={handleClick} index={1} price={50} />
        <Button x={800} y={85 * 3} onClick={handleClick} index={2} price={50} />
      </Container>
    )
  );
};
