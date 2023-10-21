import { Coordinate } from '../types/GridElement';

export const WIDTH = 1200;
export const HEIGHT = 600;

export const SCALE = 4;

const MAP_SIZE = 8; // 8x8
const NUMBER_TILES = 8;
export const tile_width = 16 * SCALE;
export const H_OFFSET = (WIDTH - NUMBER_TILES * tile_width) / 2;
export const V_OFFSET = (tile_width * SCALE) / 2;

export function to_grid_coordinate(screen: { x: number; y: number }) {
  return {
    x: Math.floor((screen.x - H_OFFSET) / tile_width),
    y: Math.floor(screen.y / tile_width),
  };
}

export function to_absolute_coordinate(grid: { x: number; y: number }) {
  return {
    x: grid.x * 16 * SCALE + H_OFFSET,
    y: grid.y * 16 * SCALE,
  };
}

export const areCoordsEqual = (c1: Coordinate, c2: Coordinate) => {
  return c1.x === c2.x && c1.y === c2.y;
};

export const indexToCoordinate = (index: number): Coordinate => {
  return {
    x: index % MAP_SIZE,
    y: Math.floor(index / MAP_SIZE),
  };
};

export const coordinateToIndex = (coord: Coordinate): number => {
  return coord.y * MAP_SIZE + coord.x;
};
