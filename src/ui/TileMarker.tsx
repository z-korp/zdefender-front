import { SCALE, to_absolute_coordinate } from '@/utils/grid';
import { Sprite } from '@pixi/react';
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

  return <Sprite zIndex={0} image={image[color]} scale={SCALE} x={finalX} y={finalY} />;
};

export default TileMarker;
