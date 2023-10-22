import { Sprite, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import React, { useEffect, useState } from 'react';
import gold from '../assets/gold.png';

interface GoldSmallProps {
  number: number;
  x: number;
  y: number;
  color?: string;
}

const GoldSmall: React.FC<GoldSmallProps> = ({ number, x, y, color }) => {
  const [displayedNumber, setDisplayedNumber] = useState<number>(number);

  useEffect(() => {
    const duration = 1000; // 1 second
    const stepTime = 16; // approx. 60fps
    const steps = duration / stepTime;
    const increment = (number - displayedNumber) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps) {
        setDisplayedNumber((prevNumber) => prevNumber + increment);
      } else {
        setDisplayedNumber(number);
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval); // cleanup on unmount or if component updates
  }, [number]);

  PIXI.Texture.from(gold).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  return (
    <>
      <Sprite key={`sword`} image={gold} anchor={0.5} scale={0.75} x={x} y={y} />
      <Text
        text={`${Math.round(displayedNumber)}`}
        x={x + 9}
        y={y - 5}
        style={
          new PIXI.TextStyle({
            align: 'center',
            fontFamily: '"Press Start 2P", Helvetica, sans-serif',
            fontSize: 10,
            fontWeight: '400',
            fill: color ? color : '#ffffff',
          })
        }
      />
    </>
  );
};

export default GoldSmall;
