import { H_OFFSET } from '@/utils/grid';
import { Sprite } from '@pixi/react';
import * as PIXI from 'pixi.js';
import tower from '../assets/tower.png';
import { Coordinate } from '../types/GridElement';
import { SCALE } from './Map';
import Mob, { MobType } from './Mob';

interface TowerProps {
  type: MobType;
  targetPosition: Coordinate;
  isHovered: boolean;
  isHitter: boolean;
  knightPosition?: Coordinate;
  hitPosition?: Coordinate;
}

const Tower: React.FC<TowerProps> = ({ type, targetPosition, isHovered, isHitter, knightPosition, hitPosition }) => {
  PIXI.Texture.from(tower).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  console.log(targetPosition);

  return (
    <>
      <Sprite
        image={tower}
        scale={SCALE}
        anchor={0.5}
        x={H_OFFSET + targetPosition.x * 16 * SCALE}
        y={targetPosition.y * 16 * SCALE}
      />
      <Mob
        type={type}
        targetPosition={targetPosition}
        isHovered={isHovered}
        health={1}
        isHitter={isHitter}
        knightPosition={knightPosition}
        hitPosition={hitPosition}
      />
    </>
  );
};

export default Tower;
