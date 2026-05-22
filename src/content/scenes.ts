import type { SceneDefinition } from '../types/navigation';
import { MenuScene } from '../scenes/MenuScene';
import { IntroScene } from '../scenes/IntroScene';
import { OfficeScene } from '../scenes/OfficeScene';

export const scenes: SceneDefinition[] = [
  {
    id: 'menu',
    factory: (game) => new MenuScene(game),
    unlockedByDefault: true,
  },
  {
    id: 'intro',
    factory: (game) => new IntroScene(game),
    unlockedByDefault: true,
  },
  {
    id: 'office',
    factory: (game) => new OfficeScene(game),
  },
];
