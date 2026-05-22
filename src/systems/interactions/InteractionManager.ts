import type { HotspotDefinition } from '../../types/interactions';

export class InteractionManager {
  private cleanupCallbacks: Array<() => void> = [];

  public createHotspot(definition: HotspotDefinition): HTMLButtonElement {
    const hotspot = document.createElement('button');

    hotspot.type = 'button';

    hotspot.dataset.hotspotId = definition.id;

    hotspot.className = [
      'absolute',
      'border',
      'border-transparent',
      'bg-transparent',
      'transition-colors',
      'hover:border-white/40',
    ].join(' ');

    hotspot.style.left = `${definition.x}px`;
    hotspot.style.top = `${definition.y}px`;

    hotspot.style.width = `${definition.width}px`;
    hotspot.style.height = `${definition.height}px`;

    hotspot.style.cursor = definition.cursor ?? 'pointer';

    this.attachEvents(hotspot, definition);

    return hotspot;
  }

  public cleanup(): void {
    for (const callback of this.cleanupCallbacks) {
      callback();
    }

    this.cleanupCallbacks = [];
  }

  private attachEvents(
    hotspot: HTMLButtonElement,
    definition: HotspotDefinition
  ): void {
    const handleClick = (): void => {
      definition.onClick?.();
    };

    const handleMouseEnter = (): void => {
      definition.onHoverStart?.();
    };

    const handleMouseLeave = (): void => {
      definition.onHoverEnd?.();
    };

    hotspot.addEventListener('click', handleClick);
    hotspot.addEventListener('mouseenter', handleMouseEnter);
    hotspot.addEventListener('mouseleave', handleMouseLeave);

    this.cleanupCallbacks.push(() => {
      hotspot.removeEventListener('click', handleClick);
      hotspot.removeEventListener('mouseenter', handleMouseEnter);
      hotspot.removeEventListener('mouseleave', handleMouseLeave);
    });
  }
}
