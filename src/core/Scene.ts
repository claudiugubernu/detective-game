import type { Game } from './Game';
import type { SceneLayerName } from '../types/scene';
import { InteractionLayer } from '../systems/interactions/InteractionLayer';
import { SceneLayer } from './SceneLayer';

export abstract class Scene {
  protected game: Game;
  protected abstract sceneId: string;
  protected root: HTMLDivElement;
  protected interactions: InteractionLayer;
  protected layers: Record<SceneLayerName, SceneLayer>;
  private cleanupCallbacks: Array<() => void> = [];
  protected onEnter(): void {}

  constructor(game: Game) {
    this.game = game;
    this.root = document.createElement('div');
    this.root.className = 'relative h-full w-full overflow-hidden';
    this.layers = {
      background: new SceneLayer('background'),
      environment: new SceneLayer('environment'),
      characters: new SceneLayer('characters'),
      effects: new SceneLayer('effects'),
    };
    this.interactions = new InteractionLayer();
  }

  public async mount(): Promise<void> {
    await this.preload();
    this.mountLayers();
    this.render();
    this.root.append(this.interactions.getElement());
    this.game.sceneLayer.append(this.root);
    this.game.state.setCurrentScene(this.sceneId);
    this.game.events.emit('scene:changed', {
      sceneId: this.sceneId,
    });
    this.onEnter();
    if (this.onEnterScript) {
      this.game.scripts.run(this.onEnterScript);
    }
  }

  public unmount(): void {
    this.cleanup();
    this.interactions.cleanup();
    this.root.remove();
  }

  protected onEnterScript?: import('../types/script').Script;

  protected async preload(): Promise<void> {
    return Promise.resolve();
  }

  protected abstract render(): void;

  protected registerCleanup(callback: () => void): void {
    this.cleanupCallbacks.push(callback);
  }

  protected getLayer(name: SceneLayerName): HTMLDivElement {
    return this.layers[name].getElement();
  }

  private mountLayers(): void {
    for (const layer of Object.values(this.layers)) {
      this.root.append(layer.getElement());
    }
  }

  private cleanup(): void {
    for (const callback of this.cleanupCallbacks) {
      callback();
    }

    this.cleanupCallbacks = [];

    for (const layer of Object.values(this.layers)) {
      layer.clear();
    }

    this.root.replaceChildren();
  }
}
