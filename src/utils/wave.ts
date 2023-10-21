export enum MobCategory {
  NORMAL,
  ELITE,
  BOSS,
}

export enum MobType {
  CHICKEN = 'chicken',
  MAMMOTH = 'mammoth',
  BOAR = 'boar',
}

export interface WaveConfig {
  [MobCategory.NORMAL]: MobType;
  [MobCategory.ELITE]: MobType;
  [MobCategory.BOSS]: MobType;
}

const waves: WaveConfig[] = [
  {
    // WAVE 0
    [MobCategory.NORMAL]: MobType.CHICKEN,
    [MobCategory.ELITE]: MobType.BOAR,
    [MobCategory.BOSS]: MobType.MAMMOTH,
  },
  {
    // WAVE 1
    [MobCategory.NORMAL]: MobType.CHICKEN,
    [MobCategory.ELITE]: MobType.BOAR,
    [MobCategory.BOSS]: MobType.MAMMOTH,
  },
  {
    // WAVE 2
    [MobCategory.NORMAL]: MobType.CHICKEN,
    [MobCategory.ELITE]: MobType.BOAR,
    [MobCategory.BOSS]: MobType.MAMMOTH,
  },
];

export default waves;
