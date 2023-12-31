import { H_OFFSET, SCALE, indexToCoordinate } from '@/utils/grid';
import { HitEvent, useElementStore } from '@/utils/store';
import { Sprite, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useEffect, useState } from 'react';
import tower from '../assets/tower.png';
import { Coordinate } from '../types/GridElement';
import Defender, { DefenderType } from './Defender';

interface TowerProps {
  type: DefenderType;
  targetPosition: Coordinate;
  isHovered: boolean;
  isHitter: boolean;
  knightPosition?: Coordinate;
  hitPosition?: Coordinate;
  index?: number;
  level?: number;
}

const Tower: React.FC<TowerProps> = ({
  type,
  targetPosition,
  isHovered,
  isHitter,
  knightPosition,
  hitPosition,
  index,
  level,
}) => {
  const { hits, removeFirstHit, speed } = useElementStore((state) => state);
  const [hitPositions, setHitPositions] = useState<Coordinate[]>([]);
  const [currentHit, setCurrentHit] = useState<HitEvent | null>(null);
  PIXI.Texture.from(tower).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  useEffect(() => {
    if (hits.length > 0 && !currentHit) {
      setCurrentHit(hits[0]); // Prendre le premier hit
    }
  }, [hits, currentHit]);

  useEffect(() => {
    if (currentHit) {
      // Traiter l'animation ici

      const hitIndex = hits.filter((x) => x.fromindex == index)[0];
      setHitPositions((prev) => [...prev, indexToCoordinate(hitIndex?.toindex ?? 0)]);

      // Une fois l'animation terminée, retirez le hit actuel et passez au suivant
      const animationDuration = 1000 / speed; // À ajuster selon la durée réelle de votre animation
      setTimeout(() => {
        setCurrentHit(null);
        removeFirstHit(); // Supprimer le hit traité
      }, animationDuration);
    }
  }, [currentHit, removeFirstHit]);

  return (
    <>
      <Sprite
        zIndex={targetPosition.x + targetPosition.y - 1}
        image={tower}
        scale={SCALE}
        x={H_OFFSET + targetPosition.x * 16 * SCALE}
        y={targetPosition.y * 16 * SCALE - 4}
      />
      <Defender
        type={type}
        targetPosition={targetPosition}
        isHovered={isHovered}
        health={1}
        isHitter={isHitter}
        knightPosition={knightPosition}
        hitPosition={hitPosition}
      />
      {level && (
        <Text
          zIndex={1000}
          text={`${level}`}
          style={
            new PIXI.TextStyle({
              fontFamily: '"Press Start 2P", Helvetica, sans-serif',
              fontSize: 10, // Smaller font size
              fill: 'black',
            })
          }
          x={H_OFFSET + targetPosition.x * 16 * SCALE + 2 * SCALE + 20} // adding a small offset for better
          y={targetPosition.y * 16 * SCALE - 2 * SCALE + 38}
        />
      )}
    </>
  );
};

export default Tower;
