import { Scene } from '../core/Scene';
import { createElement } from '../utils/createElement';

export class MenuScene extends Scene {
  protected sceneId = 'menu';

  protected render(): void {
    const container = createElement('div', {
      className:
        'flex h-full w-full flex-col items-center justify-center bg-zinc-950 text-white',
    });

    const title = createElement('h1', {
      className: 'mb-10 text-5xl font-bold',
      textContent: 'Detective Game',
    });

    const buttonClass =
      'mb-3 w-48 rounded bg-zinc-800 px-4 py-2 hover:bg-zinc-700 cursor-pointer';

    const play = createElement('button', {
      className: buttonClass,
      textContent: 'Play',
    });

    const continueBtn = createElement('button', {
      className: buttonClass,
      textContent: 'Continue',
    });

    const reset = createElement('button', {
      className: buttonClass,
      textContent: 'Reset Save',
    });

    const mute = createElement('button', {
      className: buttonClass,
      textContent: 'Toggle Mute',
    });

    container.append(title, play, continueBtn, reset, mute);
    this.getLayer('environment').append(container);

    play.addEventListener('click', async () => {
      this.game.state.setMode('playing');

      console.log('Pressed play');

      await this.game.navigation.goToScene('intro');
    });

    continueBtn.addEventListener('click', async () => {
      const loaded = this.game.saves.load();

      const scene = this.game.state.getState().currentSceneId ?? 'intro';

      this.game.state.setMode('playing');

      await this.game.navigation.goToScene(scene);
    });

    reset.addEventListener('click', () => {
      this.game.saves.clear();
      location.reload();
    });

    mute.addEventListener('click', () => {
      const state = this.game.state.getState();
      this.game.state.setMuted(!state.audio.muted);
      this.game.audio.refreshVolumes();
      this.game.saves.save();
    });

    this.getLayer('characters').style.display = 'none';
    this.getLayer('effects').style.display = 'none';
  }
}
