import type { Game } from '../../core/Game';

export class DialogueUI {
  private game: Game;
  private root: HTMLDivElement;
  private text: HTMLDivElement;
  private speaker: HTMLDivElement;

  constructor(game: Game) {
    this.game = game;
    this.root = document.createElement('div');
    this.root.className = 'absolute bottom-0 left-0 right-0 p-6 hidden';
    this.speaker = document.createElement('div');
    this.speaker.className = 'mb-2 text-sm text-zinc-300';
    this.text = document.createElement('div');
    this.text.className = 'text-xl text-white';

    const hint = document.createElement('div');
    hint.className = 'mt-2 text-xs text-zinc-500';
    hint.textContent = 'Click to continue • Press J for journal';

    const box = document.createElement('div');
    box.className = 'pointer-events-auto rounded-lg bg-black/70 p-4';
    box.append(this.speaker, this.text, hint);

    this.root.append(box);
    this.game.uiLayer.append(this.root);

    this.registerEvents();
  }

  private registerEvents(): void {
    this.game.events.on('dialogue:typing', ({ text, speaker }) => {
      this.root.classList.remove('hidden');
      this.speaker.textContent = speaker;
      this.text.textContent = text;
    });

    this.game.events.on('dialogue:line-final', ({ line }) => {
      this.root.classList.remove('hidden');
      this.speaker.textContent = line.speaker;
      this.text.textContent = line.text;
    });

    this.game.events.on('dialogue:ended', () => {
      this.clear();
    });

    this.root.addEventListener('click', () => {
      this.game.dialogue.skip();
    });
  }

  private clear(): void {
    this.speaker.textContent = '';
    this.text.textContent = '';
    this.root.classList.add('hidden');
  }
}
