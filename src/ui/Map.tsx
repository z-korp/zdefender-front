import { H_OFFSET, SCALE, coordinateToIndex } from '@/utils/grid';
import { useElementStore } from '@/utils/store';
import { Graphics, Sprite, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { SCALE_MODES, Texture } from 'pixi.js';
import React, { useEffect } from 'react';
import mapData from '../assets/map-zdefender.json';
import { ElementType, GridElement, Layer } from '../types/GridElement';

const Map: React.FC = () => {
  const { set_map, map } = useElementStore((state) => state);

  useEffect(() => {
    const generatedGrid: GridElement[][] = [];
    const groundArray = [2, 3, 28, 29, 30, 55, 56, 57];
    // const [selectedTile, setSelectedTile] = useState<Coordinate | null>(null);

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
    set_map(generatedGrid);
  }, []);

  // const renderSelectionMenu = () => {
  //   if (!selectedTile) return null;
  //   return (
  //     <>
  //       {/* Votre liste d'options ici */}
  //       <button onClick={() => {}}>Option 1</button>
  //       <button onClick={() => {}}>Option 2</button>
  //       {/* ... */}
  //     </>
  //   );
  // };

  return (
    <>
      {map &&
        map.map((row, rowIndex) => (
          <>
            {row.map((cell, cellIndex) => {
              const tile = './tilesets/' + cell.tileId + '.png';
              Texture.from(tile).baseTexture.scaleMode = SCALE_MODES.NEAREST;
              return (
                <>
                  <Sprite
                    key={cellIndex}
                    image={tile}
                    scale={SCALE}
                    x={H_OFFSET + cell.x * mapData.tilewidth * SCALE}
                    y={cell.y * mapData.tileheight * SCALE}
                  />
                  {import.meta.env.VITE_PUBLIC_DEBUG && (
                    <Graphics
                      draw={(g) => {
                        g.clear(); // Clear the canvas
                        // Define border color and width
                        g.lineStyle(2, 0xff0000); // 2px width, red color
                        // Draw a rectangle for the border
                        g.drawRect(
                          H_OFFSET + cell.x * mapData.tilewidth * SCALE,
                          cell.y * mapData.tileheight * SCALE,
                          mapData.tilewidth * SCALE,
                          mapData.tileheight * SCALE
                        );
                      }}
                    />
                  )}
                  {import.meta.env.VITE_PUBLIC_DEBUG && (
                    <Text
                      text={`(${cell.x},${cell.y})`}
                      x={H_OFFSET + cell.x * mapData.tilewidth * SCALE + 2}
                      y={cell.y * mapData.tileheight * SCALE + 3}
                      style={
                        new PIXI.TextStyle({
                          align: 'center',
                          fontFamily: '"Press Start 2P", Helvetica, sans-serif',
                          fontSize: 6,
                          fontWeight: '400',
                          fill: '0xff0000',
                        })
                      }
                    />
                  )}
                  {import.meta.env.VITE_PUBLIC_DEBUG && (
                    <Text
                      text={`${coordinateToIndex({ x: cell.x, y: cell.y })}`}
                      x={H_OFFSET + cell.x * mapData.tilewidth * SCALE + 2 + 40}
                      y={cell.y * mapData.tileheight * SCALE + 3}
                      style={
                        new PIXI.TextStyle({
                          align: 'center',
                          fontFamily: '"Press Start 2P", Helvetica, sans-serif',
                          fontSize: 6,
                          fontWeight: '400',
                          fill: '0xff0000',
                        })
                      }
                    />
                  )}
                </>
              );
            })}
          </>
        ))}
    </>
  );
};

export default Map;
