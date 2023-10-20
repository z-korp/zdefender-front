import { Sprite, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import React, { useEffect, useState } from 'react';
import gold from '../assets/gold.png';

interface GoldProps {
  number: number;
}

const Gold: React.FC<GoldProps> = ({ number }) => {
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
  const x = 20;
  const y = 20;

  return (
    <>
      <Sprite key={`sword`} image={gold} anchor={0.5} scale={1.5} x={x} y={y} />
      <Text
        text={`${Math.round(displayedNumber)}`}
        x={x + 20}
        y={y - 10}
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
  );
};

export default Gold;
