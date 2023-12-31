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

export const bestiary: Record<MobType, { type: MobCategory }> = {
  [MobType.CHICKEN]: {
    type: MobCategory.NORMAL,
  },
  [MobType.BOAR]: {
    type: MobCategory.ELITE,
  },
  [MobType.MAMMOTH]: {
    type: MobCategory.BOSS,
  },
  [MobType.WENDIGO]: {
    type: MobCategory.BOSS,
  },
  [MobType.YETI]: {
    type: MobCategory.BOSS,
  },
  [MobType.SKELETON]: {
    type: MobCategory.NORMAL,
  },
  [MobType.DEMON]: {
    type: MobCategory.ELITE,
  },
  [MobType.DEVIL]: {
    type: MobCategory.BOSS,
  },
  [MobType.NECRO]: {
    type: MobCategory.BOSS,
  },
  [MobType.BORG]: {
    type: MobCategory.BOSS,
  },
  [MobType.ORC]: {
    type: MobCategory.NORMAL,
  },
  [MobType.GOBLIN]: {
    type: MobCategory.ELITE,
  },
  [MobType.GRUM]: {
    type: MobCategory.BOSS,
  },
  [MobType.KATAN]: {
    type: MobCategory.BOSS,
  },
  [MobType.DRAGON]: {
    type: MobCategory.BOSS,
  },
  [MobType.SHAMAN]: {
    type: MobCategory.BOSS,
  },
};
