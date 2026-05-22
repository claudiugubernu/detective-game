import { Scene } from '../core/Scene';
import { createElement } from '../utils/createElement';
import officeBackground from '../assets/backgrounds/office.jpg';

export class IntroScene extends Scene {
  protected async preload(): Promise<void> {
    await this.game.assets.preload([
      {
        type: 'image',
        key: 'office-background',
        src: officeBackground,
      },
    ]);
  }

  protected sceneId = 'intro';

  protected render(): void {
    this.renderBackground();
    this.renderTitle();
    this.registerInteractions();
  }

  private renderBackground(): void {
    const background = this.game.assets.getImage('office-background');
    background.className = 'h-full w-full object-cover select-none';
    this.getLayer('background').append(background);
  }

  private renderTitle(): void {
    const container = createElement('div', {
      className: 'flex h-full items-center justify-center',
    });

    const title = createElement('h1', {
      className:
        'pointer-events-none text-5xl font-bold text-white drop-shadow-lg',
      textContent: 'Detective Game',
    });

    container.append(title);

    this.getLayer('environment').append(container);
  }

  private registerInteractions(): void {
    this.interactions.registerHotspot({
      id: 'scene-click',

      x: 0,
      y: 0,

      width: window.innerWidth,
      height: window.innerHeight,

      onClick: async () => {
        await this.game.navigation.goToScene('office');
      },
    });
  }

  protected onEnter(): void {
    this.game.dialogue.start({
      id: 'intro-dialogue',
      lines: [
        {
          id: 'l1',
          speaker: 'Detective',
          text: 'Another cold case...',
        },
        {
          id: 'l2',
          speaker: 'Detective',
          text: 'Let’s look around.',
          givesClueId: 'first-observation',
        },
      ],
    });

    this.game.state.unlockScene('office');
  }
}
