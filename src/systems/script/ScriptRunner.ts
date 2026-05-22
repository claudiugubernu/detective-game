import type { Game } from '../../core/Game';
import type { Script, ScriptAction } from '../../types/script';
import type { Dialogue } from '../../types/dialogue';

export class ScriptRunner {
  private game: Game;
  private running = false;
  private cancelled = false;

  private offSceneChange: (() => void) | null = null;

  constructor(game: Game) {
    this.game = game;
  }

  public async run(script: Script): Promise<void> {
    if (this.running) {
      console.warn('Script already running');
      return;
    }

    this.cancelled = false;
    this.running = true;

    this.game.state.setMode('cutscene');

    this.game.events.emit('cutscene:started', {
      scriptId: script.id,
    });

    // ensure no duplicate listeners
    if (this.offSceneChange) {
      this.offSceneChange();
    }

    this.offSceneChange = this.game.events.on('scene:changed', () => {
      this.cancelled = true;
    });

    try {
      for (const action of script.actions) {
        if (this.cancelled) break;

        await this.execute(action);
      }
    } finally {
      this.running = false;

      if (this.offSceneChange) {
        this.offSceneChange();
        this.offSceneChange = null;
      }

      if (!this.cancelled) {
        this.game.state.setMode('playing');

        this.game.events.emit('cutscene:ended', {
          scriptId: script.id,
        });
      }
    }
  }

  private async execute(action: ScriptAction): Promise<void> {
    if (this.cancelled) return;

    switch (action.type) {
      case 'wait':
        await this.wait(action.duration);
        return;

      case 'dialogue':
        await this.runDialogue(action.dialogue);
        return;

      case 'scene':
        await this.game.navigation.goToScene(action.sceneId);
        return;

      case 'audio':
        this.game.audio.play(action.audioKey, action.channel);
        return;

      case 'event':
        this.game.events.emit(action.event as any, action.payload ?? {});
        return;
    }
  }

  private async runDialogue(dialogue: Dialogue): Promise<void> {
    if (this.cancelled) return;

    return new Promise((resolve) => {
      const off = this.game.events.on('dialogue:ended', () => {
        off();
        resolve();
      });

      this.game.dialogue.start(dialogue);

      // immediate cancellation safeguard
      if (this.cancelled) {
        this.game.dialogue.skip?.();
        off();
        resolve();
      }
    });
  }

  private async wait(duration: number): Promise<void> {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        if (!this.cancelled) {
          resolve();
        }
      }, duration);

      // optional safety: if cancelled early, do nothing
      // (timeout will still fire but resolve is ignored via flag)
    });
  }
}
