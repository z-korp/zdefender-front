import { H_OFFSET, SCALE, coordinateToIndex } from '@/utils/grid';
import { useElementStore } from '@/utils/store';
import { Graphics, Sprite, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { SCALE_MODES, Texture } from 'pixi.js';
import React, { useEffect, useState } from 'react';
import mapData from '../assets/map-zdefender.json';
import { ElementType, GridElement, Layer } from '../types/GridElement';

const Map: React.FC = () => {
  const { set_map_3D, map_3D } = useElementStore((state) => state);

  useEffect(() => {
    const generatedGrid: GridElement[][][] = []; // 3D array for layers
    const groundArray = [2, 3, 28, 29, 30, 55, 56, 57];
    const notGroundArrayLastLayer = [192, 225, 822, 207, 199, 219, 226, 219, 226, 246, 253, 709, 789];

    // const [selectedTile, setSelectedTile] = useState<Coordinate | null>(null);

    mapData.layers.forEach((layerData, layerIndex) => {
      const currentLayer: GridElement[][] = [];
      for (let y = 0; y < mapData.height; y++) {
        const row = [];
        for (let x = 0; x < mapData.width; x++) {
          const tileIndex = y * mapData.width + x;
          const tileId = layerData.data[tileIndex];

          let isGround = groundArray.includes(tileId);

          if (layerIndex === 4) {
            isGround = !notGroundArrayLastLayer.includes(tileId);
          }
          const type = isGround ? 'ground' : 'road';
          row.push({
            x,
            y,
            tileId,
            layer: layerData.name as Layer, // assuming layerData has a name property
            type: type as ElementType,
          });
        }
        currentLayer.push(row);
      }
      generatedGrid.push(currentLayer);
    });

    set_map_3D(generatedGrid);
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

  const [activeLayerIndex, setActiveLayerIndex] = useState(0);

  useEffect(() => {
    // Set up an interval to animate through the first four layers
    const intervalId = setInterval(() => {
      setActiveLayerIndex((prevIndex) => (prevIndex < 3 ? prevIndex + 1 : 0));
    }, 150); // Change every 150ms for example

    // Cleanup: clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {/* Render Animated Layers */}
      {map_3D.length > 0 && (
        <React.Fragment>
          {map_3D[activeLayerIndex].map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
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
            </React.Fragment>
          ))}
        </React.Fragment>
      )}

      {/* Render the 5th Layer Always on Top */}
      {map_3D[4] && (
        <React.Fragment>
          {map_3D[4].map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
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
                  </>
                );
              })}
            </React.Fragment>
          ))}
        </React.Fragment>
      )}
    </>
  );
};

export default Map;
