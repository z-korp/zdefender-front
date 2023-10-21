import { useEventsStore } from '@/utils/eventsStore';
import { setComponent } from '@latticexyz/recs';
import { useEffect, useState } from 'react';

function EventProcessor2() {
  const events = useEventsStore((state) => state.events);
  const setTick = useEventsStore((state) => state.setTick);
  const setEvents = useEventsStore((state) => state.setEvents);
  const [currentTick, setCurrentTick] = useState<number>(1);

  // Process events for a given tick
  const processEventsForTick = () => {
    console.log('currentTick', currentTick);
    console.log('events', events);
    const eventsForCurrentTick = events.filter((event) => event.tick === currentTick);
    console.log('eventsForCurrentTick', eventsForCurrentTick);

    // Process events for the current tick
    eventsForCurrentTick.forEach((event) => {
      console.log(event);
      setComponent(event.component, event.entityIndex, event.componentValues);
    });

    // Check if there are events for the next tick
    const hasEventsForNextTick = events.some((event) => event.tick === currentTick + 1);

    if (hasEventsForNextTick) {
      setCurrentTick((prevTick) => prevTick + 1);
    } else {
      console.log('-----------------> reset');
      setEvents([]); // Reset the events in the store
    }
  };

  useEffect(() => {
    setTick(currentTick);
  }, [currentTick]);

  return <button onClick={processEventsForTick}>Next Tick</button>;
}

export default EventProcessor2;
