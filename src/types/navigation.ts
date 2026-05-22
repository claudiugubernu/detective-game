import type { Scene } from '../core/Scene';
import type { Game } from '../core/Game';

export type SceneFactory = (game: Game) => Scene;

export type SceneDefinition = {
  id: string;
  factory: SceneFactory;
  unlockedByDefault?: boolean;
};
