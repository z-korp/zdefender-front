import { useDojo } from '@/DojoContext';
import { useGame } from '@/hooks/useGame';
import { Coordinate } from '@/types/GridElement';
import { TowerCategory } from '@/types/Tower';
import { getRange } from '@/utils/range';
import waves, { MobCategory } from '@/utils/wave';
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
import { BottomMenu } from './BottomMenu';
import { DefenderType } from './Defender';
import GameOverModal from './GameOverModal'; // importez le composant
import Gold from './Gold';
import Life from './Life';
import Map from './Map';
import MobBuilding from './Mob';
import MobsRemaining from './MobsRemaining';
import NewGame from './NewGame';
import NextWaveButton from './NextWaveButton';
import { PlayerTowerMenu } from './PlayerTowerMenu';
import TickProcessor from './TickProcessor';
import TileMarker from './TileMarker';
import TowerBuilding from './Tower';
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
      components: { Mob, Tower },
    },
    account: { account },
  } = useDojo();
  const { map } = useElementStore((state) => state);

  const { id, tick, over, wave, mob_remaining, mob_alive, gold, health } = useGame();
  const [currentAbsoluteTilePosition, setCurrentAbsoluteTilePosition] = useState<Coordinate | undefined>();

  const [score, setScore] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<DefenderType>('knight');
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

  const handleBuy = (type: DefenderType, x: number, y: number) => {
    const category =
      type === 'knight'
        ? TowerCategory.Barbarian
        : type === 'bowman'
        ? TowerCategory.Bowman
        : type === 'wizard'
        ? TowerCategory.Wizard
        : TowerCategory.Barbarian;
    build(account, ip.toString(), x, y, category);
  };

  const handleMenuClose = () => {
    console.log('handleMenuClose');
    setSelectedTile(undefined);
  };

  const [mobs, setMobs] = useState<any[]>([]);
  useEffect(() => {
    const mobEntities = getComponentEntities(Mob);
    const newMobs = [...mobEntities].map((key) => getComponentValue(Mob, key));
    console.log(newMobs);
    //console.log('newMobs', newMobs);

    // Filter out duplicates by "id" and different "key"
    const uniqueIdentifiers = new Set();
    const filteredMobs = newMobs
      .filter((mob) => mob.health > 0)
      .filter((mob) => {
        const identifier = `${mob.id}-${mob.key}`; // Create a combined identifier
        if (!uniqueIdentifiers.has(identifier)) {
          uniqueIdentifiers.add(identifier);
          return true;
        }
        return false;
      });

    setMobs(filteredMobs);
  }, [tick]);

  useEffect(() => {
    console.log('-----------> mobs', mobs);
  }, [mobs]);

  //console.log('filteredMobs', filteredMobs);

  /*useEffect(() => {
    console.log('mob_alive', mob_alive);
    if (mob_alive > 0) {
      const mobE = getComponentEntities(Mob);
      const a = [...mobE].map((key, index) => {
        if (index >= mob_alive) {
          console.log('DDDFFFFDFDFDFDFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');
          //removeComponent(Mob, key);
          return key;
        }
      });
      console.log('a', a);
    }
  }, [mob_alive]);*/

  const towerEntities = getComponentEntities(Tower);
  const newTowers = [...towerEntities].map((key) => getComponentValue(Tower, key));

  const { set_is_wave_running } = useElementStore((state) => state);

  return (
    <div style={{ position: 'relative' }}>
      {/* <EventProcessor2 /> */}
      <TickProcessor />
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
                x={870}
                y={0}
                selectedTile={selectedTile}
                isBuying={isBuying}
                onClose={() => setSelectedTile(undefined)}
                onBuy={handleBuy}
              />
              <PlayerTowerMenu x={870} y={350} />
            </>

            <Wave wave={wave} x={10} y={50} />
            <MobsRemaining remaining={mob_remaining} x={10} y={80} />
            <Gold number={gold} x={20} y={20} />
            <Life health={health} x={140} y={20} />

            {mobs.map((mob) => (
              <MobBuilding
                key={mob.id}
                id={mob.id}
                type={waves[wave][mob.category as MobCategory]}
                targetPosition={indexToCoordinate(mob.index)}
                health={mob.health}
              />
            ))}
            {newTowers.map((tower) => (
              <TowerBuilding
                type={
                  tower.category === TowerCategory.Barbarian
                    ? 'barbarian'
                    : tower.category === TowerCategory.Wizard
                    ? 'wizard'
                    : 'bowman'
                }
                targetPosition={indexToCoordinate(tower.index)}
                isHovered={hoveredTile ? areCoordsEqual({ x: 1, y: 1 }, hoveredTile) : false}
                isHitter={false}
              />
            ))}

            {selectedTile && currentAbsoluteTilePosition && (
              <>
                {range.map((r, index) => (
                  <>
                    {hoveredTile &&
                      to_grid_coordinate(currentAbsoluteTilePosition).x === hoveredTile.x &&
                      to_grid_coordinate(currentAbsoluteTilePosition).y === hoveredTile.y && (
                        <TowerButton x={currentAbsoluteTilePosition.x} y={currentAbsoluteTilePosition.y + 33} />
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
      {id !== undefined && <NextWaveButton onClick={() => /*run(account, ip.toString())*/ set_is_wave_running(true)} />}

      {id === undefined && <NewGame onClick={generateNewGame} onPseudoChange={setPseudo} />}

      <GameOverModal score={score} isOpen={isGameOver} onClose={() => setIsGameOver(false)} />
    </div>
  );
};

export default Canvas;
