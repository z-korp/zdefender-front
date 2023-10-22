import { MobType } from '@/utils/wave';
import * as PIXI from 'pixi.js';

import boarImage from './boar.png';
import borgImage from './borg.png';
import chickenImage from './chicken.png';
import blackdragonImage from './dragon.png';
import grumImage from './grum.png';
import katanImage from './katan.png';
import mammothImage from './mammoth.png';
import necromancerImage from './necromancer.png';
import orcImage from './orc.png';
import orcshamanImage from './orcshaman.png';
import reddemonImage from './reddemon.png';
import reddemonarmoredImage from './reddemonarmored.png';
import skeletonSoldierImage from './skeletonsoldier.png';
import speargoblinImage from './speargoblin.png';
import wendigoImage from './wendigo.png';
import yetiImage from './yeti.png';

PIXI.Texture.from(boarImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(borgImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(chickenImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(blackdragonImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(grumImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(katanImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(mammothImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(necromancerImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(orcImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(orcshamanImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(reddemonImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(reddemonarmoredImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(skeletonSoldierImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(speargoblinImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(wendigoImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(yetiImage).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

export const MobImages: Record<MobType, string> = {
  [MobType.CHICKEN]: chickenImage,
  [MobType.MAMMOTH]: mammothImage,
  [MobType.BOAR]: boarImage,
  [MobType.WENDIGO]: wendigoImage,
  [MobType.YETI]: yetiImage,
  [MobType.BORG]: borgImage,
  [MobType.RED_DEMON]: reddemonImage,
  [MobType.RED_DEMON_ARMORED]: reddemonarmoredImage,
  [MobType.NECROMANCER]: necromancerImage,
  [MobType.ORC]: orcImage,
  [MobType.SPEAR_GOBLIN]: speargoblinImage,
  [MobType.ORC_SHAMAN]: orcshamanImage,
  [MobType.GRUM]: grumImage,
  [MobType.KATAN]: katanImage,
  [MobType.SKELETON_SOLDIER]: skeletonSoldierImage,
  [MobType.DRAGON]: blackdragonImage,
};

PIXI.Texture.from(MobImages[MobType.CHICKEN]).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(MobImages[MobType.MAMMOTH]).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(MobImages[MobType.BOAR]).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
