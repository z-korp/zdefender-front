import { GridElement } from '@/types/GridElement';
import { DefenderType } from '@/ui/Defender';
import { create } from 'zustand';

export interface HitEvent {
  eventType: string;
  gameId: number;
  tick: number;
  fromindex: number;
  toindex: number;
  fromid: number;
  toid: number;
  damage: number;
}

interface State {
  ip: number | undefined;
  set_ip: (ip: number) => void;
  current_state: number;
  map: GridElement[][];
  set_current_state: (current_state: number) => void;
  set_map: (map: GridElement[][]) => void;
  build_menu: boolean;
  set_build_menu: (build_menu: boolean) => void;
  selectedType: DefenderType;
  setSelectedType: (selectedType: DefenderType) => void;
  is_wave_running: boolean;
  set_is_wave_running: (is_wave_running: boolean) => void;
  is_building: boolean;
  set_is_building: (is_building: boolean) => void;
  total_gold: number;
  set_total_gold: (total_gold: number) => void;
  wave: number;
  set_wave: (wave: number) => void;
  hits: HitEvent[];
  setHits: (hits: HitEvent[]) => void;
  removeFirstHit: () => void;
}

export const useElementStore = create<State>((set) => ({
  ip: undefined,
  hit_mob: undefined,
  map: [],
  set_ip: (ip: number) => set(() => ({ ip })),
  current_state: 1,
  set_current_state: (current_state: number) => set(() => ({ current_state })),
  set_map: (map: GridElement[][]) => set(() => ({ map })),
  build_menu: false,
  set_build_menu: (build_menu: boolean) => set(() => ({ build_menu })),
  selectedType: 'knight',
  setSelectedType: (selectedType: DefenderType) => set(() => ({ selectedType })),
  is_wave_running: false,
  set_is_wave_running: (is_wave_running: boolean) => set(() => ({ is_wave_running })),
  is_building: false,
  set_is_building: (is_building: boolean) => set(() => ({ is_building })),
  total_gold: 0,
  set_total_gold: (total_gold: number) => set(() => ({ total_gold })),
  wave: 0,
  set_wave: (wave: number) => set(() => ({ wave })),
  hits: [],
  setHits: (newHits: HitEvent[]) => set(() => ({ hits: newHits })),
  removeFirstHit: () => set((state) => ({ hits: state.hits.slice(1) })),
}));
