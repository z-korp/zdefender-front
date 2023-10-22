import { getRange } from '@/utils/range';
import { useElementStore } from '@/utils/store';
import { AnimatedSprite, useTick } from '@pixi/react';
import { Assets, Texture } from 'pixi.js';
import { useEffect, useState } from 'react';
import { Coordinate } from '../types/GridElement';
import { Animation, Direction, getFramesFromType } from '../utils/animation';
import { SCALE, to_absolute_coordinate, to_grid_coordinate } from '../utils/grid';
import TileMarker from './TileMarker';

export type DefenderType = 'bowman' | 'barbarian' | 'knight' | 'wizard';

interface DefenderProps {
  type: DefenderType;
  targetPosition: Coordinate;
  isHovered: boolean;
  health: number;
  isHitter: boolean;
  knightPosition?: Coordinate;
  hitPosition?: Coordinate;
}

function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

const getDirection = (start: Coordinate, end: Coordinate, orientation: Direction): Direction => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  if (Math.abs(dx) > Math.abs(dy)) {
    // Horizontal movement is dominant
    if (dx > 0) {
      // Moving to the right
      return dy > 0 ? Direction.SE : dy < 0 ? Direction.NE : Direction.E;
    } else {
      // Moving to the left
      return dy > 0 ? Direction.SW : dy < 0 ? Direction.NW : Direction.W;
    }
  } else if (Math.abs(dy) > Math.abs(dx)) {
    // Vertical movement is dominant
    return dy > 0 ? Direction.S : Direction.N;
  } else if (dx === 0 && dy === 0) {
    // No movement, return the current orientation
    return orientation;
  } else {
    // Diagonal movement where dx and dy are equal in magnitude but may have different signs
    if (dx > 0 && dy > 0) return Direction.SE;
    if (dx < 0 && dy < 0) return Direction.NW;
    if (dx > 0 && dy < 0) return Direction.NE;
    if (dx < 0 && dy > 0) return Direction.SW;
  }

  // Fallback to the current orientation
  return orientation;
};

const getStartOrientation = (mob_coord: Coordinate, knight_position?: Coordinate) => {
  return getDirection(mob_coord, knight_position ? knight_position : mob_coord, Direction.S);
};

const Defender: React.FC<DefenderProps> = ({
  type,
  targetPosition,
  isHovered,
  health,
  isHitter,
  knightPosition,
  hitPosition,
}) => {
  const { map } = useElementStore((state) => state);

  const [animation, setAnimation] = useState<Animation>(Animation.Idle);
  const [counterAnim, setCounterAnim] = useState(0);

  const [orientation, setOrientation] = useState<Direction>(getStartOrientation(targetPosition, knightPosition));
  const [frames, setFrames] = useState<Texture[]>([]);
  const [resource, setResource] = useState<any>(undefined);
  const [currentFrame, setCurrentFrame] = useState(0);

  const [isMoving, setIsMoving] = useState(false);

  const [range, setRange] = useState<Coordinate[]>([]);

  useEffect(() => {
    setRange(getRange(type, targetPosition, map));
  }, [targetPosition]);

  useEffect(() => {
    if (resource) {
      if (animation === Animation.Walk) {
        const or = getDirection(
          to_grid_coordinate(absolutePosition),
          to_grid_coordinate(absoluteTargetPosition),
          orientation
        );
        setOrientation(or);
        setFrames(getFramesFromType(type, Animation.Walk, or, resource));
      } else if (animation === Animation.BowAttack) {
        setFrames(getFramesFromType(type, Animation.BowAttack, orientation, resource));
      } else if (animation === Animation.StaffAttack) {
        setFrames(getFramesFromType(type, Animation.StaffAttack, orientation, resource));
      } else if (animation === Animation.SwordAttack) {
        setFrames(getFramesFromType(type, Animation.SwordAttack, orientation, resource));
      } else if (animation === Animation.Hurt) {
        setFrames(getFramesFromType(type, Animation.Hurt, orientation, resource));
      } else if (animation === Animation.Death) {
        setFrames(getFramesFromType(type, Animation.Death, orientation, resource));
      } else {
        setFrames(getFramesFromType(type, Animation.Idle, orientation, resource));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animation, resource]);

  useEffect(() => {
    setCurrentFrame(0);
    if (health === 0) {
      setAnimation(Animation.Death);
    } else {
      if (
        (health === 10 && type === 'knight') ||
        (health === 1 && type === 'barbarian') ||
        (health === 1 && type === 'wizard') ||
        (health === 1 && type === 'bowman')
      ) {
        setAnimation(Animation.Jump);
      } else {
        setAnimation(Animation.Hurt);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [health]);

  useEffect(() => {
    if (isMoving) {
      setAnimation(Animation.Walk);
    }
  }, [isMoving]);

  useEffect(() => {
    if (isHitter === true) {
      setCurrentFrame(0);

      if (hitPosition !== undefined) {
        const new_orientation = hitPosition ? getDirection(targetPosition, hitPosition, orientation) : orientation;
        console.log('new_orientation', new_orientation);
        setOrientation(new_orientation);

        if (type === 'knight' || type === 'barbarian') setAnimation(Animation.SwordAttack);
        else if (type === 'bowman') setAnimation(Animation.BowAttack);
        else if (type === 'wizard') setAnimation(Animation.StaffAttack);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHitter]);

  // current position absolute during movement
  // will be changing during the movement, towards the absoluteTargetPosition
  const [absolutePosition, setAbsolutePosition] = useState<Coordinate>(to_absolute_coordinate(targetPosition));
  const [absoluteTargetPosition, setAbsolutetargetPosition] = useState<Coordinate>(
    to_absolute_coordinate(targetPosition)
  );

  // Only at init
  useEffect(() => {
    const load = async () => {
      const resource = await Assets.load(`assets/towers/${type}/${type}.json`);
      setResource(resource);
    };
    load();
    // init position
    setAbsolutePosition(to_absolute_coordinate(targetPosition));
  }, []);

  // If we receive a new targetPosition from props, we transform it into absolute pixel pos and work on it for the move
  useEffect(() => {
    setAbsolutetargetPosition(to_absolute_coordinate(targetPosition));
  }, [targetPosition]);

  // Here we work only in absolute positions
  /*useTick(() => {
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
  });*/

  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [isDead, setIsDead] = useState(false);

  useTick(() => {
    if (shouldAnimate) {
      setCounterAnim((prevCounter) => prevCounter + 1);
      if (counterAnim === 1000) setCounterAnim(0);

      if (counterAnim % 10 === 0) {
        if (animation === Animation.Idle) {
          // if IDLE, loop through frames
          if (frames && frames.length > 0) {
            setCurrentFrame((prevFrame) => (prevFrame + 1) % frames.length); // change to the next frame and back to f0
          }
        } else {
          // otherwise we do only the frames, and then go IDLE
          if (frames && frames.length > 0 && currentFrame < frames.length - 1) {
            setCurrentFrame((prevFrame) => prevFrame + 1); // change to the next frame
          } else {
            // last frame of the animation
            if (animation === Animation.Death) {
              setShouldAnimate(false);
              setIsDead(true);
            } else if (
              animation === Animation.BowAttack ||
              animation === Animation.StaffAttack ||
              animation === Animation.SwordAttack
            ) {
              setCurrentFrame(0);
              setAnimation(Animation.Idle);
            } else {
              setCurrentFrame(0);
              setAnimation(Animation.Idle);
            }
          }
        }
      }
    }
  });

  if (frames.length === 0) {
    return null;
  }

  return (
    <>
      <AnimatedSprite
        zIndex={to_grid_coordinate(absolutePosition).x + to_grid_coordinate(absolutePosition).y}
        x={isDead ? -100 /*lol*/ : absolutePosition.x + 32 * (SCALE - 3)}
        y={isDead ? -100 /*lol*/ : absolutePosition.y + 32 * (SCALE - 3) - 32} // weird offset cause sprite is not centered and not 16x16
        anchor={0.5}
        scale={SCALE - 1}
        isPlaying={false}
        textures={frames}
        initialFrame={currentFrame}
      />

      {isHovered && range && range.map((r, index) => <TileMarker key={index} x={r.x} y={r.y} color="cyan" />)}
    </>
  );
};

export default Defender;
