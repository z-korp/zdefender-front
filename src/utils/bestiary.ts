import { MobCategory, MobType } from './wave';

export type MobCharacteristics = {
  health: (lvl: number) => number;
  speed: (lvl: number) => number;
  armor: (lvl: number) => number;
};

export const baseMobCharacteristic: Record<MobCategory, MobCharacteristics> = {
  [MobCategory.NORMAL]: {
    health: (lvl: number) => 100 + lvl * 10,
    speed: (lvl: number) => 100 + lvl * 10,
    armor: (lvl: number) => 100 + lvl * 10,
  },
  [MobCategory.ELITE]: {
    health: (lvl: number) => 200 + lvl * 10,
    speed: (lvl: number) => 100 + lvl * 10,
    armor: (lvl: number) => 100 + lvl * 10,
  },
  [MobCategory.BOSS]: {
    health: (lvl: number) => 300 + lvl * 10,
    speed: (lvl: number) => 100 + lvl * 10,
    armor: (lvl: number) => 100 + lvl * 10,
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
