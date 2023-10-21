import { SCALE } from '@/utils/grid';
import { useElementStore } from '@/utils/store';
import { Sprite } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useEffect, useState } from 'react';
import barbarian_transparent from '../assets/barbarian_transparent.png';
import bowman_transparent from '../assets/bowman_transparent.png';
import tower from '../assets/tower.png';
import wizard_transparent from '../assets/wizard_transparent.png';

interface TowerButtonProps {
  x: number;
  y: number;
}

//TODO: rename to TowerAsset
export const TowerButton: React.FC<TowerButtonProps> = ({ x, y }) => {
  const [imageState, setImageState] = useState<any>(barbarian_transparent);
  PIXI.Texture.from(tower).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  const { selectedType } = useElementStore((state) => state);
  useEffect(() => {
    setImageState(
      selectedType === 'barbarian'
        ? barbarian_transparent
        : selectedType === 'bowman'
        ? bowman_transparent
        : wizard_transparent
    );
  }, [selectedType]);

  return (
    <>
      <Sprite scale={SCALE} image={tower} x={x} y={y - 33} />
      <Sprite scale={SCALE - 1} image={imageState} x={x - 16} y={y - 78} />
    </>
  );
};
