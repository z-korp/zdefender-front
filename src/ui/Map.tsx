import React, { useEffect, useState } from "react";
import { Sprite } from "@pixi/react";
import { SCALE_MODES, Texture } from "pixi.js";
import mapData from "../assets/map-zdefender.json";
import {
  Coordinate,
  ElementType,
  GridElement,
  Layer,
} from "../types/GridElement";
import tile from "../assets/tilesets/1.png";

interface MapProps {
  hoveredTile?: Coordinate; // Make sure Coordinate type is defined somewhere in your code
}

const Map: React.FC<MapProps> = ({ hoveredTile }) => {
  // const [grid, setGrid] = useState<GridElement[][]>([]);
  console.log("Map component rendered");

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
        layer: "base" as Layer, // type assertion for layer
        type: "ground" as ElementType, // type assertion for type
      });
    }
    // console.log("row", row);
    generatedGrid.push(row);
  }
  const grid = generatedGrid;

  // console.log(mapData);
  // console.log("grid", grid);
  // useEffect(() => {
  //   console.log("Generating grid");
  //   // Generate the grid based on the map data
  // }, []);
  Texture.from(tile).baseTexture.scaleMode = SCALE_MODES.NEAREST;

  return (
    <>
      {grid.map((row, rowIndex) => (
        <>
          {row.map((cell, cellIndex) => {
            console.log(cell);
            console.log("tile", tile);
            return (
              <Sprite
                key={cellIndex}
                image={"./tilesets/" + cell.tileId + ".png"}
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
