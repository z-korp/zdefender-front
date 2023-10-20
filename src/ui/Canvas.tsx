import { Container, Stage, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useEffect, useState } from 'react';
import { shortString } from 'starknet';
import { useComponentStates } from '../hooks/useComponentState';
import useIp from '../hooks/useIp';
import { HEIGHT, WIDTH } from '../utils/grid';
import { useElementStore } from '../utils/store';
import GameOverModal from './GameOverModal'; // importez le composant
import NewGame from './NewGame';
import { useDojo } from '@/DojoContext';

interface CanvasProps {
  setMusicPlaying: (bool: boolean) => void;
}

const Canvas: React.FC<CanvasProps> = ({ setMusicPlaying }) => {
  const {
    setup: {
      systemCalls: {},
      network: { graphSdk },
    },
    account: { account },
  } = useDojo();

  const contractState = useComponentStates();
  const { game } = contractState;

  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);

  const [isGameOver, setIsGameOver] = useState(false);

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
    /*create(
      account,
      ip,
      1000,
      pseudoFelt,
      add_hole,
      set_size,
      reset_holes,
      set_hit_mob,
      set_turn
    );*/
  };

  useEffect(() => {
    if (game.over === 1) {
      setIsGameOver(true);
    }
  }, [game.over]);

  //PIXI.Texture.from(heart).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  return (
    <div style={{ position: 'relative' }}>
      <Stage
        width={WIDTH}
        height={HEIGHT}
        options={{ backgroundColor: '#242424' }}
        onPointerMove={(e) => {
          //e.nativeEvent.offsetX
          //e.nativeEvent.offsetY
          console.log('onPointerMove');
        }}
        onPointerDown={(e) => {
          console.log('onPointerDown');
        }}
      >
        <Container sortableChildren={true}>
          {/*<Map hoveredTile={hoveredTile} />*/}

          <>
            <Text
              text={`STAGE: ${level}`}
              x={20}
              y={50}
              style={
                new PIXI.TextStyle({
                  align: 'center',
                  fontFamily: '"Press Start 2P", Helvetica, sans-serif',
                  fontSize: 20,
                  fontWeight: '400',
                  fill: '#ffffff',
                })
              }
            />
            <Text
              text={`SCORE: ${score}`}
              x={20}
              y={85}
              style={
                new PIXI.TextStyle({
                  align: 'center',
                  fontFamily: '"Press Start 2P", Helvetica, sans-serif',
                  fontSize: 20,
                  fontWeight: '400',
                  fill: '#ffffff',
                })
              }
            />
          </>
        </Container>
      </Stage>

      <NewGame onClick={generateNewGame} onPseudoChange={setPseudo} />

      <GameOverModal
        score={score}
        isOpen={isGameOver}
        onClose={() => setIsGameOver(false)}
      />
    </div>
  );
};

export default Canvas;
