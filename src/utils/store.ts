import { GridElement } from '@/types/GridElement';
import { create } from 'zustand';

interface State {
  ip: number | undefined;
  set_ip: (ip: number) => void;
  current_state: number;
  map: GridElement[][];
  set_current_state: (current_state: number) => void;
  set_map: (map: GridElement[][]) => void;
}

export const useElementStore = create<State>((set) => ({
  ip: undefined,
  hit_mob: undefined,
  map: [],
  set_ip: (ip: number) => set(() => ({ ip })),
  current_state: 1,
  set_current_state: (current_state: number) => set(() => ({ current_state })),
  set_map: (map: GridElement[][]) => set(() => ({ map })),
}));
