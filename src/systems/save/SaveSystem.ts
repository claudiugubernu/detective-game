import type { Game } from '../../core/Game';
import type { SaveData } from '../../types/save';

const SAVE_KEY = 'detective-game-save';
const SAVE_VERSION = 1;

export class SaveSystem {
  private game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  public save(): void {
    const data: SaveData = {
      version: SAVE_VERSION,
      timestamp: Date.now(),
      state: this.game.state.getState(),
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    console.log('Game saved');
  }

  public load(): boolean {
    const raw = localStorage.getItem(SAVE_KEY);

    if (!raw) {
      return false;
    }

    try {
      const data = JSON.parse(raw) as SaveData;

      if (data.version !== SAVE_VERSION) {
        console.warn('Save version mismatch');

        return false;
      }

      this.game.state.hydrate(data.state);

      console.log('Game loaded');

      return true;
    } catch (error) {
      console.error('Failed to load save', error);

      return false;
    }
  }

  public clear(): void {
    localStorage.removeItem(SAVE_KEY);
    console.log('Save cleared');
  }
}
