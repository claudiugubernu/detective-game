import type { GameStateData } from './state';

export type SaveData = {
  version: number;
  timestamp: number;
  state: GameStateData;
};
