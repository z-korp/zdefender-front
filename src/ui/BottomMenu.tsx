import { Container, Text } from '@pixi/react';
import Button from './Button';
import { Coordinate } from '@/types/GridElement';
import * as PIXI from 'pixi.js';

interface BottomMenuProps {
  hoveredTile?: Coordinate;
  selectedTile?: Coordinate;
}

export const BottomMenu: React.FC<BottomMenuProps> = ({ hoveredTile, selectedTile }) => {
  const handleClick = () => {
    console.log(selectedTile);
    console.log('Button clicked!');
  };

  return (
    selectedTile && (
      <Container>
        <Button x={800} y={85} onClick={handleClick} index={0} />
        <Button x={800} y={85 * 2} onClick={handleClick} index={1} />
        <Button x={800} y={85 * 3} onClick={handleClick} index={2} />
      </Container>
    )
  );
};
