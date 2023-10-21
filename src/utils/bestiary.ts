import { MobType } from './wave';

export type MobCharacteristics = {
  health: number;
  speed: number;
  armor: number;
  scale: number;
};

export const bestiary: Record<MobType, MobCharacteristics> = {
  [MobType.CHICKEN]: {
    health: 100,
    speed: 1,
    armor: 1,
    scale: 1.0,
  },
  [MobType.BOAR]: {
    health: 200,
    speed: 1,
    armor: 5,
    scale: 1.0,
  },
  [MobType.MAMMOTH]: {
    health: 500,
    speed: 1,
    armor: 10,
    scale: 1.0,
  },
};
