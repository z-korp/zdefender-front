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
  const currentTickRef = useRef<number>(currentTick); // <-- create a ref

  useEffect(() => {
    currentTickRef.current = currentTick; // <-- update the ref value on state change
  }, [currentTick]);

  useEffect(() => {
    if (is_wave_running) {
      // Set up the interval to call iter every second
      const iterIntervalId = setInterval(() => {
        iter(account, ip.toString(), currentTickRef.current); // <-- use the ref value
        setCurrentTick((prevTick) => prevTick + 1);
      }, 1000 / SPEED);

      // Clear the interval when the component is unmounted
      return () => clearInterval(iterIntervalId);
    }
  }, [is_wave_running]);

  return null;
}

export default TickProcessor;
