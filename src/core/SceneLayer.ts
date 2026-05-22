import type { SceneLayerName } from '../types/scene';

const layerZIndexes: Record<SceneLayerName, number> = {
  background: 0,
  environment: 10,
  characters: 20,
  effects: 30,
};

export class SceneLayer {
  private element: HTMLDivElement;

  constructor(name: SceneLayerName) {
    this.element = document.createElement('div');
    this.element.dataset.layer = name;
    this.element.className = 'absolute inset-0 overflow-hidden';
    this.element.style.zIndex = String(layerZIndexes[name]);
  }

  public getElement(): HTMLDivElement {
    return this.element;
  }

  public clear(): void {
    this.element.replaceChildren();
  }
}
