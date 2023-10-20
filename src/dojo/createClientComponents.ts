import { overridableComponent } from '@latticexyz/recs';
import { SetupNetworkResult } from './setupNetwork';

export type ClientComponents = ReturnType<typeof createClientComponents>;

export function createClientComponents({ contractComponents }: SetupNetworkResult) {
  return {
    ...contractComponents,
    Game: overridableComponent(contractComponents.Game),
    Mob: overridableComponent(contractComponents.Mob),
    Tile: overridableComponent(contractComponents.Tile),
    Tower: overridableComponent(contractComponents.Tower),
  };
}
