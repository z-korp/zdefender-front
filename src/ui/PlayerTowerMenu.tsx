import { Container, Graphics, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { DefenderType } from './Defender';

interface PlayerTowerMenuProps {
  x: number;
  y: number;
}

export const PlayerTowerMenu: React.FC<PlayerTowerMenuProps> = ({ x, y }) => {
  const defenderTypes = ['barbarian', 'bowman', 'wizard'] as DefenderType[];

  return (
    <Container>
      <Graphics
        draw={(g) => {
          g.clear();
          g.lineStyle(2, 0xffffff); // 2 is the thickness of the line, 0xffffff is white color
          g.drawRect(x, y, 315, 162); // Adjust the rectangle dimensions and position as needed
        }}
      />
      <Text
        text={`TOWER`}
        x={x + 100}
        y={y + 10}
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
    </Container>
  );
};
