import { H_OFFSET } from '@/utils/grid';
import { Sprite } from '@pixi/react';
import { SCALE_MODES, Texture } from 'pixi.js';
import React, { useState } from 'react';
import mapData from '../assets/map-zdefender.json';
import { Coordinate, ElementType, GridElement, Layer } from '../types/GridElement';

interface MapProps {
  hoveredTile?: Coordinate; // Make sure Coordinate type is defined somewhere in your code
}

export const SCALE = 4;

const Map: React.FC<MapProps> = ({ hoveredTile }) => {
  const generatedGrid: GridElement[][] = [];
  const groundArray = [2, 3, 28, 29, 30, 55, 56, 57];
  const [selectedTile, setSelectedTile] = useState<Coordinate | null>(null);

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

  const renderSelectionMenu = () => {
    if (!selectedTile) return null;
    return (
      <div style={{ position: 'absolute', left: selectedTile.x, top: selectedTile.y }}>
        {/* Votre liste d'options ici */}
        <button onClick={() => {}}>Option 1</button>
        <button onClick={() => {}}>Option 2</button>
        {/* ... */}
      </div>
    );
  };

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
                anchor={0.5}
                x={H_OFFSET + cell.x * mapData.tilewidth * SCALE} // Adjust the x position
                y={cell.y * mapData.tileheight * SCALE} // Adjust the y position
              />
            );
          })}
          {renderSelectionMenu()}
        </>
      ))}
    </>
  );
};

export default Map;
