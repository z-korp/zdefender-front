import React, { useEffect, useState } from 'react';
import { Sprite } from '@pixi/react';
import { SCALE_MODES, Texture } from 'pixi.js';
import mapData from '../assets/map-zdefender.json';
import { Coordinate, ElementType, GridElement, Layer } from '../types/GridElement';

interface MapProps {
  hoveredTile?: Coordinate; // Make sure Coordinate type is defined somewhere in your code
}

const Map: React.FC<MapProps> = ({ hoveredTile }) => {
  const generatedGrid: GridElement[][] = [];
  const groundArray = [2, 3, 28, 29, 30, 55, 56, 57];

  for (let y = 0; y < mapData.height; y++) {
    const row = [];
    for (let x = 0; x < mapData.width; x++) {
      const tileIndex = y * mapData.width + x;
      const tileId = mapData.layers[0].data[tileIndex];
      const isGround = groundArray.includes(tileId);
      const type = isGround ? 'ground' : 'road';
      row.push({
        x,
        y,
        tileId,
        layer: 'base' as Layer, // type assertion for layer
        type: type as ElementType, // type assertion for type
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
            console.log(cell);
            return (
              <Sprite
                key={cellIndex}
                image={'./tilesets/' + cell.tileId + '.png'}
                scale={1}
                x={cell.x * mapData.tilewidth}
                y={cell.y * mapData.tileheight}
              />
            );
          })}
        </>
      ))}
    </>
  );
};

export default Map;
