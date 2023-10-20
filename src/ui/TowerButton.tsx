import { SCALE } from '@/utils/grid';
import { Sprite } from '@pixi/react';
import { MobType } from './Mob';
import barbarian_transparent from '../assets/barbarian_transparent.png';
import bowman_transparent from '../assets/bowman_transparent.png';
import tower from '../assets/tower.png';
import wizard_transparent from '../assets/wizard_transparent.png';

interface TowerButtonProps {
  x: number;
  y: number;
  onClick: () => void;
  selected?: boolean;
  selectedType?: MobType;
}

export const TowerButton: React.FC<TowerButtonProps> = ({ x, y, onClick, selectedType, selected = false }) => {
  const image =
    selectedType === 'barbarian'
      ? barbarian_transparent
      : selectedType === 'bowman'
      ? bowman_transparent
      : wizard_transparent;

  return (
    <>
      <Sprite scale={SCALE} image={tower} anchor={0.5} x={x} y={y - 33} interactive={true} pointerdown={onClick} />
      <Sprite
        scale={SCALE - 1}
        image={image}
        anchor={0.5}
        x={x}
        y={y - 33 - 15}
        interactive={true}
        pointerdown={onClick}
      />
    </>
  );
};
