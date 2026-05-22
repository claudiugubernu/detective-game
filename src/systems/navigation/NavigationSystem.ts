import type { Game } from '../../core/Game';
import { scenes } from '../../content/scenes';

export class NavigationSystem {
  private game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  public async goToScene(sceneId: string): Promise<void> {
    const definition = scenes.find((scene) => scene.id === sceneId);

    if (!definition) {
      throw new Error(`Scene not found: ${sceneId}`);
    }

    const isUnlocked = this.game.state.isSceneUnlocked(sceneId);

    if (!isUnlocked) {
      console.warn(`Scene locked: ${sceneId}`);

      return;
    }

    const scene = definition.factory(this.game);

    await this.game.sceneManager.setScene(scene);
  }
}
