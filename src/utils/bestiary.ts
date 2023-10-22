import { MobCategory, MobType } from './wave';

export type MobCharacteristics = {
  health: (lvl: number) => number;
  speed: (lvl: number) => number;
  armor: (lvl: number) => number;
};

export const baseMobCharacteristic: Record<MobCategory, MobCharacteristics> = {
  [MobCategory.NORMAL]: {
    health: (lvl: number) => 100 * lvl,
    speed: (lvl: number) => 1,
    armor: (lvl: number) => 1 * lvl,
  },
  [MobCategory.ELITE]: {
    health: (lvl: number) => 200 * lvl,
    speed: (lvl: number) => 1,
    armor: (lvl: number) => 5 * lvl,
  },
  [MobCategory.BOSS]: {
    health: (lvl: number) => 300 * lvl,
    speed: (lvl: number) => 1,
    armor: (lvl: number) => 10 * lvl,
  },
};

export const bestiary: Record<MobType, { type: MobCategory; lvl: number }> = {
  [MobType.CHICKEN]: {
    type: MobCategory.NORMAL,
    lvl: 1,
  },
  [MobType.BOAR]: {
    type: MobCategory.ELITE,
    lvl: 1,
  },
  [MobType.MAMMOTH]: {
    type: MobCategory.BOSS,
    lvl: 1,
  },
};
