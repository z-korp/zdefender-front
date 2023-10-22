import { useDojo } from '@/DojoContext';
import { useGame } from '@/hooks/useGame';
import { Coordinate } from '@/types/GridElement';
import { getRange } from '@/utils/range';
import { TowerCategory } from '@/utils/tower';
import waves, { MobCategory } from '@/utils/wave';
import { getComponentEntities, getComponentValue } from '@latticexyz/recs';
import { Container, Stage, Text } from '@pixi/react';
import { sound } from '@pixi/sound';
import * as PIXI from 'pixi.js';
import { useEffect, useState } from 'react';
import { shortString } from 'starknet';
import useIp from '../hooks/useIp';
import {
  HEIGHT,
  WIDTH,
  areCoordsEqual,
  coordinateToIndex,
  indexToCoordinate,
  to_absolute_coordinate,
  to_grid_coordinate,
} from '../utils/grid';
import { useElementStore } from '../utils/store';
import { BestiaryMenu } from './BestiaryMenu';
import { BuyTowerMenu } from './BuyTowerMenu';
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
import Score from './Score';
import TickProcessor from './TickProcessor';
import TileMarker from './TileMarker';
import TowerBuilding from './Tower';
import { TowerAsset } from './TowerAsset';
import Wave from './Wave';
import { fetchData } from '@/utils/fetchData';

interface CanvasProps {
  setMusicPlaying: (bool: boolean) => void;
}

const Canvas: React.FC<CanvasProps> = ({ setMusicPlaying }) => {
  const {
    setup: {
      systemCalls: { create, build, upgrade, sell },
      network: { graphSdk },
      components: { Mob, Tower },
    },
    account: { account },
  } = useDojo();
  const {
    map,
    set_is_wave_running,
    is_building,
    set_ip,
    selectedType,
    set_is_building,
    hits,
    setHits,
    add_to_leaderboard,
  } = useElementStore((state) => state);

  const { id, tick, over, wave, mob_remaining, gold, health, towers, score } = useGame();

  useEffect(() => {
    sound.add('build', './assets/build-1.mp3');
    sound.add('gold', './assets/gold.mp3');
  }, []);

  useEffect(() => {
    sound.play('gold');
  }, [gold]);

  const [hoveredTile, setHoveredTile] = useState<Coordinate | undefined>(undefined);
  const [hoveredTileType, setHoveredTileType] = useState<string | undefined>(undefined);
  const [hoveredTileAbsolute, setHoveredTileAbsolute] = useState<Coordinate | undefined>(undefined);

  const [selectedTile, setSelectedTile] = useState<Coordinate | undefined>(undefined);
  const [isGameOver, setIsGameOver] = useState(false);
  const [absolutePosition, setAbsolutePosition] = useState<Coordinate | undefined>(undefined);

  const [pseudo, setPseudo] = useState('');

  const { ip, loading, error } = useIp();
  useEffect(() => {
    if (!loading && ip) {
      set_ip(ip);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ip, loading]);

  const generateNewGame = async () => {
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
    if (is_building && hoveredTile) {
      const newRange = getRange(selectedType, hoveredTile, map);
      setRange(newRange);
    } else {
      setRange([]); // clear range if no tile is hovered
    }
  }, [is_building, hoveredTile, selectedType, map]);

  useEffect(() => {
    if (hoveredTile) setHoveredTileAbsolute(to_absolute_coordinate(hoveredTile));
  }, [hoveredTile]);

  const handleBuy = (type: DefenderType, x: number, y: number) => {
    const category =
      type === 'knight'
        ? TowerCategory.BARBARIAN
        : type === 'bowman'
        ? TowerCategory.BOWMAN
        : type === 'wizard'
        ? TowerCategory.WIZARD
        : TowerCategory.BARBARIAN;
    build(account, ip.toString(), x, y, category);
    set_is_building(false);
    sound.play('build');
  };

  useEffect(() => {
    const fetchAndProcessData = async () => {
      console.log(graphSdk);
      const array = await fetchData(graphSdk);
      array.forEach((e: any) => add_to_leaderboard(e));
    };

    fetchAndProcessData();
  }, [isGameOver]);

  const [mobs, setMobs] = useState<any[]>([]);
  useEffect(() => {
    const mobEntities = getComponentEntities(Mob);
    const newMobs = [...mobEntities].map((key) => getComponentValue(Mob, key));
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
    if (towers.length === 1) setSelectedTower(towers[0]);
    else if (towers.length === 0) setSelectedTower(undefined);
  }, [towers]);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      set_is_building(false);
    };

    // Add the event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup: remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const [selectedTower, setSelectedTower] = useState<any>(undefined);

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
          if (map.length === 0) return;
          if (hoveredTile === undefined || !areCoordsEqual(hoveredTile, tileGridCoords)) {
            if (tileGridCoords.x >= 0 && tileGridCoords.x <= 7 && tileGridCoords.y >= 0 && tileGridCoords.y <= 7) {
              setHoveredTileType(map[tileGridCoords.y][tileGridCoords.x].type);
              setHoveredTile(tileGridCoords);
              setAbsolutePosition({
                x: e.nativeEvent.offsetX,
                y: e.nativeEvent.offsetY,
              });
            } else {
              //set_is_building(false);
              setHoveredTileType(undefined);
              setHoveredTile(undefined);
            }
          }
        }}
        onPointerDown={(e) => {
          const tileX = Math.round(e.nativeEvent.offsetX);
          const tileY = Math.round(e.nativeEvent.offsetY);

          const tileCoords = { x: tileX, y: tileY };
          const tileGridCoords = to_grid_coordinate(tileCoords);

          if (is_building) {
            if (tileGridCoords.x > 7 || tileGridCoords.y > 7 || tileGridCoords.x < 0 || tileGridCoords.y < 0) {
              console.log('est out');
              // setSelectedTile(undefined);
            } else {
              const hoveredTileType = map[tileGridCoords.y][tileGridCoords.x];

              if (hoveredTileType.type !== 'road') {
                handleBuy(selectedType, tileGridCoords.x, tileGridCoords.y);
              }

              setSelectedTile(hoveredTile ? hoveredTile : undefined);
            }
          } else {
            // tower selection
            console.log('SELECT', tileGridCoords);
            const clickedIndex = coordinateToIndex(tileGridCoords);
            const index = towers.findIndex((tower) => tower.index === clickedIndex);
            if (index !== -1) {
              setSelectedTower(towers[index]);
            }
          }
        }}
      >
        {id !== undefined && (
          <Container sortableChildren={true}>
            <>
              <Map />
              <BestiaryMenu x={15} y={202} />
              <BuyTowerMenu x={870} y={0} />
              {selectedTower && (
                <PlayerTowerMenu
                  x={870}
                  y={320}
                  tower={selectedTower}
                  onUpgrade={() => upgrade(account, ip.toString(), selectedTower.id)}
                  onSell={() => sell(account, ip.toString(), selectedTower.key)}
                  towerComponent={Tower}
                />
              )}
            </>

            <Wave wave={wave} x={10} y={50} />
            <MobsRemaining remaining={mob_remaining} x={10} y={80} />
            <Gold number={gold} x={20} y={20} />
            <Life health={health} x={140} y={20} />
            <Score score={score} x={10} y={110} />

            {mobs.map((mob) => (
              <MobBuilding
                key={mob.id}
                id={mob.id}
                type={waves[Math.min(wave - 1, 9)][mob.category as MobCategory]}
                targetPosition={indexToCoordinate(mob.index)}
                health={mob.health}
              />
            ))}
            {towers.map((tower) => {
              // console.log('tower', tower);
              const hitIndex = hits.filter((x) => x.fromid == tower.id)[0];
              const hitPosition = indexToCoordinate(hitIndex?.toindex ?? 0);

              return (
                <TowerBuilding
                  key={tower.id}
                  type={
                    tower.category === TowerCategory.BARBARIAN
                      ? 'barbarian'
                      : tower.category === TowerCategory.WIZARD
                      ? 'wizard'
                      : 'bowman'
                  }
                  targetPosition={indexToCoordinate(tower.index)}
                  isHovered={hoveredTile ? areCoordsEqual(indexToCoordinate(tower.index), hoveredTile) : false}
                  isHitter={hits.filter((x) => x.fromid == tower.id).length > 0}
                  hitPosition={hitPosition}
                  // hitPosition={{ x: 1, y: 1 }}
                  index={tower.index}
                  level={tower.level}
                />
              );
            })}

            {/* display buying tower range */}
            {is_building && hoveredTile && (
              <>
                {/* if not road, we display range */}
                {hoveredTile &&
                  hoveredTileType &&
                  hoveredTileType !== 'road' &&
                  range.map((r, index) => <TileMarker key={index} x={r.x} y={r.y} color={'cyan'} />)}
                {/* otherwise a red marker */}
                {hoveredTile &&
                  hoveredTileType &&
                  hoveredTileType === 'road' &&
                  range.map((r, index) => <TileMarker key={index} x={r.x} y={r.y} color={'red'} />)}
                <TowerAsset
                  type={selectedType}
                  x={to_absolute_coordinate(hoveredTile).x}
                  y={to_absolute_coordinate(hoveredTile).y}
                />
              </>
            )}

            {import.meta.env.VITE_PUBLIC_DEBUG && (
              <Text
                text={`(${hoveredTile?.x}, ${hoveredTile?.y})`}
                x={10}
                y={520}
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
                y={550}
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
