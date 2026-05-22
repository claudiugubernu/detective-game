import type { Dialogue } from '../../types/dialogue';
import type { Game } from '../../core/Game';

export class DialogueSystem {
  private game: Game;
  private current: Dialogue | null = null;
  private index = 0;
  private isActive = false;
  private isTyping = false;
  private skipTyping = false;
  private autoAdvance = false;

  constructor(game: Game) {
    this.game = game;
  }

  public start(dialogue: Dialogue): void {
    if (this.isActive) {
      this.end();
    }

    this.current = dialogue;
    this.index = 0;
    this.isActive = true;
    this.game.events.emit('dialogue:started', {
      dialogueId: dialogue.id,
    });
    this.game.events.emit('gameplay:lock', {});

    this.showCurrentLine();
  }

  public setAutoAdvance(value: boolean): void {
    this.autoAdvance = value;
  }

  public skip(): void {
    if (this.isTyping) {
      this.skipTyping = true;
      return;
    }

    this.next();
  }

  public next(): void {
    if (!this.current) return;
    this.index++;

    if (this.index >= this.current.lines.length) {
      this.end();
      return;
    }

    this.showCurrentLine();
  }

  public end(): void {
    if (!this.current) return;

    this.game.events.emit('dialogue:ended', {
      dialogueId: this.current.id,
    });
    this.game.events.emit('gameplay:unlock', {});
    this.game.audio.stop('voice');
    this.current = null;
    this.index = 0;
    this.isActive = false;
  }

  private async showCurrentLine(): Promise<void> {
    if (!this.current) return;

    const line = this.current.lines[this.index];
    this.game.events.emit('dialogue:line', {
      line,
    });

    await this.playLine(line);

    if (this.autoAdvance) {
      setTimeout(() => this.next(), 800);
    }
  }

  private async playLine(
    line: import('../../types/dialogue').DialogueLine
  ): Promise<void> {
    this.isTyping = true;
    this.skipTyping = false;

    if (line.audioKey) {
      this.game.audio.play(line.audioKey, 'voice');
    }

    const text = line.text;
    let displayed = '';

    for (let i = 0; i < text.length; i++) {
      if (this.skipTyping) {
        displayed = text;
        break;
      }

      displayed += text[i];

      this.game.events.emit('dialogue:typing', {
        text: displayed,
        speaker: line.speaker,
      });

      await this.delay(20);
    }

    this.isTyping = false;

    // final commit
    this.game.events.emit('dialogue:line-final', {
      line,
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
