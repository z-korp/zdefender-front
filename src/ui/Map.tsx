import { H_OFFSET } from '@/utils/grid';
import { Sprite } from '@pixi/react';
import { SCALE_MODES, Texture } from 'pixi.js';
import React from 'react';
import mapData from '../assets/map-zdefender.json';
import { Coordinate, ElementType, GridElement, Layer } from '../types/GridElement';

interface MapProps {
  hoveredTile?: Coordinate; // Make sure Coordinate type is defined somewhere in your code
}

const SCALE = 4;

const Map: React.FC<MapProps> = ({ hoveredTile }) => {
  console.log('Map component rendered');

  const generatedGrid: GridElement[][] = [];

  for (let y = 0; y < mapData.height; y++) {
    const row = [];
    for (let x = 0; x < mapData.width; x++) {
      const tileIndex = y * mapData.width + x;
      const tileId = mapData.layers[0].data[tileIndex];
      row.push({
        x,
        y,
        tileId,
        layer: 'base' as Layer, // type assertion for layer
        type: 'ground' as ElementType, // type assertion for type
      });
    }
    generatedGrid.push(row);
  }
  const grid = generatedGrid;

  return (
    <>
      {grid.map((row, rowIndex) => (
        <>
          {row.map((cell, cellIndex) => {
            const tile = './tilesets/' + cell.tileId + '.png';
            Texture.from(tile).baseTexture.scaleMode = SCALE_MODES.NEAREST;
            return (
              <Sprite
                key={cellIndex}
                image={tile}
                scale={SCALE} // Change the scale here
                x={H_OFFSET + cell.x * mapData.tilewidth * SCALE} // Adjust the x position
                y={cell.y * mapData.tileheight * SCALE} // Adjust the y position
              />
            );
          })}
        </>
      ))}
    </>
  );
};

export default Map;
