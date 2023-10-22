import { useEventsStore } from '@/utils/eventsStore';
import { TowerCategory } from '@/utils/tower';
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

  const build = async (signer: Account, player: string, x: number, y: number, tower: TowerCategory) => {
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
      console.log('BUY DONE');
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
        // await executeEvents(eventsTransformed);
      }
    } catch (e) {
      console.log(e);
    } finally {
      console.log('');
    }
  };

  const iter = async (signer: Account, player: string, tick: number) => {
    try {
      const calls: Call[] = [
        {
          contractAddress: import.meta.env.VITE_PUBLIC_ACTIONS_ADDRESS || '',
          entrypoint: 'iter',
          calldata: [import.meta.env.VITE_PUBLIC_WORLD_ADDRESS, player, tick],
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
    iter,
    build,
    upgrade,
    sell,
  };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function executeEvents(events: TransformedEvent[]) {
  //const filteredEvents = events.filter((e) => e.tick === 0 && e.type === 'Tower');
  for (const e of events) {
    if (e.eventType === 'component') {
      const event = e as TransformedEvent & ComponentData;
      //console.log('setComponent', event.component, event.entityIndex, event.componentValues);
      setComponent(event.component, event.entityIndex, event.componentValues);
    } else {
      //console.log('aaaa');
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
  key: number;
  id: number;
  name: string;
  over: boolean;
  tower_count: number;
  mob_count: number;
  mob_remaining: number;
  mob_alive: number;
  wave: number;
  gold: number;
  health: number;
  tick: number;
  score: number;
};

function handleGameEvent(
  keys: bigint[],
  values: string[]
): Omit<GameEvent, 'component' | 'componentValues' | 'entityIndex'> {
  const [key] = keys.map((k) => Number(k));
  const [id, _, seed, overNumber, tower_count, mob_count, mob_remaining, mob_alive, wave, gold, health, tick, score] =
    values.map((v) => Number(v));
  const over = overNumber === 1;
  const name = shortString.decodeShortString(values[0]);
  console.log(
    `[Game: KEYS: (key: ${key}) - VALUES: (id: ${id}, name: ${name}, seed: ${seed}, over: ${over}, tower_count: ${tower_count}, mob_count: ${mob_count}, mob_remaining: ${mob_remaining}, mob_alive: ${mob_alive}, wave: ${wave}, gold: ${gold}, health: ${health}, tick: ${tick}, score: ${score})]`
  );
  return {
    type: 'Game',
    key,
    id,
    name,
    over,
    tower_count,
    mob_count,
    mob_remaining,
    mob_alive,
    wave,
    gold,
    health,
    tick,
    score,
  };
}

type TileEvent = ComponentData & {
  type: 'Tile';
  game_id: number;
  id: number;
  army: number;
  owner: number;
  dispatched: number;
  tick: number;
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
    tick: 0,
  };
}

type MobEvent = ComponentData & {
  type: 'Mob';
  game_id: number;
  key: number;
  id: number;
  index: number;
  category: number;
  health: number;
  speed: number;
  defence: number;
  reward: number;
  tick: number;
};

function handleMobEvent(
  keys: bigint[],
  values: string[]
): Omit<MobEvent, 'component' | 'componentValues' | 'entityIndex'> {
  const [game_id, key] = keys.map((k) => Number(k));
  const [id, index, category, health, speed, defence, reward, tick] = values.map((v) => Number(v));

  console.log(
    `[Mob: KEYS: (game_id: ${game_id}, key: ${key}) - VALUES: (id: ${id}, index: ${index}, category: ${category}, health: ${health}, speed: ${speed}, defence: ${defence}, reward: ${reward}, tick: ${tick})]`
  );
  return {
    type: 'Mob',
    game_id,
    key,
    id,
    index,
    category,
    health,
    speed,
    defence,
    reward,
    tick,
  };
}

type TowerEvent = ComponentData & {
  type: 'Tower';
  game_id: number;
  key: number;
  id: number;
  index: number;
  category: number;
  cooldown: number;
  attack: number;
  range: number;
  level: number;
  cost: number;
  hit: number;
  tick: number;
};

function handleTowerEvent(
  keys: bigint[],
  values: string[]
): Omit<TowerEvent, 'component' | 'componentValues' | 'entityIndex'> {
  const [game_id, key] = keys.map((k) => Number(k));
  const [id, index, category, cooldown, attack, range, level, cost, hit, tick] = values.map((v) => Number(v));

  console.log(
    `[Tower: KEYS: (game_id: ${game_id}, key: ${key}) - VALUES: (id: ${id}, index: ${index}, category: ${category}, cooldown: ${cooldown}, attack: ${attack}, range: ${range}, level: ${level}, cost: ${cost}, hit: ${hit}, tick: ${tick})]`
  );
  return {
    type: 'Tower',
    game_id,
    key,
    id,
    index,
    category,
    cooldown,
    attack,
    range,
    level,
    cost,
    hit,
    tick,
  };
}

export type ComponentData = {
  component: Component;
  componentValues: Schema;
  entityIndex: EntityIndex;
};

type TransformedEventBase = {
  eventType: 'component' | 'custom';
};

export type TransformedEvent = (GameEvent | TileEvent | MobEvent | TowerEvent | HitEvent) & TransformedEventBase;

export enum CustomEvents {
  Hit = '0x33f1adaeb6b7468c983c7285a0776514bd4bc3082362e9ead4211d605daf6fa',
}

interface HitEvent {
  gameId: number;
  tick: number;
  from: number;
  to: number;
  damage: number;
}

export async function setComponentsFromEvents(components: Components, events: Event[]): Promise<TransformedEvent[]> {
  const transformedEvents: TransformedEvent[] = [];

  for (const event of events) {
    const componentName = hexToAscii(event.data[0]);
    const keysNumber = parseInt(event.data[1]);
    const keys = event.data.slice(2, 2 + keysNumber).map((key) => BigInt(key));
    let index = 2 + keysNumber + 1;
    const numberOfValues = parseInt(event.data[index++]);
    const values = event.data.slice(index, index + numberOfValues);

    if (!components[componentName]) {
      // Custom event
      //console.log('custom event', event);
      const eventType = event.keys[0];
      const [gameId, tick, from, to, damage] = event.data.map((v) => Number(v));
      switch (eventType) {
        case CustomEvents.Hit:
          transformedEvents.push({
            eventType: 'custom',
            gameId,
            tick,
            from,
            to,
            damage,
          });
          console.log(`[Hit: VALUES: (gameId: ${gameId}, tick: ${tick}, from: ${from}, to: ${to}, damage: ${damage})]`);
          break;
      }
    } else {
      // Component event
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
            eventType: 'component',
            ...handleGameEvent(keys, values),
            ...baseEventData,
          });
          break;
        case 'Tile':
          transformedEvents.push({
            eventType: 'component',
            ...handleTileEvent(keys, values),
            ...baseEventData,
          });
          break;
        case 'Mob':
          transformedEvents.push({
            eventType: 'component',
            ...handleMobEvent(keys, values),
            ...baseEventData,
          });
          break;
        case 'Tower':
          transformedEvents.push({
            eventType: 'component',
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
  }

  useEventsStore.getState().setEvents(transformedEvents.filter((e) => e.tick > 0));

  return transformedEvents;
}

type EventKeys = {
  game_id?: number;
  key?: number;
  type?: 'Game' | 'Tile' | 'Mob' | 'Tower';
};

type EventValues = {
  [key: string]: string | number | boolean;
};

export function logEvent(type: string, keys: EventKeys, values: EventValues) {
  const keysString = Object.entries(keys)
    .map(([keyName, keyValue]) => `${keyName}: ${keyValue}`)
    .join(', ');

  const valuesString = Object.entries(values)
    .map(([keyName, keyValue]) => `${keyName}: ${keyValue}`)
    .join(', ');

  console.log(`[${type}: KEYS: (${keysString}) - VALUES: (${valuesString})]`);
}

export function logTransformedEvent(event: TransformedEvent) {
  if (event.eventType === 'component') {
    if ('type' in event) {
      switch (event.type) {
        case 'Game':
        case 'Tile':
        case 'Mob':
        case 'Tower': {
          const keys = {
            type: event.type,
            ...('key' in event ? { key: event.key } : {}),
            ...('game_id' in event ? { game_id: event.game_id } : {}),
          };
          const values = { ...event };
          delete values.component;
          delete values.componentValues;
          delete values.entityIndex;
          delete (values as any).eventType;
          logEvent(event.type, keys, values);
          break;
        }
      }
    } else {
      console.error('Component event without type:', event);
    }
  } else if (event.eventType === 'custom') {
    if ('gameId' in event && 'tick' in event && 'from' in event && 'to' in event && 'damage' in event) {
      logEvent(
        'Hit',
        { game_id: event.gameId },
        { tick: event.tick, from: event.from, to: event.to, damage: event.damage }
      );
    } else {
      console.error('Unknown custom event structure:', event);
    }
  } else {
    console.error(`Unknown event type: ${event.eventType}`);
  }
}
