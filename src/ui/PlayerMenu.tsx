import { useElementStore } from '@/utils/store';
import { Container, Graphics, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import Gold from './Gold';
import Life from './Life';
import MobsRemaining from './MobsRemaining';
import Score from './Score';
import Wave from './Wave';

interface PlayerMenuProps {
  x: number;
  y: number;
  name: string;
  mob_remaining: number;
  gold: number;
  health: number;
  score: number;
}

export const PlayerMenu: React.FC<PlayerMenuProps> = ({ x, y, name, mob_remaining, gold, health, score }) => {
  const { wave } = useElementStore((state) => state);

  if (wave === undefined) return null;

  return (
    <Container x={x} y={y}>
      <Graphics
        draw={(g) => {
          g.clear();
          g.lineStyle(2, 0xffffff);
          g.drawRect(0, 0, 315, 250); // Adjust based on the container's position
        }}
      />
      <Text
        text={name}
        x={157}
        y={30}
        anchor={0.5}
        style={
          new PIXI.TextStyle({
            align: 'center',
            fontFamily: '"Press Start 2P", Helvetica, sans-serif',
            fontSize: 22,
            fontWeight: '400',
            fill: '#ffffff',
          })
        }
      />

      <Gold number={gold} x={40} y={70} />
      <Life health={health} x={140} y={70} />

      <Score score={score} x={30} y={100} />
      <Wave wave={wave} x={30} y={130} />
      <MobsRemaining remaining={mob_remaining} x={30} y={160} />
    </Container>
  );
};
