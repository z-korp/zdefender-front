import { useDojo } from '@/DojoContext';
import { useGame } from '@/hooks/useGame';
import { Coordinate } from '@/types/GridElement';
import { TowerCategory } from '@/types/Tower';
import { useEventsStore } from '@/utils/eventsStore';
import { getRange } from '@/utils/range';
import { getComponentEntities, getComponentValue } from '@latticexyz/recs';
import { Container, Stage, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useEffect, useState } from 'react';
import { shortString } from 'starknet';
import useIp from '../hooks/useIp';
import {
  HEIGHT,
  WIDTH,
  areCoordsEqual,
  indexToCoordinate,
  to_absolute_coordinate,
  to_grid_coordinate,
} from '../utils/grid';
import { useElementStore } from '../utils/store';
import Animal from './Animal';
import { BottomMenu } from './BottomMenu';
import EventProcessor2 from './EventProcessor2';
import GameOverModal from './GameOverModal'; // importez le composant
import Gold from './Gold';
import Life from './Life';
import Map from './Map';
import { MobType } from './Mob';
import MobsRemaining from './MobsRemaining';
import NewGame from './NewGame';
import NextWaveButton from './NextWaveButton';
import TileMarker from './TileMarker';
import Tower from './Tower';
import { TowerButton } from './TowerButton';
import Wave from './Wave';

interface CanvasProps {
  setMusicPlaying: (bool: boolean) => void;
}

const Canvas: React.FC<CanvasProps> = ({ setMusicPlaying }) => {
  const {
    setup: {
      systemCalls: { create, run, build },
      network: { graphSdk },
      components: { Mob },
    },
    account: { account },
  } = useDojo();
  const { map } = useElementStore((state) => state);

  const { id, over, wave, mob_remaining, gold, health } = useGame();
  const [currentAbsoluteTilePosition, setCurrentAbsoluteTilePosition] = useState<Coordinate | undefined>();

  const [score, setScore] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<MobType>('knight');
  const [level, setLevel] = useState<number>(0);
  const [hoveredTile, setHoveredTile] = useState<Coordinate | undefined>(undefined);
  const [hoveredTileAbsolute, setHoveredTileAbsolute] = useState<Coordinate | undefined>(undefined);

  const [selectedTile, setSelectedTile] = useState<Coordinate | undefined>(undefined);
  const [isGameOver, setIsGameOver] = useState(false);
  const [absolutePosition, setAbsolutePosition] = useState<Coordinate | undefined>(undefined);
  const [isBuying, setIsBuying] = useState(false);
  const { set_ip } = useElementStore((state) => state);

  const [pseudo, setPseudo] = useState('');
  const { ip, loading, error } = useIp();
  useEffect(() => {
    if (!loading && ip) {
      set_ip(ip);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ip, loading]);

  const generateNewGame = async () => {
    setScore(0);
    const storedIsMusicPlaying = localStorage.getItem('isMusicPlaying');
    if (storedIsMusicPlaying === null) {
      setMusicPlaying(true);
    } else {
      setMusicPlaying(JSON.parse(storedIsMusicPlaying));
    }

    const pseudoFelt = shortString.encodeShortString(pseudo);
    create(account, ip.toString(), 1000, pseudoFelt);
  };

  useEffect(() => {
    if (over === 1) {
      setIsGameOver(true);
    }
  }, [over]);

  const [range, setRange] = useState<Coordinate[]>([]);
  useEffect(() => {
    if (hoveredTile) {
      const newRange = getRange(selectedType, hoveredTile, map);
      setRange(newRange);
    } else {
      setRange([]); // clear range if no tile is hovered
    }
  }, [hoveredTile, selectedType]);

  useEffect(() => {
    if (hoveredTile) setHoveredTileAbsolute(to_absolute_coordinate(hoveredTile));
  }, [hoveredTile]);

  const handleTileClick = (tile: Coordinate) => {
    setSelectedTile(tile);
  };

  const handleBuy = (type: MobType, x: number, y: number) => {
    const category =
      type === 'knight'
        ? TowerCategory.Barbarian
        : type === 'bowman'
        ? TowerCategory.Bowman
        : type === 'wizard'
        ? TowerCategory.Wizard
        : TowerCategory.Barbarian;
    console.log('BUIIILLLDD');
    build(account, ip.toString(), x, y, category);
  };

  const handleMenuClose = () => {
    console.log('handleMenuClose');
    setSelectedTile(undefined);
  };

  const tick = useEventsStore((state) => state.tick);
  const [animals, setAnimals] = useState<any[]>([]);

  useEffect(() => {
    const animalEntities = getComponentEntities(Mob);
    console.log(animalEntities);
    const newAnimals = [...animalEntities].map((key) => getComponentValue(Mob, key));
    setAnimals(newAnimals);
  }, [tick]);

  return (
    <div style={{ position: 'relative' }}>
      <EventProcessor2 />
      <Stage
        width={WIDTH}
        height={HEIGHT}
        options={{ backgroundColor: '#242424' }}
        onPointerMove={(e) => {
          const tileX = Math.round(e.nativeEvent.offsetX);
          const tileY = Math.round(e.nativeEvent.offsetY);

          const tileCoords = { x: tileX, y: tileY };
          const tileGridCoords = to_grid_coordinate(tileCoords);
          if (hoveredTile === undefined || !areCoordsEqual(hoveredTile, tileGridCoords)) {
            setHoveredTile(tileGridCoords);
            setCurrentAbsoluteTilePosition(to_absolute_coordinate(tileGridCoords));
            setAbsolutePosition({
              x: e.nativeEvent.offsetX,
              y: e.nativeEvent.offsetY,
            });
          }
        }}
        onPointerDown={(e) => {
          if (hoveredTile!.x > 7 || hoveredTile!.y > 7 || hoveredTile!.x < 0 || hoveredTile!.y < 0) {
            console.log('est out');
            console.log(selectedTile);
            // setSelectedTile(undefined);
          } else {
            console.log('hoveredTile', hoveredTile);
            console.log('selectedTile', selectedTile);
            if (selectedTile) {
              const hoveredTileType = map[selectedTile.y][selectedTile.x];
              console.log('hoveredTileType', hoveredTileType);
              if (hoveredTileType.type !== 'road') {
                setIsBuying(true); // Assuming you have a state called 'isBuying' and a setter 'setIsBuying'
              }
            }

            setSelectedTile(hoveredTile ? hoveredTile : undefined);
          }
        }}
      >
        {id !== undefined && (
          <Container sortableChildren={true}>
            <>
              <Map />
              <BottomMenu
                selectedTile={selectedTile}
                setSelectedType={setSelectedType}
                isBuying={isBuying}
                onClose={() => setSelectedTile(undefined)}
                onBuy={handleBuy}
              />
            </>

            <Tower
              type="knight"
              targetPosition={{ x: 1, y: 1 }}
              isHovered={hoveredTile ? areCoordsEqual({ x: 1, y: 1 }, hoveredTile) : false}
              isHitter={false}
            />
            <Wave wave={wave} x={10} y={50} />
            <MobsRemaining remaining={mob_remaining} x={10} y={80} />
            <Gold number={gold} x={20} y={20} />
            <Life health={health} x={140} y={20} />

            {animals.map((animal) => (
              <Animal
                key={animal.id}
                id={animal.id}
                type={'chicken'}
                targetPosition={indexToCoordinate(animal.index)}
                health={animal.health}
              />
            ))}
            {/*<Animal type={'chicken'} targetPosition={{ x: 2, y: 2 }} health={70} />*/}

            {selectedTile && currentAbsoluteTilePosition && (
              <>
                {range.map((r, index) => (
                  <>
                    {hoveredTile &&
                      to_grid_coordinate(currentAbsoluteTilePosition).x === hoveredTile.x &&
                      to_grid_coordinate(currentAbsoluteTilePosition).y === hoveredTile.y && (
                        <TowerButton x={currentAbsoluteTilePosition.x} y={currentAbsoluteTilePosition.y + 20} />
                      )}
                    <TileMarker key={index} x={r.x} y={r.y} color="cyan" />
                  </>
                ))}
              </>
            )}

            {import.meta.env.VITE_PUBLIC_DEBUG && (
              <Text
                text={`(${hoveredTile?.x}, ${hoveredTile?.y})`}
                x={10}
                y={500}
                style={
                  new PIXI.TextStyle({
                    align: 'center',
                    fontFamily: '"Press Start 2P", Helvetica, sans-serif',
                    fontSize: 12,
                    fontWeight: '400',
                    fill: '#ffffff',
                  })
                }
              />
            )}
            {import.meta.env.VITE_PUBLIC_DEBUG && (
              <Text
                text={`(${hoveredTileAbsolute?.x}, ${hoveredTileAbsolute?.y})`}
                x={10}
                y={530}
                style={
                  new PIXI.TextStyle({
                    align: 'center',
                    fontFamily: '"Press Start 2P", Helvetica, sans-serif',
                    fontSize: 12,
                    fontWeight: '400',
                    fill: '#ffffff',
                  })
                }
              />
            )}
          </Container>
        )}
      </Stage>
      {id !== undefined && <NextWaveButton onClick={() => run(account, ip.toString())} />}

      {id === undefined && <NewGame onClick={generateNewGame} onPseudoChange={setPseudo} />}

      <GameOverModal score={score} isOpen={isGameOver} onClose={() => setIsGameOver(false)} />
    </div>
  );
};

export default Canvas;
