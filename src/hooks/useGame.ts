import { useElementStore } from '@/utils/store';
import { useComponentValue } from '@dojoengine/react';
import { EntityIndex, getComponentEntities, getComponentValue } from '@latticexyz/recs';
import { useEffect, useState } from 'react';
import { useDojo } from '../DojoContext';

export const useGame = () => {
  const {
    setup: {
      components: { Game, Tower },
    },
  } = useDojo();

  const { ip, set_is_wave_running, set_total_gold, set_wave } = useElementStore((state) => state);

  const entityId = ip as EntityIndex;

  const game = useComponentValue(Game, entityId);
  const { wave, tower_build, score } = game || {};

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

  const [towers, setTowers] = useState<any[]>([]);

  useEffect(() => {
    const towerEntities = getComponentEntities(Tower);
    const updatedTowers = [...towerEntities].map((key) => getComponentValue(Tower, key));

    const filteredTowers = updatedTowers.filter((tower) => tower.level > 0);
    setTowers(filteredTowers);
  }, [tower_build]);

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
    // not in game anymore
    towers: towers,
  };
};
