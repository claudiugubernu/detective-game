import type { HotspotDefinition } from '../../types/interactions';
import { InteractionManager } from './InteractionManager';

export class InteractionLayer {
  private root: HTMLDivElement;
  private manager: InteractionManager;

  constructor() {
    this.root = document.createElement('div');
    this.root.className = 'absolute inset-0 pointer-events-none';
    this.manager = new InteractionManager();
  }

  private disabled = false;

  public getElement(): HTMLDivElement {
    return this.root;
  }

  public setDisabled(value: boolean): void {
    this.disabled = value;
    this.root.style.pointerEvents = value ? 'none' : 'auto';
  }

  public registerHotspot(definition: HotspotDefinition): void {
    const hotspot = this.manager.createHotspot(definition);
    hotspot.classList.add('pointer-events-auto');
    this.root.append(hotspot);
  }

  public cleanup(): void {
    this.manager.cleanup();
    this.root.replaceChildren();
  }
}
