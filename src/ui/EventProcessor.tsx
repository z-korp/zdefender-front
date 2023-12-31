import { ComponentData, TransformedEvent, logTransformedEvent } from '@/dojo/createSystemCalls';
import { useEventsStore } from '@/utils/eventsStore';
import { setComponent } from '@latticexyz/recs';
import { useEffect, useState } from 'react';

function EventProcessor() {
  const SPEED = 2;
  const events = useEventsStore((state) => state.events);
  const setTick = useEventsStore((state) => state.setTick);

  const setEvents = useEventsStore((state) => state.setEvents); // Assuming you have a setter called `setEvents`
  const [currentTick, setCurrentTick] = useState<number>(0);

  useEffect(() => {
    // Define a function to process events
    const processEventsForTick = () => {
      const eventsForCurrentTick = events.filter((event) => event.tick === currentTick);

      // Process events for the current tick
      eventsForCurrentTick.forEach((event) => {
        logTransformedEvent(event);
        if (event.eventType === 'component') {
          const e = event as TransformedEvent & ComponentData;
          //console.log('setComponent', e.component, e.entityIndex, e.componentValues);
          setComponent(e.component, e.entityIndex, e.componentValues);
        } else {
          console.log('------------>', event);
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

    // Set up the interval
    const intervalId = setInterval(processEventsForTick, 1000 / SPEED);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [currentTick, events, setEvents]);

  useEffect(() => {
    setTick(currentTick);
  }, [currentTick]);

  return null;
}

export default EventProcessor;
