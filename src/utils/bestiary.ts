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
  [MobType.SQUELETON_SOLDIER]: {
    type: MobCategory.NORMAL,
  },
  [MobType.RED_DEMON]: {
    type: MobCategory.ELITE,
  },
  [MobType.RED_DEMON_ARMORED]: {
    type: MobCategory.BOSS,
  },
  [MobType.NECROMANCER]: {
    type: MobCategory.BOSS,
  },
  [MobType.BORG]: {
    type: MobCategory.BOSS,
  },
  [MobType.ORC]: {
    type: MobCategory.NORMAL,
  },
  [MobType.SPEAR_OGOBLIN]: {
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
  [MobType.ORC_SHAMAN]: {
    type: MobCategory.BOSS,
  },
};
