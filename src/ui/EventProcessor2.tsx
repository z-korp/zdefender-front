import { ComponentData, TransformedEvent, logTransformedEvent } from '@/dojo/createSystemCalls';
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
    console.log('--------------------> Tick: ', currentTick);
    const eventsForCurrentTick = events.filter((event) => event.tick === currentTick);

    // Process events for the current tick
    eventsForCurrentTick.forEach((event) => {
      logTransformedEvent(event);
      if (event.eventType === 'component') {
        const e = event as TransformedEvent & ComponentData;
        setComponent(e.component, e.entityIndex, e.componentValues);
      } else {
        //console.log('------------>', event);
      }
    });

    // Check if there are events for the next tick
    const hasEventsForNextTick = events.some((event) => event.tick === currentTick + 1);

    if (hasEventsForNextTick) {
      setCurrentTick((prevTick) => prevTick + 1);
    } else {
      setEvents([]); // Reset the events in the store
    }
  };

  useEffect(() => {
    setTick(currentTick);
  }, [currentTick]);

  return <button onClick={processEventsForTick}>Next Tick</button>;
}

export default EventProcessor2;
