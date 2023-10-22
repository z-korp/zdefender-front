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
  RED_DEMON = 'reddemon',
  RED_DEMON_ARMORED = 'reddemonarmored',
  NECROMANCER = 'necromancer',
  ORC = 'orc',
  SPEAR_GOBLIN = 'speargoblin',
  ORC_SHAMAN = 'orcshaman',
  GRUM = 'grum',
  KATAN = 'katan',
  SQUELETON_SOLDIER = 'squeletonsoldier',
  DRAGON = 'dragon',
}

export interface WaveConfig {
  [MobCategory.NORMAL]: MobType;
  [MobCategory.ELITE]: MobType;
  [MobCategory.BOSS]: MobType;
}

const waves: WaveConfig[] = [
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
    [MobCategory.NORMAL]: MobType.BORG,
    [MobCategory.ELITE]: MobType.RED_DEMON,
    [MobCategory.BOSS]: MobType.RED_DEMON_ARMORED,
  },
  {
    // WAVE 5
    [MobCategory.NORMAL]: MobType.BORG,
    [MobCategory.ELITE]: MobType.RED_DEMON,
    [MobCategory.BOSS]: MobType.NECROMANCER,
  },
  {
    // WAVE 6
    [MobCategory.NORMAL]: MobType.BORG,
    [MobCategory.ELITE]: MobType.RED_DEMON,
    [MobCategory.BOSS]: MobType.MINOTAUR,
  },
  {
    // WAVE 7
    [MobCategory.NORMAL]: MobType.ORC,
    [MobCategory.ELITE]: MobType.SPEAR_OGOBLIN,
    [MobCategory.BOSS]: MobType.ORC_SHAMAN,
  },
  {
    // WAVE 8
    [MobCategory.NORMAL]: MobType.ORC,
    [MobCategory.ELITE]: MobType.SPEAR_OGOBLIN,
    [MobCategory.BOSS]: MobType.GRUM,
  },
  {
    // WAVE 9
    [MobCategory.NORMAL]: MobType.ORC,
    [MobCategory.ELITE]: MobType.SPEAR_OGOBLIN,
    [MobCategory.BOSS]: MobType.KATAN,
  },
  {
    // WAVE 10
    [MobCategory.NORMAL]: MobType.YETI,
    [MobCategory.ELITE]: MobType.MINOTAUR,
    [MobCategory.BOSS]: MobType.DRAGON,
  },
];

export default waves;
