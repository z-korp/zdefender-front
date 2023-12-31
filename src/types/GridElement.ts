export type Coordinate = {
  x: number;
  y: number;
};

export type Layer = "base" | "object";

export type ElementType = "road" | "ground";

export type GridElement = Coordinate & {
  layer: Layer;
  type: ElementType;
  tileId: number;
};
