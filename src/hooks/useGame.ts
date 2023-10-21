import { useElementStore } from '@/utils/store';
import { useComponentValue } from '@dojoengine/react';
import { EntityIndex } from '@latticexyz/recs';
import { useDojo } from '../DojoContext';

export const useGame = () => {
  const {
    setup: {
      components: { Game, Mob, Tower },
    },
  } = useDojo();

  const { ip } = useElementStore((state) => state);

  const entityId = ip as EntityIndex;

  const game = useComponentValue(Game, entityId);

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
  };
};
