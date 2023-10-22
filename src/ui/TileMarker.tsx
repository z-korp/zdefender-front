import { SCALE, to_absolute_coordinate } from '@/utils/grid';
import { Sprite } from '@pixi/react';
import * as PIXI from 'pixi.js';
import overlay_cyan from '../assets/hover/cyan.png';
import overlay_gray from '../assets/hover/gray.png';
import overlay_green from '../assets/hover/green.png';
import overlay_red from '../assets/hover/red.png';
import overlay_yellow from '../assets/hover/yellow.png';

interface TileMarkerProps {
  x: number;
  y: number;
  color: 'cyan' | 'gray' | 'green' | 'red' | 'yellow';
}

const image = {
  cyan: overlay_cyan,
  yellow: overlay_yellow,
  gray: overlay_gray,
  green: overlay_green,
  red: overlay_red,
};

const TileMarker: React.FC<TileMarkerProps> = ({ x, y, color }) => {
  const { x: finalX, y: finalY } = to_absolute_coordinate({ x, y });
  PIXI.Texture.from(overlay_cyan).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  PIXI.Texture.from(overlay_gray).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  PIXI.Texture.from(overlay_green).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  PIXI.Texture.from(overlay_red).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  PIXI.Texture.from(overlay_yellow).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  return <Sprite zIndex={0} image={image[color]} scale={SCALE} x={finalX} y={finalY} />;
};

export default TileMarker;
