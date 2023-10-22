import { useDojo } from '@/DojoContext';
import useIp from '@/hooks/useIp';
import { useElementStore } from '@/utils/store';
import { useEffect, useRef, useState } from 'react';
import DoubleLeft from '../assets/icons/Double-Chevron-Arrow-Left.png';
import DoubleRight from '../assets/icons/Double-Chevron-Arrow-Right.png';
import Forward from '../assets/icons/Forward.png';
import PauseIcon from '../assets/icons/Pause.png';
import PlayIcon from '../assets/icons/Play.png';

function TickProcessor() {
  const {
    setup: {
      systemCalls: { iter },
    },
    account: { account },
  } = useDojo();
  const { ip, loading, error } = useIp();
  const { is_wave_running, speed, increment_speed, decrement_speed, set_is_wave_running } = useElementStore(
    (state) => state
  );

  const [currentTick, setCurrentTick] = useState<number>(0);
  const currentTickRef = useRef<number>(currentTick);
  const [isIncrementing, setIsIncrementing] = useState(false);

  useEffect(() => {
    currentTickRef.current = currentTick;
  }, [currentTick]);

  useEffect(() => {
    if (isIncrementing) {
      set_is_wave_running(true);
      const iterIntervalId = setInterval(() => {
        setCurrentTick((prevTick) => prevTick + 1);
        iter(account, ip.toString(), currentTickRef.current);
      }, 1000 / speed);

      return () => clearInterval(iterIntervalId);
    }
  }, [isIncrementing, speed]);

  useEffect(() => {
    console.log('is_wave_running', is_wave_running);
    if (!is_wave_running) {
      setIsIncrementing(false);
    }
  }, [is_wave_running]);

  const goToNextTick = () => {
    iter(account, ip.toString(), currentTickRef.current);
    setCurrentTick((prevTick) => prevTick + 1);
  };

  return (
    <div
      className="flex flex-col gap-1"
      style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)' }}
    >
      <div className="flex items-center justify-center text-sm">{`Speed x${speed}`}</div>
      <div className="flex gap-1">
        {/* Button to toggle incrementing */}
        <button
          className="cursor-pointer w-[46px] bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded flex justify-center items-center"
          onClick={() => setIsIncrementing((prev) => !prev)}
        >
          <img
            src={isIncrementing ? PauseIcon : PlayIcon}
            alt={isIncrementing ? 'Pause' : 'Play'}
            style={{ imageRendering: 'pixelated' }}
          />
        </button>

        <button
          disabled={isIncrementing}
          className={`cursor-pointer w-[46px] text-white font-bold py-2 px-4 rounded flex justify-center items-center ${
            isIncrementing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
          }`}
          onClick={goToNextTick}
        >
          <img src={Forward} alt={'Forward'} style={{ imageRendering: 'pixelated' }} />
        </button>

        <button
          disabled={speed <= 1}
          className={`cursor-pointer w-[46px] text-white font-bold py-2 px-4 rounded ${
            speed <= 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
          }`}
          onClick={decrement_speed}
        >
          <img src={DoubleLeft} alt={'SpeedPlus'} style={{ imageRendering: 'pixelated' }} />
        </button>

        <button
          disabled={speed >= 5}
          className={`cursor-pointer w-[46px] text-white font-bold py-2 px-4 rounded ${
            speed >= 5 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
          }`}
          onClick={increment_speed}
        >
          <img src={DoubleRight} alt={'SpeedMinus'} style={{ imageRendering: 'pixelated' }} />
        </button>
      </div>
    </div>
  );
}

export default TickProcessor;
