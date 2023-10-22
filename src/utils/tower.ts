export enum TowerCategory {
  BARBARIAN,
  BOWMAN,
  WIZARD,
}

export type TowerCharacteristics = {
  price: (lvl: number) => number;
  damage: (lvl: number) => number;
  speed: number;
  range: number;
  cooldown: number;
};

export const towerData: Record<TowerCategory, TowerCharacteristics> = {
  [TowerCategory.BARBARIAN]: {
    price: (lvl) => 50 * lvl,
    damage: (lvl) => 100 * lvl,
    speed: 1,
    cooldown: 2,
    range: 1,
  },
  [TowerCategory.BOWMAN]: {
    price: (lvl) => 50 * lvl,
    damage: (lvl) => 200 * lvl,
    speed: 1,
    cooldown: 2,
    range: 2,
  },
  [TowerCategory.WIZARD]: {
    price: (lvl) => 150 * lvl,
    damage: (lvl) => 150 * lvl,
    speed: 1,
    cooldown: 1,
    range: 2,
  },
};
