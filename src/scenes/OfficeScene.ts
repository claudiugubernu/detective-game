import { Scene } from '../core/Scene';
import { createElement } from '../utils/createElement';

export class OfficeScene extends Scene {
  protected sceneId = 'office';

  protected render(): void {
    const container = createElement('div', {
      className: 'flex h-full items-center justify-center bg-zinc-800',
    });

    const title = createElement('h1', {
      className: 'text-5xl font-bold text-white',
      textContent: 'Office Scene',
    });

    container.append(title);

    this.getLayer('environment').append(container);
  }
}
