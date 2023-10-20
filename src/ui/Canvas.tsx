import { useDojo } from '@/DojoContext';
import { Coordinate } from '@/types/GridElement';
import { Container, Stage } from '@pixi/react';
import { useEffect, useState } from 'react';
import { shortString } from 'starknet';
import { useComponentStates } from '../hooks/useComponentState';
import useIp from '../hooks/useIp';
import { HEIGHT, WIDTH, areCoordsEqual, to_grid_coordinate } from '../utils/grid';
import { useElementStore } from '../utils/store';
import Animal from './Animal';
import { BottomMenu } from './BottomMenu';
import GameOverModal from './GameOverModal'; // importez le composant
import Gold from './Gold';
import Life from './Life';
import Map from './Map';
import MobsRemaining from './MobsRemaining';
import NewGame from './NewGame';
import NextWaveButton from './NextWaveButton';
import Tower from './Tower';
import Wave from './Wave';

interface CanvasProps {
  setMusicPlaying: (bool: boolean) => void;
}

const Canvas: React.FC<CanvasProps> = ({ setMusicPlaying }) => {
  const {
    setup: {
      systemCalls: { create, run },
      network: { graphSdk },
    },
    account: { account },
  } = useDojo();

  const contractState = useComponentStates();
  const { game } = contractState;

  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [hoveredTile, setHoveredTile] = useState<Coordinate | undefined>(undefined);
  const [selectedTile, setSelectedTile] = useState<Coordinate | undefined>(undefined);
  const [isGameOver, setIsGameOver] = useState(false);
  const [absolutePosition, setAbsolutePosition] = useState<Coordinate | undefined>(undefined);
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
    if (game && game.over === 1) {
      setIsGameOver(true);
    }
  }, [game]);

  const handleTileClick = (tile: Coordinate) => {
    setSelectedTile(tile);
  };

  const handleMenuClose = () => {
    console.log('handleMenuClose');
    setSelectedTile(undefined);
  };

  return (
    <div style={{ position: 'relative' }}>
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
            setAbsolutePosition({
              x: e.nativeEvent.offsetX,
              y: e.nativeEvent.offsetY,
            });
          }

          // console.log('grid_coordinate', grid_coordinate);
          // console.log('onPointerMove');
        }}
        onPointerDown={(e) => {
          if (absolutePosition && absolutePosition.x > 760 && absolutePosition.y < 55) {
            console.log('onPointerDown');
            setSelectedTile(undefined);
          }
          if (hoveredTile!.x > 7 || hoveredTile!.y > 7 || hoveredTile!.x < 0 || hoveredTile!.y < 0) {
            console.log('OUT OF THE MAP');
            // setSelectedTile(undefined);
          } else {
            console.log('hoveredTile', hoveredTile);
            setSelectedTile(hoveredTile ? hoveredTile : undefined);
          }
        }}
      >
        {game !== undefined && (
          <Container sortableChildren={true}>
            <>
              <Map />
              <BottomMenu selectedTile={selectedTile} onClose={handleMenuClose} />
            </>

            <Tower
              type="knight"
              targetPosition={{ x: 1, y: 1 }}
              isHovered={hoveredTile ? areCoordsEqual({ x: 1, y: 1 }, hoveredTile) : false}
              isHitter={false}
            />
            <Wave wave={game.wave} x={10} y={50} />
            <MobsRemaining remaining={game.mob_remaining} x={10} y={80} />
            <Gold number={game.gold} x={20} y={20} />
            <Life health={game.health} x={140} y={20} />
            <Animal type={'chicken'} targetPosition={{ x: 2, y: 2 }} health={70} />
          </Container>
        )}
      </Stage>
      {game !== undefined && <NextWaveButton onClick={() => run(account, ip.toString())} />}

      {game === undefined && <NewGame onClick={generateNewGame} onPseudoChange={setPseudo} />}

      <GameOverModal score={score} isOpen={isGameOver} onClose={() => setIsGameOver(false)} />
    </div>
  );
};

export default Canvas;
