import { TowerCategory } from '@/types/Tower';
import { Component, Components, EntityIndex, Schema, Type, setComponent } from '@latticexyz/recs';
import { poseidonHashMany } from 'micro-starknet';
import { Account, Call, Event, InvokeTransactionReceiptResponse, shortString } from 'starknet';
import { ClientComponents } from './createClientComponents';
import { SetupNetworkResult } from './setupNetwork';

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { execute, contractComponents }: SetupNetworkResult,
  { Game, Mob, Tower, Tile }: ClientComponents
) {
  //account: felt252, seed: felt252, name: felt252, player_count: u8
  const create = async (signer: Account, player: string, seed: number, name: string) => {
    try {
      const calls: Call[] = [
        {
          contractAddress: import.meta.env.VITE_PUBLIC_ACTIONS_ADDRESS || '',
          entrypoint: 'create',
          calldata: [import.meta.env.VITE_PUBLIC_WORLD_ADDRESS, player, seed, name],
        },
      ];

      const tx = await execute(signer, calls);

      console.log(tx);
      const receipt = (await signer.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      })) as InvokeTransactionReceiptResponse;
      console.log(receipt.events);

      const events = receipt.events;

      if (events) {
        const eventsTransformed = await setComponentsFromEvents(contractComponents, events);
        await executeEvents(eventsTransformed);
      }
    } catch (e) {
      console.log(e);
    } finally {
      console.log('');
    }
  };

  const build = async (signer: Account, player: string, x: number, y: string, tower: TowerCategory) => {
    try {
      const calls: Call[] = [
        {
          contractAddress: import.meta.env.VITE_PUBLIC_ACTIONS_ADDRESS || '',
          entrypoint: 'build',
          calldata: [import.meta.env.VITE_PUBLIC_WORLD_ADDRESS, player, x, y, tower],
        },
      ];

      const tx = await execute(signer, calls);

      console.log(tx);
      const receipt = (await signer.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      })) as InvokeTransactionReceiptResponse;
      console.log(receipt.events);

      const events = receipt.events;

      if (events) {
        const eventsTransformed = await setComponentsFromEvents(contractComponents, events);
        await executeEvents(eventsTransformed);
      }
    } catch (e) {
      console.log(e);
    } finally {
      console.log('');
    }
  };

  const upgrade = async (signer: Account, player: string, towerId: number) => {
    try {
      const calls: Call[] = [
        {
          contractAddress: import.meta.env.VITE_PUBLIC_ACTIONS_ADDRESS || '',
          entrypoint: 'upgrade',
          calldata: [import.meta.env.VITE_PUBLIC_WORLD_ADDRESS, player, towerId],
        },
      ];

      const tx = await execute(signer, calls);

      console.log(tx);
      const receipt = (await signer.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      })) as InvokeTransactionReceiptResponse;
      console.log(receipt.events);

      const events = receipt.events;

      if (events) {
        const eventsTransformed = await setComponentsFromEvents(contractComponents, events);
        await executeEvents(eventsTransformed);
      }
    } catch (e) {
      console.log(e);
    } finally {
      console.log('');
    }
  };

  const sell = async (signer: Account, player: string, towerId: number) => {
    try {
      const calls: Call[] = [
        {
          contractAddress: import.meta.env.VITE_PUBLIC_ACTIONS_ADDRESS || '',
          entrypoint: 'sell',
          calldata: [import.meta.env.VITE_PUBLIC_WORLD_ADDRESS, player, towerId],
        },
      ];

      const tx = await execute(signer, calls);

      console.log(tx);
      const receipt = (await signer.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      })) as InvokeTransactionReceiptResponse;
      console.log(receipt.events);

      const events = receipt.events;

      if (events) {
        const eventsTransformed = await setComponentsFromEvents(contractComponents, events);
        await executeEvents(eventsTransformed);
      }
    } catch (e) {
      console.log(e);
    } finally {
      console.log('');
    }
  };

  const run = async (signer: Account, player: string) => {
    try {
      const calls: Call[] = [
        {
          contractAddress: import.meta.env.VITE_PUBLIC_ACTIONS_ADDRESS || '',
          entrypoint: 'run',
          calldata: [import.meta.env.VITE_PUBLIC_WORLD_ADDRESS, player],
        },
      ];

      const tx = await execute(signer, calls);

      console.log(tx);
      const receipt = (await signer.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      })) as InvokeTransactionReceiptResponse;
      console.log(receipt.events);

      const events = receipt.events;

      if (events) {
        const eventsTransformed = await setComponentsFromEvents(contractComponents, events);
        await executeEvents(eventsTransformed);
      }
    } catch (e) {
      console.log(e);
    } finally {
      console.log('');
    }
  };

  return {
    create,
    run,
    build,
    upgrade,
    sell,
  };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function executeEvents(events: TransformedEvent[]) {
  for (const e of events) {
    setComponent(e.component, e.entityIndex, e.componentValues);
    if (e.type === 'Game') {
      await sleep(1000);
    }
  }
  /*const gameEvents = events.filter(
    (e): e is GameEvent & ComponentData => e.type === 'Game'
  );
  // console.log('gameEvents', gameEvents);
  for (const e of gameEvents) {
    setComponent(e.component, e.entityIndex, e.componentValues);
    if (e.nonce >= 0) {
      await sleep(1000);
    }
  }

  const tileEvents = events.filter(
    (e): e is TileEvent & ComponentData => e.type === 'Tile'
  );
  // console.log('tileEvents', tileEvents);
  for (const e of tileEvents) {
    setComponent(e.component, e.entityIndex, e.componentValues);
  }

  const playerEvents = events.filter(
    (e): e is PlayerEvent & ComponentData => e.type === 'Player'
  );
  // console.log('playerEvents', playerEvents);
  for (const e of playerEvents) {
    //console.log(e._type);
    setComponent(e.component, e.entityIndex, e.componentValues);
  }*/
}

function hexToAscii(hex: string) {
  let str = '';
  for (let n = 2; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

export function getEntityIdFromKeys(keys: bigint[]): EntityIndex {
  if (keys.length === 1) {
    return parseInt(keys[0].toString()) as EntityIndex;
  }
  // calculate the poseidon hash of the keys
  const poseidon = poseidonHashMany([BigInt(keys.length), ...keys]);
  return parseInt(poseidon.toString()) as EntityIndex;
}

type GameEvent = ComponentData & {
  type: 'Game';
  game_id: number;
  id: number;
  name: string;
  over: boolean;
  tower_count: number;
  mob_count: number;
  mob_remaining: number;
  wave: number;
  gold: number;
  health: number;
};

function handleGameEvent(
  keys: bigint[],
  values: string[]
): Omit<GameEvent, 'component' | 'componentValues' | 'entityIndex'> {
  const [game_id] = keys.map((k) => Number(k));
  const [id, _, seed, overNumber, tower_count, mob_count, mob_remaining, wave, gold, health] = values.map((v) =>
    Number(v)
  );
  const over = overNumber === 1;
  const name = shortString.decodeShortString(values[0]);
  console.log(
    `[Game: KEYS: (game_id: ${game_id}) - VALUES: (id: ${id}, name: ${name}, seed: ${seed}, overNumber: ${overNumber}, tower_count: ${tower_count}, mob_count: ${mob_count}, mob_remaining: ${mob_remaining}, wave: ${wave}, gold: ${gold}, health: ${health})]`
  );
  return {
    type: 'Game',
    game_id,
    id,
    name,
    over,
    tower_count,
    mob_count,
    mob_remaining,
    wave,
    gold,
    health,
  };
}

type TileEvent = ComponentData & {
  type: 'Tile';
  game_id: number;
  id: number;
  army: number;
  owner: number;
  dispatched: number;
};

function handleTileEvent(
  keys: bigint[],
  values: string[]
): Omit<TileEvent, 'component' | 'componentValues' | 'entityIndex'> {
  const [game_id, id] = keys.map((k) => Number(k));
  const [army, owner, dispatched] = values.map((v) => Number(v));
  console.log(
    `[Tile: KEYS: (game_id: ${game_id}, id: ${id}) - VALUES: (army: ${army}, owner: ${owner}, dispatched: ${dispatched})]`
  );
  return {
    type: 'Tile',
    game_id,
    id,
    army,
    owner,
    dispatched,
  };
}

type MobEvent = ComponentData & {
  type: 'Mob';
  game_id: number;
  id: number;
  index: number;
  health: number;
  speed: number;
  defence: number;
  reward: number;
};

function handleMobEvent(
  keys: bigint[],
  values: string[]
): Omit<MobEvent, 'component' | 'componentValues' | 'entityIndex'> {
  const [game_id, id] = keys.map((k) => Number(k));
  const [index, health, speed, defence, reward] = values.map((v) => Number(v));

  console.log(
    `[Mob: KEYS: (game_id: ${game_id}, id: ${id}) - VALUES: (index: ${index}, health: ${health}, speed: ${speed}, defence: ${defence}, reward: ${reward})]`
  );
  return {
    type: 'Mob',
    game_id,
    id,
    index,
    health,
    speed,
    defence,
    reward,
  };
}

type TowerEvent = ComponentData & {
  type: 'Tower';
  game_id: number;
  id: number;
  index: number;
  category: number;
  speed: number;
  attack: number;
  range: number;
  level: number;
};

function handleTowerEvent(
  keys: bigint[],
  values: string[]
): Omit<TowerEvent, 'component' | 'componentValues' | 'entityIndex'> {
  const [game_id, id] = keys.map((k) => Number(k));
  const [index, category, speed, attack, range, level] = values.map((v) => Number(v));

  console.log(
    `[Mob: KEYS: (game_id: ${game_id}, id: ${id}) - VALUES: (index: ${index}, category: ${category}, speed: ${speed}, attack: ${attack}, range: ${range}, level: ${level})]`
  );
  return {
    type: 'Tower',
    game_id,
    id,
    index,
    category,
    speed,
    attack,
    range,
    level,
  };
}

type ComponentData = {
  component: Component;
  componentValues: Schema;
  entityIndex: EntityIndex;
};

type TransformedEvent = GameEvent | TileEvent | MobEvent | TowerEvent;

export async function setComponentsFromEvents(components: Components, events: Event[]): Promise<TransformedEvent[]> {
  const transformedEvents = [];

  for (const event of events) {
    const componentName = hexToAscii(event.data[0]);
    const keysNumber = parseInt(event.data[1]);
    const keys = event.data.slice(2, 2 + keysNumber).map((key) => BigInt(key));
    let index = 2 + keysNumber + 1;
    const numberOfValues = parseInt(event.data[index++]);
    const values = event.data.slice(index, index + numberOfValues);

    // Component
    const component = components[componentName];
    const componentValues = Object.keys(component.schema).reduce<{
      [key: string]: string | number;
    }>((acc, key, index) => {
      const value = values[index];
      acc[key] = component.schema[key] === Type.String ? shortString.decodeShortString(value) : Number(value);
      return acc;
    }, {});
    const entity = getEntityIdFromKeys(keys);

    const baseEventData = {
      component,
      componentValues,
      entityIndex: entity,
    };

    switch (componentName) {
      case 'Game':
        transformedEvents.push({
          ...handleGameEvent(keys, values),
          ...baseEventData,
        });
        break;
      case 'Tile':
        transformedEvents.push({
          ...handleTileEvent(keys, values),
          ...baseEventData,
        });
        break;
      case 'Mob':
        transformedEvents.push({
          ...handleMobEvent(keys, values),
          ...baseEventData,
        });
        break;
      case 'Tower':
        transformedEvents.push({
          ...handleTowerEvent(keys, values),
          ...baseEventData,
        });
        break;
      default:
        console.log('componentName', componentName);
        console.log('keys', keys);
        console.log('values', values);
    }
  }

  return transformedEvents;
}
