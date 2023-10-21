import { useElementStore } from '@/utils/store';
import { useComponentValue } from '@dojoengine/react';
import { EntityIndex } from '@latticexyz/recs';
import { useEffect } from 'react';
import { useDojo } from '../DojoContext';

export const useGame = () => {
  const {
    setup: {
      components: { Game, Mob, Tower },
    },
  } = useDojo();

  const { ip, set_is_wave_running } = useElementStore((state) => state);

  const entityId = ip as EntityIndex;

  const game = useComponentValue(Game, entityId);

  useEffect(() => {
    if (game && (game.over || (game.mob_remaining === 0 && game.mob_alive === 0))) {
      set_is_wave_running(false);
    }
  }, [game]);

  return {
    key: game?.key,
    id: game?.id,
    name: game?.name,
    over: game?.over,
    tower_count: game?.tower_count,
    mob_count: game?.mob_count,
    mob_remaining: game?.mob_remaining,
    mob_alive: game?.mob_alive,
    wave: game?.wave,
    gold: game?.gold,
    health: game?.health,
    tick: game?.tick,
  };
};
