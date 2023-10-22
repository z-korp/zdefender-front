import { MobType } from '@/utils/wave';
import * as PIXI from 'pixi.js';

import boarImage from './boar.png';
import borgImage from './borg.png';
import chickenImage from './chicken.png';
import dragonImage from './dragon.png';
import grumImage from './grum.png';
import katanImage from './katan.png';
import mammothImage from './mammoth.png';
import necroImage from './necro.png';
import orcImage from './orc.png';
import shamanImage from './shaman.png';
import demonImage from './demon.png';
import devilImage from './devil.png';
import skeletonImage from './skeleton.png';
import goblinImage from './goblin.png';
import wendigoImage from './wendigo.png';
import yetiImage from './yeti.png';

PIXI.Texture.from(boarImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(borgImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(chickenImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(dragonImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(grumImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(katanImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(mammothImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(necroImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(orcImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(shamanImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(demonImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(devilImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(skeletonImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(goblinImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(wendigoImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(yetiImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

export const MobImages: Record<MobType, string> = {
  [MobType.CHICKEN]: chickenImage,
  [MobType.MAMMOTH]: mammothImage,
  [MobType.BOAR]: boarImage,
  [MobType.WENDIGO]: wendigoImage,
  [MobType.YETI]: yetiImage,
  [MobType.BORG]: borgImage,
  [MobType.DEMON]: demonImage,
  [MobType.DEVIL]: devilImage,
  [MobType.NECRO]: necroImage,
  [MobType.ORC]: orcImage,
  [MobType.GOBLIN]: goblinImage,
  [MobType.SHAMAN]: shamanImage,
  [MobType.GRUM]: grumImage,
  [MobType.KATAN]: katanImage,
  [MobType.SKELETON]: skeletonImage,
  [MobType.DRAGON]: dragonImage,
};

PIXI.Texture.from(MobImages[MobType.CHICKEN]).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(MobImages[MobType.MAMMOTH]).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(MobImages[MobType.BOAR]).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
