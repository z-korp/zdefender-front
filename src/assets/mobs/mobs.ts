import { MobType } from '@/utils/wave';
import * as PIXI from 'pixi.js';

import boarImage from './boar.png';
import chickenImage from './chicken.png';
import mammothImage from './mammoth.png';

export const MobImages: Record<MobType, string> = {
  [MobType.CHICKEN]: chickenImage,
  [MobType.MAMMOTH]: mammothImage,
  [MobType.BOAR]: boarImage,
};

PIXI.Texture.from(MobImages[MobType.CHICKEN]).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(MobImages[MobType.MAMMOTH]).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
PIXI.Texture.from(MobImages[MobType.BOAR]).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
