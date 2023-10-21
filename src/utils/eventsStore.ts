import { TransformedEvent } from '@/dojo/createSystemCalls';
import create from 'zustand';

type EventState = {
  events: TransformedEvent[];
  setEvents: (events: TransformedEvent[]) => void;
  tick: number;
  setTick: (tick: number) => void;
};

export const useEventsStore = create<EventState>((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
  tick: 0,
  setTick: (tick) => set({ tick }),
}));
