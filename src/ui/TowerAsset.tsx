import { SCALE } from '@/utils/grid';
import { Sprite } from '@pixi/react';
import * as PIXI from 'pixi.js';
import barbarian_transparent from '../assets/barbarian_transparent.png';
import bowman_transparent from '../assets/bowman_transparent.png';
import tower from '../assets/tower.png';
import wizard_transparent from '../assets/wizard_transparent.png';
import { DefenderType } from './Defender';

interface TowerAssetProps {
  type: DefenderType;
  x: number;
  y: number;
}

export const TowerAsset: React.FC<TowerAssetProps> = ({ type, x, y }) => {
  PIXI.Texture.from(barbarian_transparent).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  PIXI.Texture.from(bowman_transparent).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  PIXI.Texture.from(wizard_transparent).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  PIXI.Texture.from(tower).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  const image =
    type === 'barbarian' ? barbarian_transparent : type === 'bowman' ? bowman_transparent : wizard_transparent;

  return (
    <>
      <Sprite scale={SCALE} image={tower} x={x} y={y - 5} />
      <Sprite scale={SCALE - 1} image={image} x={x - 16} y={y - 47} />
    </>
  );
};
