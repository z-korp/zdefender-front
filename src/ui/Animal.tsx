import { AnimatedSprite, Graphics, Text, useTick } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { Assets, Texture } from 'pixi.js';
import { useEffect, useState } from 'react';
import { Coordinate } from '../types/GridElement';
import { Animation, Direction, getFramesFromType } from '../utils/animation';
import { tile_width, to_absolute_coordinate, to_grid_coordinate } from '../utils/grid';

export type AnimalType = 'chicken';

interface AnimalProps {
  type: AnimalType;
  id: number;
  targetPosition: Coordinate;
  health: number;
}

function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

const getDirection = (start: Coordinate, end: Coordinate, orientation: Direction): Direction => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  // Determine the direction based on the change in x and y coordinates
  if (Math.abs(dx) > Math.abs(dy)) {
    // If the horizontal movement is greater than the vertical movement
    return dx > 0 ? Direction.E : Direction.W;
  } else {
    // If the vertical movement is greater than or equal to the horizontal movement
    return dy > 0 ? Direction.S : Direction.N;
  }

  // If for some reason no direction is determined, return the current orientation
  return orientation;
};

const Animal: React.FC<AnimalProps> = ({ type, targetPosition, health, id }) => {
  const [animation, setAnimation] = useState<Animation>(Animation.Idle);
  const [counterAnim, setCounterAnim] = useState(0);

  const [orientation, setOrientation] = useState<Direction>(Direction.E);
  const [frames, setFrames] = useState<Texture[]>([]);
  const [resource, setResource] = useState<any>(undefined);
  const [currentFrame, setCurrentFrame] = useState(0);

  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    if (resource) {
      if (animation === Animation.Walk) {
        setFrames(getFramesFromType(type, Animation.Walk, orientation, resource));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animation, resource, orientation]);

  useEffect(() => {
    if (isMoving) {
      setAnimation(Animation.Walk);
    }
  }, [isMoving]);

  // current position absolute during movement
  // will be changing during the movement, towards the absoluteTargetPosition
  const [absolutePosition, setAbsolutePosition] = useState<Coordinate>(to_absolute_coordinate(targetPosition));
  const [absoluteTargetPosition, setAbsolutetargetPosition] = useState<Coordinate>(
    to_absolute_coordinate(targetPosition)
  );

  // Only at init
  useEffect(() => {
    const load = async () => {
      const resource = await Assets.load(`assets/enemies/${type}/${type}.json`);
      setResource(resource);
    };
    load();
    // init position
    setAbsolutePosition(to_absolute_coordinate(targetPosition));
    setAnimation(Animation.Walk);
  }, []);

  // If we receive a new targetPosition from props, we transform it into absolute pixel pos and work on it for the move
  useEffect(() => {
    const or = getDirection(absolutePosition, to_absolute_coordinate(targetPosition), orientation);
    setOrientation(or);
    setAbsolutetargetPosition(to_absolute_coordinate(targetPosition));
  }, [targetPosition]);

  // Here we work only in absolute positions
  useTick(() => {
    const currentX = absolutePosition.x;
    const currentY = absolutePosition.y;
    const targetX = absoluteTargetPosition.x;
    const targetY = absoluteTargetPosition.y;
    if (Math.abs(targetX - currentX) >= 1 || Math.abs(targetY - currentY) >= 1) {
      setIsMoving(true);
      const newX = lerp(currentX, targetX, 0.05);
      const newY = lerp(currentY, targetY, 0.05);
      setAbsolutePosition({ x: newX, y: newY });
    } else {
      setIsMoving(false);
    }
  });

  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [isDead, setIsDead] = useState(false);

  useTick(() => {
    if (shouldAnimate) {
      setCounterAnim((prevCounter) => prevCounter + 1);
      if (counterAnim === 1000) setCounterAnim(0);

      if (counterAnim % 10 === 0) {
        // loop through frames
        if (frames && frames.length > 0) {
          setCurrentFrame((prevFrame) => (prevFrame + 1) % frames.length); // change to the next frame and back to f0
        }
      }
    }
  });

  //console.log('frames', frames);
  if (frames.length === 0) {
    return null;
  }

  const maxHealth = 100; // or whatever your maximum health is
  const healthBarWidth = 50; // width of the health bar at full health
  const healthBarHeight = 6; // height of the health bar
  const currentHealthWidth = (health / maxHealth) * healthBarWidth;
  const healthBarX = absolutePosition.x - healthBarWidth / 2 + tile_width / 2; // to center the health bar above the sprite
  const healthBarY = absolutePosition.y; // you might need to adjust this to position the health bar correctly above the sprite

  return (
    <>
      <Graphics
        draw={(g) => {
          g.clear(); // Clear the previous drawings

          // Background of the health bar (e.g., a gray bar to show missing health)
          g.beginFill(0xaaaaaa);
          g.drawRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
          g.endFill();

          // Foreground of the health bar (e.g., a green bar to show current health)
          g.beginFill(0x00ff00);
          g.drawRect(healthBarX, healthBarY, currentHealthWidth, healthBarHeight);
          g.endFill();
        }}
      />

      <AnimatedSprite
        zIndex={to_grid_coordinate(absolutePosition).x + to_grid_coordinate(absolutePosition).y}
        x={isDead ? -100 /*lol*/ : absolutePosition.x + tile_width / 2}
        y={isDead ? -100 /*lol*/ : absolutePosition.y + tile_width / 2}
        anchor={0.5}
        scale={3}
        isPlaying={false}
        textures={frames}
        initialFrame={currentFrame}
      />

      {import.meta.env.VITE_PUBLIC_DEBUG && (
        <Text
          zIndex={to_grid_coordinate(absolutePosition).x + to_grid_coordinate(absolutePosition).y + 10}
          text={`${id.toString()}`}
          x={absolutePosition.x + tile_width / 2}
          y={absolutePosition.y + tile_width / 2}
          anchor={0.5}
          style={
            new PIXI.TextStyle({
              align: 'center',
              fontFamily: '"Press Start 2P", Helvetica, sans-serif',
              fontSize: 10,
              fontWeight: '400',
              fill: '#000000',
            })
          }
        />
      )}

      {/*{!isMoving &&
        isHovered &&
        health !== 0 &&
        neighbors &&
        neighbors.map((move, index) => (
          <TileMarker key={index} x={move.tile.x} y={move.tile.y} color={move.action === 'walk' ? 'blue' : 'yellow'} />
        ))}*/}
    </>
  );
};

export default Animal;
