import { useDojo } from '@/DojoContext';
import useIp from '@/hooks/useIp';
import { SPEED } from '@/utils/speed';
import { useElementStore } from '@/utils/store';
import { useEffect, useRef, useState } from 'react';

function TickProcessor() {
  const {
    setup: {
      systemCalls: { iter },
    },
    account: { account },
  } = useDojo();
  const { ip, loading, error } = useIp();
  const { is_wave_running } = useElementStore((state) => state);

  const [currentTick, setCurrentTick] = useState<number>(0);
  const currentTickRef = useRef<number>(currentTick);
  const [isIncrementing, setIsIncrementing] = useState(true); // <-- State to control incrementing

  useEffect(() => {
    currentTickRef.current = currentTick;
  }, [currentTick]);

  useEffect(() => {
    if (is_wave_running && isIncrementing) {
      // <-- Check if incrementing is allowed
      const iterIntervalId = setInterval(() => {
        iter(account, ip.toString(), currentTickRef.current);
        setCurrentTick((prevTick) => prevTick + 1);
      }, 1000 / SPEED);

      return () => clearInterval(iterIntervalId);
    }
  }, [is_wave_running, isIncrementing]); // <-- Include isIncrementing in dependency array

  return (
    <div>
      {/* Button to toggle incrementing */}
      <button onClick={() => setIsIncrementing((prev) => !prev)}>
        {isIncrementing ? 'Stop Incrementing' : 'Start Incrementing'}
      </button>
    </div>
  );
}

export default TickProcessor;
