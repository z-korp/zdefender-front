import { useEventsStore } from '@/utils/eventsStore';
import { SPEED } from '@/utils/speed';
import { setComponent } from '@latticexyz/recs';
import { useEffect, useState } from 'react';

function EventProcessor() {
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
        //console.log('set', event.component, event.entityIndex, event.componentValues);
        console.log(event);
        setComponent(event.component, event.entityIndex, event.componentValues);
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
