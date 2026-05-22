export class Background {
  private element: HTMLImageElement;

  constructor(src: string) {
    this.element = document.createElement('img');

    this.element.src = src;

    this.element.alt = '';

    this.element.draggable = false;

    this.element.className = [
      'h-full',
      'w-full',
      'object-cover',
      'select-none',
    ].join(' ');
  }

  public getElement(): HTMLImageElement {
    return this.element;
  }
}
