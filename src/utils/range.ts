import { Coordinate, GridElement } from '@/types/GridElement';
import { MobType } from '@/ui/Mob';

export const getRange = (type: MobType, tile: Coordinate, grid: GridElement[][]): Coordinate[] => {
  let range = 1;

  if (type === 'bowman' || type === 'wizard') {
    range = 2;
  }

  const coordinates: Coordinate[] = [];

  for (let y = -range; y <= range; y++) {
    for (let x = -range; x <= range; x++) {
      const newY = tile.y + y;
      const newX = tile.x + x;

      // Ensure the coordinate is within the grid's bounds
      if (newY >= 0 && newY < grid.length && newX >= 0 && newX < grid[0].length) {
        coordinates.push({ x: newX, y: newY });
      }
    }
  }

  return coordinates;
};
