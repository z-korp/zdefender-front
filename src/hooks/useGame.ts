import { useElementStore } from '@/utils/store';
import { useComponentValue } from '@dojoengine/react';
import { EntityIndex } from '@latticexyz/recs';
import { useEffect } from 'react';
import { useDojo } from '../DojoContext';

export const useGame = () => {
  const {
    setup: {
      components: { Game },
    },
  } = useDojo();

  const { ip, set_is_wave_running, set_total_gold, set_wave } = useElementStore((state) => state);

  const entityId = ip as EntityIndex;

  const game = useComponentValue(Game, entityId);
  const { wave } = game || {};

  useEffect(() => {
    if (game && (game.over || (game.mob_remaining === 0 && game.mob_alive === 0))) {
      set_is_wave_running(false);
    }
    set_total_gold(game?.gold || 0);
  }, [game]);

  useEffect(() => {
    set_is_wave_running(false);
  }, [wave]);

  useEffect(() => {
    set_wave(wave);
  }, [wave]);

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
    score: game?.score,
  };
};
