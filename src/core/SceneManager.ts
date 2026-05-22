import { Scene } from './Scene';

export class SceneManager {
  private currentScene: Scene | null = null;

  public async setScene(scene: Scene): Promise<void> {
    if (this.currentScene) {
      this.currentScene.unmount();

      // ensure DOM cleanup completes before next mount
      await Promise.resolve();
    }

    this.currentScene = scene;

    await this.currentScene.mount();
  }
}
