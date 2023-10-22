export enum MobCategory {
  NORMAL,
  ELITE,
  BOSS,
}

export enum MobType {
  CHICKEN = 'chicken',
  BOAR = 'boar',
  MAMMOTH = 'mammoth',
  WENDIGO = 'wendigo',
  YETI = 'yeti',
  BORG = 'borg',
  DEMON = 'demon',
  DEVIL = 'devil',
  NECRO = 'necro',
  ORC = 'orc',
  GOBLIN = 'goblin',
  SHAMAN = 'shaman',
  GRUM = 'grum',
  KATAN = 'katan',
  SKELETON = 'skeleton',
  DRAGON = 'dragon',
}

export interface WaveConfig {
  [MobCategory.NORMAL]: MobType;
  [MobCategory.ELITE]: MobType;
  [MobCategory.BOSS]: MobType;
}

export const waves: WaveConfig[] = [
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
    [MobCategory.BOSS]: MobType.WENDIGO,
  },
  {
    // WAVE 3
    [MobCategory.NORMAL]: MobType.CHICKEN,
    [MobCategory.ELITE]: MobType.BOAR,
    [MobCategory.BOSS]: MobType.YETI,
  },
  {
    // WAVE 4
    [MobCategory.NORMAL]: MobType.SKELETON,
    [MobCategory.ELITE]: MobType.DEMON,
    [MobCategory.BOSS]: MobType.DEVIL,
  },
  {
    // WAVE 5
    [MobCategory.NORMAL]: MobType.SKELETON,
    [MobCategory.ELITE]: MobType.DEMON,
    [MobCategory.BOSS]: MobType.NECRO,
  },
  {
    // WAVE 6
    [MobCategory.NORMAL]: MobType.SKELETON,
    [MobCategory.ELITE]: MobType.DEMON,
    [MobCategory.BOSS]: MobType.BORG,
  },
  {
    // WAVE 7
    [MobCategory.NORMAL]: MobType.ORC,
    [MobCategory.ELITE]: MobType.GOBLIN,
    [MobCategory.BOSS]: MobType.SHAMAN,
  },
  {
    // WAVE 8
    [MobCategory.NORMAL]: MobType.ORC,
    [MobCategory.ELITE]: MobType.GOBLIN,
    [MobCategory.BOSS]: MobType.GRUM,
  },
  {
    // WAVE 9
    [MobCategory.NORMAL]: MobType.ORC,
    [MobCategory.ELITE]: MobType.GOBLIN,
    [MobCategory.BOSS]: MobType.KATAN,
  },
  {
    // WAVE 10
    [MobCategory.NORMAL]: MobType.YETI,
    [MobCategory.ELITE]: MobType.BORG,
    [MobCategory.BOSS]: MobType.DRAGON,
  },
];

export default waves;
