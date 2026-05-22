import type { Game } from '../../core/Game';
import { clues } from '../../content/clues';

export class JournalUI {
  private game: Game;
  private root: HTMLDivElement;
  private list: HTMLDivElement;
  private isOpen = false;

  constructor(game: Game) {
    this.game = game;
    this.root = document.createElement('div');
    this.root.className = [
      'absolute',
      'top-0',
      'right-0',
      'h-full',
      'w-[320px]',
      'translate-x-full',
      'bg-zinc-950/95',
      'transition-transform',
      'duration-300',
      'pointer-events-auto',
      'border-l',
      'border-zinc-800',
      'p-4',
      'overflow-y-auto',
    ].join(' ');

    this.list = document.createElement('div');
    this.list.className = 'space-y-4';
    const title = document.createElement('h2');
    title.className = 'mb-4 text-2xl font-bold text-white';
    title.textContent = 'Clue Journal';
    this.root.append(title, this.list);
    this.game.uiLayer.append(this.root);
    this.registerEvents();
    this.render();
  }

  private registerEvents(): void {
    window.addEventListener('keydown', (event) => {
      if (event.key.toLowerCase() === 'j') {
        this.toggle();
      }
    });

    this.game.events.on('clue:found', () => {
      this.render();
    });
  }

  private toggle(): void {
    this.isOpen = !this.isOpen;
    this.root.classList.toggle('translate-x-full', !this.isOpen);
  }

  private render(): void {
    this.list.replaceChildren();
    const clueIds = this.game.state.getFoundClues();

    for (const clueId of clueIds) {
      const clue = clues[clueId];

      if (!clue) {
        continue;
      }

      const card = this.createClueCard(clue);
      this.list.append(card);
    }
  }

  private createClueCard(clue: (typeof clues)[string]): HTMLDivElement {
    const card = document.createElement('div');
    card.className = 'rounded-lg border border-zinc-800 bg-zinc-900 p-4';
    const title = document.createElement('h3');
    title.className = 'mb-2 text-lg font-semibold text-white';
    title.textContent = clue.title;
    const description = document.createElement('p');
    description.className = 'text-sm text-zinc-300';
    description.textContent = clue.description;
    card.append(title, description);
    return card;
  }
}
