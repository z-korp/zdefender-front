import { Coordinate } from '../types/GridElement';

export const WIDTH = 1200;
export const HEIGHT = 600;

const NUMBER_TILES = 8;
const h = 16;
export const H_OFFSET = (HEIGHT - (NUMBER_TILES * h) / 2) / 2;

export const areCoordsEqual = (c1: Coordinate, c2: Coordinate) => {
  return c1.x === c2.x && c1.y === c2.y;
};
