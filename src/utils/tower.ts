export enum TowerCategory {
  BARBARIAN,
  BOWAN,
  WIZARD,
}

export type TowerCharacteristics = {
  basePrice: number;
  damage: number;
  speed: number;
  scale: number;
};

export const towerData: Record<TowerCategory, TowerCharacteristics> = {
  [TowerCategory.BARBARIAN]: {
    basePrice: 50,
    damage: 100,
    speed: 1,
    scale: 1.0,
  },
  [TowerCategory.BOWAN]: {
    basePrice: 50,
    damage: 100,
    speed: 1,
    scale: 1.0,
  },
  [TowerCategory.WIZARD]: {
    basePrice: 50,
    damage: 100,
    speed: 1,
    scale: 1.0,
  },
};
